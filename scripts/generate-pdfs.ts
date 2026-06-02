/**
 * Generate sample brochure and floorplan PDFs for Grand Polo Club & Resort
 * Run with: npx tsx scripts/generate-pdfs.ts
 */
import { PDFDocument, StandardFonts, rgb, degrees } from "pdf-lib";
import * as fs from "fs";
import * as path from "path";

const PHONE = "+971 52 691 9169";
const WEBSITE = "www.TheGrandPolo.com";
const SITE_NAME = "Grand Polo Club & Resort";
const DEVELOPER = "Emaar Properties PJSC";

interface ProjectInfo {
  name: string;
  slug: string;
  tagline: string;
  bedrooms: string;
  startingPrice: string;
  areaRange: string;
  plotArea: string;
  handover: string;
  paymentPlan: string;
  features: string[];
  amenities: string[];
  totalUnits: number;
}

const projects: ProjectInfo[] = [
  {
    name: "Chevalia Estate",
    slug: "chevalia-estate",
    tagline: "Emerald Horizons — 5-Bedroom Estate Villas",
    bedrooms: "5",
    startingPrice: "AED 9,000,000",
    areaRange: "6,516 sqft",
    plotArea: "7,490 sqft",
    handover: "Q4 2028",
    paymentPlan: "10% Down + Installments",
    features: [
      "5-Bedroom Luxury Villas",
      "Green Core Views",
      "Polished Marble Finishes",
      "Cascading Natural Light",
      "Equestrian-Inspired Architecture",
      "Private Garden",
      "Covered Parking",
      "Maid's Room",
    ],
    amenities: [
      "Three Polo Fields",
      "Luxury Clubhouse",
      "Private Stables",
      "Galloping Fountain",
      "Art Pavilion",
      "Floral Garden",
      "Mounded Garden",
      "Riding Arenas",
      "Fitness Areas",
      "Cycling Paths",
    ],
    totalUnits: 80,
  },
  {
    name: "Chevalia Estate 2",
    slug: "chevalia-estate-2",
    tagline: "Grandeur Estate Living — 4 & 5-Bedroom Villas",
    bedrooms: "4 & 5",
    startingPrice: "AED 7,880,000",
    areaRange: "4,168 - 8,635 sqft",
    plotArea: "5,794 - 9,149 sqft",
    handover: "Q2 2029",
    paymentPlan: "10% Down + Installments",
    features: [
      "4 & 5-Bedroom Luxury Villas",
      "Linear Park Views",
      "Stables & Riding Arenas",
      "Opulent Marble Finishes",
      "Fine Wood Textures",
      "Panoramic Views",
      "Private Garden",
      "Covered Parking",
    ],
    amenities: [
      "Three Polo Fields",
      "Luxury Clubhouse",
      "Private Stables",
      "Riding Arenas",
      "Yoga Hubs",
      "Cycling Paths",
      "Fitness Areas",
      "Expansive Linear Park",
      "Galloping Fountain",
      "Floral Garden",
    ],
    totalUnits: 120,
  },
  {
    name: "Chevalia Fields",
    slug: "chevalia-fields",
    tagline: "Spirit of Polo — 4 & 5-Bedroom Villas",
    bedrooms: "4 & 5",
    startingPrice: "AED 7,340,000",
    areaRange: "4,166 - 5,873 sqft",
    plotArea: "5,584 - 7,013 sqft",
    handover: "Q1 2029",
    paymentPlan: "10% Down + Installments",
    features: [
      "4 & 5-Bedroom Luxury Villas",
      "Polo Field Views",
      "Emerald Landscapes",
      "Equestrian Grace Design",
      "Golden Light Interiors",
      "Private Garden",
      "Covered Parking",
      "Maid's Room",
    ],
    amenities: [
      "Three Polo Fields",
      "Luxury Clubhouse",
      "Private Stables",
      "Art Pavilion",
      "Floral Garden",
      "Mounded Garden",
      "Padel Courts",
      "Mini Golf",
      "Forest Walk",
      "Dog Park",
    ],
    totalUnits: 179,
  },
];

