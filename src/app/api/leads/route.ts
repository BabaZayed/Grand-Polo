import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";

const leadSchema = z.object({
  name: z.string().optional().default(""),
  email: z.string().email(),
  phone: z.string().optional().default(""),
  message: z.string().optional(),
  formType: z.enum(["contact", "newsletter", "enquiry"]).default("contact"),
  propertyInterest: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

function hashPII(data: string): string {
  return crypto.createHash("sha256").update(data.trim().toLowerCase()).digest("hex");
}

async function sendMetaCAPI(data: {
  email: string;
  phone?: string;
  firstName?: string;
  eventName: string;
  eventId: string;
}) {
  const token = process.env.META_CONVERSIONS_API_TOKEN;
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1013154287947335";
  if (!token) return;

  try {
    const userData: Record<string, string> = { em: hashPII(data.email) };
    if (data.phone) userData.ph = hashPII(data.phone);
    if (data.firstName) userData.fn = hashPII(data.firstName);

    await fetch(`https://graph.facebook.com/v18.0/${pixelId}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [{
          event_name: data.eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: data.eventId,
          user_data: userData,
          action_source: "website",
        }],
        access_token: token,
      }),
    });
  } catch {
    // Non-blocking — don't fail main request
  }
}

async function sendToGoogleSheets(data: Record<string, string>) {
  const webhookUrl = "https://script.google.com/macros/s/AKfycbxybY7jvQzQVEg7-37XInWg9Oj-UxtZIG2P0Fr4WVSCpL4QwPslrhasEmMN4vXXoQnPQg/exec";
  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data).toString(),
    });
  } catch {
    // Non-blocking
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = leadSchema.parse(body);

    // Spam detection
    const name = parsed.name || "";
    const isSpam = name.includes("http") || name.includes("www") || (name.length > 100);

    if (isSpam) {
      return NextResponse.json({ success: false, error: "Invalid submission" }, { status: 400 });
    }

    // Lead scoring
    let score = 10;
    if (parsed.formType === "contact") score = 50;
    if (parsed.formType === "enquiry") score = 70;
    if (parsed.propertyInterest) score += 20;
    if (parsed.phone && parsed.phone.length > 5) score += 10;

    const eventId = crypto.randomUUID();

    // Send to Google Sheets (non-blocking)
    sendToGoogleSheets({
      name: name,
      email: parsed.email,
      phone: parsed.phone || "",
      message: parsed.message || "",
      formType: parsed.formType,
      propertyInterest: parsed.propertyInterest || "",
      utmSource: parsed.utmSource || "",
      utmMedium: parsed.utmMedium || "",
      utmCampaign: parsed.utmCampaign || "",
      leadScore: score.toString(),
    });

    // Meta CAPI (non-blocking)
    sendMetaCAPI({
      email: parsed.email,
      phone: parsed.phone,
      firstName: name.split(" ")[0] || undefined,
      eventName: parsed.formType === "newsletter" ? "Lead" : "Contact",
      eventId,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead API error:", error);
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }
}
