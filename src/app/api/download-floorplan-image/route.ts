import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import sharp from "sharp";

const PHONE = "+971 52 691 9169";
const WEBSITE = "www.TheGrandPolo.com";

// Dynamically allow any floorplan image in the floorplans directory
function isAllowedFloorplanImage(filePath: string): boolean {
  // Must be in /images/floorplans/ and be a supported image format
  if (!filePath.startsWith("/images/floorplans/")) return false;
  if (!filePath.endsWith(".jpg") && !filePath.endsWith(".jpeg") && !filePath.endsWith(".png") && !filePath.endsWith(".webp")) return false;
  // No path traversal
  if (filePath.includes("..")) return false;
  return true;
}

async function createWatermarkSvg(width: number, height: number): Promise<Buffer> {
  const barHeight = Math.max(60, Math.floor(height * 0.07));
  const fontSize = Math.max(18, Math.floor(width / 50));
  const diagonalFontSize = Math.floor(fontSize * 2);

  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <!-- Diagonal watermark -->
  <text
    x="${width / 2}"
    y="${height / 2}"
    font-family="Arial, Helvetica, sans-serif"
    font-size="${diagonalFontSize}"
    font-weight="bold"
    fill="rgba(212, 175, 55, 0.08)"
    text-anchor="middle"
    dominant-baseline="central"
    transform="rotate(-30, ${width / 2}, ${height / 2})"
  >${PHONE}  |  ${WEBSITE}</text>

  <!-- Bottom bar background -->
  <rect x="0" y="${height - barHeight}" width="${width}" height="${barHeight}" fill="rgba(42, 21, 6, 0.9)"/>

  <!-- Gold line above bar -->
  <line x1="0" y1="${height - barHeight}" x2="${width}" y2="${height - barHeight}" stroke="rgba(212, 175, 55, 0.7)" stroke-width="2"/>

  <!-- Contact text -->
  <text
    x="${width / 2}"
    y="${height - barHeight / 2}"
    font-family="Arial, Helvetica, sans-serif"
    font-size="${fontSize}"
    font-weight="bold"
    fill="#D4AF37"
    text-anchor="middle"
    dominant-baseline="central"
  >${PHONE}  |  ${WEBSITE}</text>
</svg>`;

  return Buffer.from(svg);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get("file");

  if (!file || !isAllowedFloorplanImage(file)) {
    return NextResponse.json({ error: "Image not found or not allowed." }, { status: 404 });
  }

  try {
    // Resolve the actual file path on disk.
    // If a .webp path is requested, try the .jpg version first (the actual file on disk),
    // since the watermarked output is always JPEG for maximum compatibility.
    // If .jpg is not found, fall back to the .webp file — sharp can read both.
    let filePath = join(process.cwd(), "public", file);
    let imageBuffer: Buffer;

    if (file.endsWith(".webp")) {
      const jpgPath = join(process.cwd(), "public", file.replace(/\.webp$/, ".jpg"));
      try {
        imageBuffer = await readFile(jpgPath);
      } catch {
        // .jpg not found on disk, try the .webp file itself
        imageBuffer = await readFile(filePath);
      }
    } else {
      imageBuffer = await readFile(filePath);
    }

    // Get image metadata — sharp auto-detects format regardless of extension
    const metadata = await sharp(imageBuffer).metadata();
    const width = metadata.width || 1600;
    const height = metadata.height || 1200;

    // Create watermark SVG overlay sized to match the image
    const watermarkSvg = await createWatermarkSvg(width, height);

    // Composite: original image + watermark overlay
    // sharp auto-detects input format, so it works with JPEG, WebP, PNG etc.
    const watermarkedBuffer = await sharp(imageBuffer)
      .composite([{
        input: watermarkSvg,
        top: 0,
        left: 0,
      }])
      .jpeg({ quality: 92 })
      .toBuffer();

    // Determine download filename — always output as .jpg
    const originalName = file.split("/").pop() || "floorplan.jpg";
    const downloadName = originalName.replace(/\.(jpg|jpeg|png|webp)$/i, "-watermarked.jpg");

    return new NextResponse(new Uint8Array(watermarkedBuffer), {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg",
        "Content-Disposition": `attachment; filename="${downloadName}"`,
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  } catch (error) {
    console.error("Floor plan image download error:", error);
    return NextResponse.json({ error: "Failed to generate watermarked image." }, { status: 500 });
  }
}