// Color constants
const GOLD = rgb(0.831, 0.686, 0.216);
const DARK_BROWN = rgb(0.165, 0.082, 0.024);
const CREAM = rgb(1.0, 0.98, 0.953);
const MED_BROWN = rgb(0.365, 0.227, 0.102);

async function addWatermark(pdfDoc: PDFDocument) {
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();

  for (const page of pages) {
    const { width, height } = page.getSize();
    const watermarkText = `${PHONE}  |  ${WEBSITE}`;

    // Draw diagonal watermark across the page
    const textWidth = font.widthOfTextAtSize(watermarkText, 28);
    page.drawText(watermarkText, {
      x: width / 2 - textWidth / 2,
      y: height / 2,
      size: 28,
      font,
      color: rgb(0.831, 0.686, 0.216),
      opacity: 0.15,
      rotate: degrees(-45),
    });

    // Bottom bar with contact info
    page.drawRectangle({
      x: 0,
      y: 0,
      width,
      height: 30,
      color: DARK_BROWN,
      opacity: 0.9,
    });

    const footerText = `${PHONE}  |  ${WEBSITE}`;
    const footerWidth = font.widthOfTextAtSize(footerText, 9);
    page.drawText(footerText, {
      x: width / 2 - footerWidth / 2,
      y: 10,
      size: 9,
      font,
      color: GOLD,
    });
  }
}

