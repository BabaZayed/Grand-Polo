import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import sharp from "sharp";

const PHONE = "+971 52 691 9169";
const WEBSITE = "www.TheGrandPolo.com";

// Allowed floor plan images (security whitelist)
const ALLOWED_IMAGES = [
  "/images/floorplans/chevalia-estate-floorplan.png",
  "/images/floorplans/chevalia-estate-2-floorplan.png",
  "/images/floorplans/chevalia-fields-floorplan.png",
  "/images/floorplans/equestra-floorplan.png",
  "/images/floorplans/equitera-floorplan.png",
  "/images/floorplans/equitera-2-floorplan.png",
  "/images/floorplans/montura-floorplan.png",
  "/images/floorplans/montura-2-floorplan.png",
  "/images/floorplans/montura-3-floorplan.png",
  "/images/floorplans/selvara-1-floorplan.png",
  "/images/floorplans/selvara-2-floorplan.png",
  "/images/floorplans/selvara-3-floorplan.png",
  "/images/floorplans/selvara-4-floorplan.png",
];

async function createWatermarkSvg(width: number, height: number): Promise<Buffer> {
  const barHeight = Math.max(50, Math.floor(height * 0.06));
  const fontSize = Math.max(16, Math.floor(width / 55));
  const diagonalFontSize = Math.floor(fontSize * 1.8);

  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <!-- Diagonal watermark -->
  <text
    x="${width / 2}"
    y="${height / 2}"
    font-family="Arial, Helvetica, sans-serif"
    font-size="${diagonalFontSize}"
    font-weight="bold"
    fill="rgba(212, 175, 55, 0.07)"
    text-anchor="middle"
    dominant-baseline="central"
    transform="rotate(-30, ${width / 2}, ${height / 2})"
  >${PHONE}  |  ${WEBSITE}</text>

  <!-- Bottom bar background -->
  <rect x="0" y="${height - barHeight}" width="${width}" height="${barHeight}" fill="rgba(42, 21, 6, 0.88)"/>

  <!-- Gold line above bar -->
  <line x1="0" y1="${height - barHeight}" x2="${width}" y2="${height - barHeight}" stroke="rgba(212, 175, 55, 0.6)" stroke-width="2"/>

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

  if (!file || !ALLOWED_IMAGES.includes(file)) {
    return NextResponse.json({ error: "Image not found or not allowed." }, { status: 404 });
  }

  try {
    const filePath = join(process.cwd(), "public", file);
    const imageBuffer = await readFile(filePath);

    // Get image metadata
    const metadata = await sharp(imageBuffer).metadata();
    const width = metadata.width || 1152;
    const height = metadata.height || 864;

    // Create watermark SVG overlay
    const watermarkSvg = await createWatermarkSvg(width, height);

    // Composite: original image + watermark overlay
    const watermarkedBuffer = await sharp(imageBuffer)
      .composite([{
        input: watermarkSvg,
        top: 0,
        left: 0,
      }])
      .png({ quality: 95 })
      .toBuffer();

    // Determine download filename
    const originalName = file.split("/").pop() || "floorplan.png";
    const downloadName = originalName.replace(".png", "-watermarked.png");

    return new NextResponse(new Uint8Array(watermarkedBuffer), {
      status: 200,
      headers: {
        "Content-Type": "image/png",
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
