import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb, degrees } from "pdf-lib";
import { readFile } from "fs/promises";
import { join } from "path";

const PHONE = "+971 52 691 9169";
const WEBSITE = "www.TheGrandPolo.com";

// Allowed download types and their subdirectories
const ALLOWED_TYPES: Record<string, string> = {
  brochure: "brochures",
  floorplan: "floorplans",
};

// Allowed file names per type (whitelist for security)
const ALLOWED_FILES: Record<string, string[]> = {
  brochure: [
    "chevalia-estate-brochure.pdf",
    "chevalia-estate-2-brochure.pdf",
    "chevalia-fields-brochure.pdf",
    "equestra-brochure.pdf",
    "equitera-brochure.pdf",
    "equitera-2-brochure.pdf",
    "montura-brochure.pdf",
    "montura-2-brochure.pdf",
    "montura-3-brochure.pdf",
    "selvara-1-brochure.pdf",
    "selvara-2-brochure.pdf",
    "selvara-3-brochure.pdf",
    "selvara-4-brochure.pdf",
    "grand-polo-masterplan-brochure.pdf",
  ],
  floorplan: [
    "chevalia-estate-floorplan.pdf",
    "chevalia-estate-2-floorplan.pdf",
    "chevalia-fields-floorplan.pdf",
    "equestra-floorplan.pdf",
    "equitera-floorplan.pdf",
    "equitera-2-floorplan.pdf",
    "montura-floorplan.pdf",
    "montura-2-floorplan.pdf",
    "montura-3-floorplan.pdf",
    "selvara-1-floorplan.pdf",
    "selvara-2-floorplan.pdf",
    "selvara-3-floorplan.pdf",
    "selvara-4-floorplan.pdf",
    "grand-polo-masterplan-floorplan.pdf",
  ],
};

async function addWatermark(pdfBytes: Buffer): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();

  for (const page of pages) {
    const { width, height } = page.getSize();
    const watermarkText = `${PHONE}  |  ${WEBSITE}`;

    // Diagonal watermark across the center
    const textWidth = font.widthOfTextAtSize(watermarkText, 28);
    page.drawText(watermarkText, {
      x: width / 2 - textWidth / 2,
      y: height / 2,
      size: 28,
      font,
      color: rgb(0.831, 0.686, 0.216), // Gold
      opacity: 0.15,
      rotate: degrees(-45),
    });

    // Bottom bar with contact info
    page.drawRectangle({
      x: 0,
      y: 0,
      width,
      height: 30,
      color: rgb(0.165, 0.082, 0.024), // Dark brown
      opacity: 0.9,
    });

    const footerText = `${PHONE}  |  ${WEBSITE}`;
    const footerWidth = font.widthOfTextAtSize(footerText, 9);
    page.drawText(footerText, {
      x: width / 2 - footerWidth / 2,
      y: 10,
      size: 9,
      font,
      color: rgb(0.831, 0.686, 0.216), // Gold
    });
  }

  return pdfDoc.save();
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type"); // "brochure" or "floorplan"
  const file = searchParams.get("file"); // filename

  // Validate type
  if (!type || !ALLOWED_TYPES[type]) {
    return NextResponse.json({ error: "Invalid type. Use 'brochure' or 'floorplan'." }, { status: 400 });
  }

  // Validate file against whitelist
  if (!file || !ALLOWED_FILES[type]?.includes(file)) {
    return NextResponse.json({ error: "File not found or not allowed." }, { status: 404 });
  }

  try {
    const subDir = ALLOWED_TYPES[type];
    const filePath = join(process.cwd(), "public", "downloads", subDir, file);
    const pdfBytes = await readFile(filePath);

    // Add watermark dynamically
    const watermarkedPdf = await addWatermark(Buffer.from(pdfBytes));

    // Determine a friendly download filename
    const displayName = file;

    return new NextResponse(Buffer.from(watermarkedPdf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${displayName}"`,
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  } catch (error) {
    console.error("PDF download error:", error);
    return NextResponse.json({ error: "Failed to generate PDF." }, { status: 500 });
  }
}