async function generateBrochure(project: ProjectInfo): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // ===== PAGE 1: Cover =====
  const cover = pdfDoc.addPage([595, 842]);
  const { width: cw, height: ch } = cover.getSize();

  cover.drawRectangle({ x: 0, y: 0, width: cw, height: ch, color: DARK_BROWN });
  cover.drawRectangle({ x: 0, y: ch - 180, width: cw, height: 4, color: GOLD });

  const communityName = SITE_NAME.toUpperCase();
  const communityWidth = fontBold.widthOfTextAtSize(communityName, 18);
  cover.drawText(communityName, {
    x: cw / 2 - communityWidth / 2,
    y: ch - 100,
    size: 18,
    font: fontBold,
    color: GOLD,
  });

  const devText = `by ${DEVELOPER}`;
  const devWidth = font.widthOfTextAtSize(devText, 10);
  cover.drawText(devText, {
    x: cw / 2 - devWidth / 2,
    y: ch - 120,
    size: 10,
    font,
    color: rgb(0.722, 0.608, 0.431),
  });

  cover.drawRectangle({ x: cw / 2 - 40, y: ch - 260, width: 80, height: 2, color: GOLD });

  const projName = project.name.toUpperCase();
  const projWidth = fontBold.widthOfTextAtSize(projName, 36);
  cover.drawText(projName, {
    x: cw / 2 - projWidth / 2,
    y: ch - 310,
    size: 36,
    font: fontBold,
    color: CREAM,
  });

  const tagWidth = font.widthOfTextAtSize(project.tagline, 12);
  cover.drawText(project.tagline, {
    x: cw / 2 - tagWidth / 2,
    y: ch - 340,
    size: 12,
    font,
    color: GOLD,
  });

  const statsY = ch - 480;
  const stats = [
    { label: "Starting Price", value: project.startingPrice },
    { label: "Bedrooms", value: project.bedrooms },
    { label: "BUA", value: project.areaRange },
    { label: "Handover", value: project.handover },
  ];

  const colWidth = cw / stats.length;
  stats.forEach((stat, i) => {
    const cx = colWidth * i + colWidth / 2;
    const valWidth = fontBold.widthOfTextAtSize(stat.value, 13);
    const labWidth = font.widthOfTextAtSize(stat.label, 8);
    cover.drawText(stat.value, { x: cx - valWidth / 2, y: statsY, size: 13, font: fontBold, color: GOLD });
    cover.drawText(stat.label, { x: cx - labWidth / 2, y: statsY - 18, size: 8, font, color: rgb(0.722, 0.608, 0.431) });
  });

  cover.drawRectangle({ x: 0, y: 80, width: cw, height: 2, color: GOLD });

  const contactLine = `${PHONE}  |  ${WEBSITE}`;
  const contactWidth = font.widthOfTextAtSize(contactLine, 9);
  cover.drawText(contactLine, {
    x: cw / 2 - contactWidth / 2,
    y: 55,
    size: 9,
    font,
    color: GOLD,
  });

  // ===== PAGE 2: Overview =====
  const overview = pdfDoc.addPage([595, 842]);
  const { width: ow, height: oh } = overview.getSize();

  overview.drawRectangle({ x: 0, y: oh - 50, width: ow, height: 50, color: DARK_BROWN });
  overview.drawText(`${project.name} — Overview`, { x: 40, y: oh - 33, size: 14, font: fontBold, color: GOLD });

  let yPos = oh - 90;

  overview.drawText("About This Community", { x: 40, y: yPos, size: 12, font: fontBold, color: MED_BROWN });
  yPos -= 20;

  const descLines = wrapText(
    `${project.name} at ${SITE_NAME} is a luxury villa community by ${DEVELOPER}. ` +
    `Featuring ${project.bedrooms}-bedroom villas starting from ${project.startingPrice}, ` +
    `with built-up areas ranging from ${project.areaRange} and plot sizes from ${project.plotArea}. ` +
    `The community comprises ${project.totalUnits} exclusive residences with a handover date of ${project.handover}. ` +
    `Residents enjoy a flexible payment plan of ${project.paymentPlan}, making luxury living more accessible than ever.`,
    font, 10, 500
  );

  for (const line of descLines) {
    overview.drawText(line, { x: 40, y: yPos, size: 10, font, color: rgb(0.2, 0.2, 0.2) });
    yPos -= 15;
  }

  yPos -= 20;

  overview.drawRectangle({ x: 0, y: yPos + 10, width: ow, height: 2, color: GOLD });
  yPos -= 10;
  overview.drawText("Key Features", { x: 40, y: yPos, size: 12, font: fontBold, color: MED_BROWN });
  yPos -= 20;

  for (const feature of project.features) {
    overview.drawText(`*  ${feature}`, { x: 50, y: yPos, size: 10, font, color: rgb(0.2, 0.2, 0.2) });
    yPos -= 16;
  }

  yPos -= 15;

  overview.drawRectangle({ x: 0, y: yPos + 10, width: ow, height: 2, color: GOLD });
  yPos -= 10;
  overview.drawText("Community Amenities", { x: 40, y: yPos, size: 12, font: fontBold, color: MED_BROWN });
  yPos -= 20;

  const midPoint = Math.ceil(project.amenities.length / 2);
  const leftAmenities = project.amenities.slice(0, midPoint);
  const rightAmenities = project.amenities.slice(midPoint);

  let amenY = yPos;
  for (let i = 0; i < Math.max(leftAmenities.length, rightAmenities.length); i++) {
    if (leftAmenities[i]) {
      overview.drawText(`*  ${leftAmenities[i]}`, { x: 50, y: amenY, size: 10, font, color: rgb(0.2, 0.2, 0.2) });
    }
    if (rightAmenities[i]) {
      overview.drawText(`*  ${rightAmenities[i]}`, { x: 300, y: amenY, size: 10, font, color: rgb(0.2, 0.2, 0.2) });
    }
    amenY -= 16;
  }

  // ===== PAGE 3: Payment Plan =====
  const payment = pdfDoc.addPage([595, 842]);
  const { width: pw, height: ph } = payment.getSize();

  payment.drawRectangle({ x: 0, y: ph - 50, width: pw, height: 50, color: DARK_BROWN });
  payment.drawText(`${project.name} — Payment Plan`, { x: 40, y: ph - 33, size: 14, font: fontBold, color: GOLD });

  let pyPos = ph - 100;

  payment.drawText("Flexible Construction-Linked Payment Plan", {
    x: 40, y: pyPos, size: 12, font: fontBold, color: MED_BROWN,
  });
  pyPos -= 15;
  payment.drawText(project.paymentPlan, { x: 40, y: pyPos, size: 10, font, color: rgb(0.3, 0.3, 0.3) });
  pyPos -= 30;

  const tableX = 40;
  const colWidths = [200, 120, 150];
  const headers = ["Milestone", "Percentage", "Date"];

  payment.drawRectangle({ x: tableX, y: pyPos + 5, width: colWidths.reduce((a, b) => a + b, 0), height: 25, color: DARK_BROWN });

  let cxPos = tableX;
  headers.forEach((h, i) => {
    payment.drawText(h, { x: cxPos + 8, y: pyPos + 11, size: 10, font: fontBold, color: GOLD });
    cxPos += colWidths[i];
  });
  pyPos -= 25;

  const paymentData = [
    { milestone: "Down Payment", pct: "10%", date: "On Booking" },
    { milestone: "1st Instalment", pct: "10%", date: "Construction Milestone 1" },
    { milestone: "2nd Instalment", pct: "10%", date: "Construction Milestone 2" },
    { milestone: "3rd Instalment", pct: "10%", date: "Construction Milestone 3" },
    { milestone: "4th Instalment", pct: "10%", date: "Construction Milestone 4" },
    { milestone: "5th Instalment", pct: "10%", date: "Construction Milestone 5" },
    { milestone: "6th Instalment", pct: "10%", date: "Construction Milestone 6" },
    { milestone: "7th Instalment", pct: "10%", date: "Construction Milestone 7" },
    { milestone: "Final Payment", pct: "20%", date: "On Completion" },
  ];

  for (let i = 0; i < paymentData.length; i++) {
    const row = paymentData[i];
    const rowColor = i % 2 === 0 ? rgb(0.96, 0.96, 0.96) : rgb(1, 1, 1);
    payment.drawRectangle({
      x: tableX, y: pyPos - 2, width: colWidths.reduce((a, b) => a + b, 0), height: 22, color: rowColor,
    });

    cxPos = tableX;
    const vals = [row.milestone, row.pct, row.date];
    vals.forEach((v, j) => {
      payment.drawText(v, { x: cxPos + 8, y: pyPos + 3, size: 9, font, color: rgb(0.2, 0.2, 0.2) });
      cxPos += colWidths[j];
    });
    pyPos -= 22;
  }

  pyPos -= 20;
  payment.drawRectangle({ x: 40, y: pyPos - 10, width: 470, height: 60, color: rgb(0.96, 0.96, 0.96), borderColor: GOLD, borderWidth: 1 });
  payment.drawText("Payment Summary", { x: 55, y: pyPos + 30, size: 10, font: fontBold, color: MED_BROWN });
  payment.drawText("Down Payment: 10%  |  Instalments: 70% over construction  |  Final: 20% on completion", {
    x: 55, y: pyPos + 12, size: 9, font, color: rgb(0.3, 0.3, 0.3),
  });
  payment.drawText("All properties qualify for the UAE Golden Visa (10-year residency for owner and family)", {
    x: 55, y: pyPos - 2, size: 9, font, color: rgb(0.3, 0.3, 0.3),
  });

  // ===== PAGE 4: Location & Contact =====
  const location = pdfDoc.addPage([595, 842]);
  const { width: lw, height: lh } = location.getSize();

  location.drawRectangle({ x: 0, y: lh - 50, width: lw, height: 50, color: DARK_BROWN });
  location.drawText(`${project.name} — Location & Contact`, { x: 40, y: lh - 33, size: 14, font: fontBold, color: GOLD });

  let lyPos = lh - 100;

  location.drawText("Prime Location in Dubai", { x: 40, y: lyPos, size: 12, font: fontBold, color: MED_BROWN });
  lyPos -= 25;

  const locationFacts = [
    "5 minutes to Al Maktoum International Airport",
    "10 minutes to Expo City Dubai",
    "30 minutes to Downtown Dubai / Burj Khalifa",
    "Near The Oasis by Emaar and Arabian Ranches",
    "Direct access via Emirates Road",
    "Located in Dubai's fastest-growing corridor",
  ];

  for (const fact of locationFacts) {
    location.drawText(`*  ${fact}`, { x: 50, y: lyPos, size: 10, font, color: rgb(0.2, 0.2, 0.2) });
    lyPos -= 18;
  }

  lyPos -= 20;

  location.drawRectangle({ x: 0, y: lyPos + 10, width: lw, height: 2, color: GOLD });
  lyPos -= 10;
  location.drawText("Community Facts", { x: 40, y: lyPos, size: 12, font: fontBold, color: MED_BROWN });
  lyPos -= 25;

  const commFacts = [
    { label: "Total Area", value: "5.54 Million SqM" },
    { label: "Open Space", value: "1.59 Million SqM" },
    { label: "Polo Fields & Stables", value: "340,000 SqM" },
    { label: "Clubhouse GFA", value: "5,600 SqM" },
    { label: "Residential Clusters", value: "22" },
    { label: "Total Residences", value: "6,661" },
    { label: "Polo Fields", value: "3" },
    { label: "Jumping Arenas", value: "3" },
    { label: "Developer", value: DEVELOPER },
    { label: "Golden Visa", value: "Yes (all properties)" },
  ];

  for (const fact of commFacts) {
    location.drawText(`${fact.label}:`, { x: 50, y: lyPos, size: 10, font: fontBold, color: rgb(0.3, 0.3, 0.3) });
    location.drawText(fact.value, { x: 220, y: lyPos, size: 10, font, color: rgb(0.2, 0.2, 0.2) });
    lyPos -= 18;
  }

  lyPos -= 30;
  location.drawRectangle({ x: 40, y: lyPos - 10, width: 470, height: 100, color: DARK_BROWN });

  location.drawText("Get in Touch", { x: 55, y: lyPos + 65, size: 14, font: fontBold, color: GOLD });
  location.drawText(`Phone: ${PHONE}`, { x: 55, y: lyPos + 40, size: 11, font, color: CREAM });
  location.drawText(`WhatsApp: wa.me/971526919169`, { x: 55, y: lyPos + 22, size: 11, font, color: CREAM });
  location.drawText(`Email: info@thegrandpolo.com  |  ${WEBSITE}`, { x: 55, y: lyPos + 4, size: 11, font, color: CREAM });

  await addWatermark(pdfDoc);

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

async function generateFloorplan(project: ProjectInfo): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // ===== PAGE 1: Cover =====
  const cover = pdfDoc.addPage([595, 842]);
  const { width: cw, height: ch } = cover.getSize();

  cover.drawRectangle({ x: 0, y: 0, width: cw, height: ch, color: DARK_BROWN });
  cover.drawRectangle({ x: 0, y: ch - 180, width: cw, height: 4, color: GOLD });

  const title = "FLOOR PLANS";
  const titleWidth = fontBold.widthOfTextAtSize(title, 36);
  cover.drawText(title, { x: cw / 2 - titleWidth / 2, y: ch - 260, size: 36, font: fontBold, color: CREAM });

  const projName = project.name.toUpperCase();
  const projWidth = fontBold.widthOfTextAtSize(projName, 24);
  cover.drawText(projName, { x: cw / 2 - projWidth / 2, y: ch - 300, size: 24, font: fontBold, color: GOLD });

  const tagWidth = font.widthOfTextAtSize(project.tagline, 11);
  cover.drawText(project.tagline, { x: cw / 2 - tagWidth / 2, y: ch - 330, size: 11, font, color: rgb(0.722, 0.608, 0.431) });

  const communityWidth = font.widthOfTextAtSize(SITE_NAME, 12);
  cover.drawText(SITE_NAME, { x: cw / 2 - communityWidth / 2, y: 100, size: 12, font, color: GOLD });

  const contactLine = `${PHONE}  |  ${WEBSITE}`;
  const contactWidth = font.widthOfTextAtSize(contactLine, 9);
  cover.drawText(contactLine, { x: cw / 2 - contactWidth / 2, y: 75, size: 9, font, color: GOLD });

  // ===== PAGE 2: Unit Types =====
  const units = pdfDoc.addPage([595, 842]);
  const { width: uw, height: uh } = units.getSize();

  units.drawRectangle({ x: 0, y: uh - 50, width: uw, height: 50, color: DARK_BROWN });
  units.drawText(`${project.name} — Unit Configurations`, { x: 40, y: uh - 33, size: 14, font: fontBold, color: GOLD });

  let uyPos = uh - 90;

  const unitData = getUnitData(project.slug);

  for (const unit of unitData) {
    units.drawRectangle({ x: 40, y: uyPos - 10, width: 470, height: 100, color: rgb(0.96, 0.96, 0.96), borderColor: GOLD, borderWidth: 1 });

    units.drawText(unit.type, { x: 55, y: uyPos + 70, size: 13, font: fontBold, color: MED_BROWN });

    const unitDetails = [
      `Built-Up Area: ${unit.bua}`,
      `Plot Area: ${unit.plot}`,
      `Starting Price: ${unit.price}`,
      `Total Units: ${unit.units}`,
    ];

    let detailY = uyPos + 50;
    for (const detail of unitDetails) {
      units.drawText(detail, { x: 55, y: detailY, size: 10, font, color: rgb(0.3, 0.3, 0.3) });
      detailY -= 15;
    }

    units.drawRectangle({ x: 340, y: uyPos, width: 150, height: 80, borderColor: rgb(0.8, 0.8, 0.8), borderWidth: 1 });
    const fpText = "Floor Plan";
    const fpWidth = font.widthOfTextAtSize(fpText, 9);
    units.drawText(fpText, { x: 415 - fpWidth / 2, y: uyPos + 35, size: 9, font, color: rgb(0.7, 0.7, 0.7) });
    units.drawText("Reference Only", { x: 370, y: uyPos + 20, size: 7, font, color: rgb(0.7, 0.7, 0.7) });

    uyPos -= 120;
  }

  uyPos -= 20;
  const disclaimerLines = wrapText(
    "Disclaimer: Floor plans, dimensions, and layouts shown are for illustrative purposes only and are subject to change. " +
    "Actual layouts may vary. All dimensions are approximate. Please consult with our sales team for the most up-to-date floor plans and specifications. " +
    "Images are artist impressions and do not represent final finishes.",
    font, 9, 470
  );

  for (const line of disclaimerLines) {
    units.drawText(line, { x: 40, y: uyPos, size: 9, font, color: rgb(0.5, 0.5, 0.5) });
    uyPos -= 12;
  }

  await addWatermark(pdfDoc);

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

function getUnitData(slug: string): { type: string; bua: string; plot: string; price: string; units: string }[] {
  switch (slug) {
    case "chevalia-estate":
      return [{
        type: "5-Bedroom Villa",
        bua: "6,516 sqft",
        plot: "7,490 sqft",
        price: "AED 9,000,000",
        units: "80",
      }];
    case "chevalia-estate-2":
      return [
        { type: "4-Bedroom Luxury Villa", bua: "4,168 sqft", plot: "5,794 sqft", price: "AED 7,880,000", units: "74" },
        { type: "5-Bedroom Ultra Luxury Villa", bua: "5,046 sqft", plot: "6,057 sqft", price: "AED 10,030,000", units: "24" },
        { type: "5-Bedroom Equestrian Luxury Villa", bua: "8,635 sqft", plot: "9,149 sqft", price: "AED 17,610,000", units: "22" },
      ];
    case "chevalia-fields":
      return [
        { type: "4-Bedroom Villa", bua: "4,166 sqft", plot: "5,584 sqft", price: "AED 7,340,000", units: "72" },
        { type: "5-Bedroom Villa", bua: "5,873 sqft", plot: "7,013 sqft", price: "AED 9,190,000", units: "107" },
      ];
    default:
      return [];
  }
}

function wrapText(text: string, font: any, fontSize: number, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = font.widthOfTextAtSize(testLine, fontSize);

    if (testWidth > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

async function main() {
  const outputBase = path.join(process.cwd(), "public", "downloads");

  for (const project of projects) {
    console.log(`Generating brochure for ${project.name}...`);
    const brochureBytes = await generateBrochure(project);
    const brochurePath = path.join(outputBase, "brochures", `${project.slug}-brochure.pdf`);
    fs.writeFileSync(brochurePath, brochureBytes);
    console.log(`  -> ${brochurePath} (${(brochureBytes.length / 1024).toFixed(1)} KB)`);

    console.log(`Generating floorplan for ${project.name}...`);
    const floorplanBytes = await generateFloorplan(project);
    const floorplanPath = path.join(outputBase, "floorplans", `${project.slug}-floorplan.pdf`);
    fs.writeFileSync(floorplanPath, floorplanBytes);
    console.log(`  -> ${floorplanPath} (${(floorplanBytes.length / 1024).toFixed(1)} KB)`);
  }

  console.log("\nAll PDFs generated successfully!");
}

main().catch(console.error);
