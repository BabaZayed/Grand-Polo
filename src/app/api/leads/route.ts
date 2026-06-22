import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";

const leadSchema = z.object({
  name: z.string().max(200).optional().default(""),
  email: z.string().email(),
  phone: z.string().max(30).optional().default(""),
  message: z.string().max(2000).optional(),
  formType: z.enum(["contact", "newsletter", "enquiry"]).default("contact"),
  propertyInterest: z.string().max(200).optional(),
  utmSource: z.string().max(200).optional(),
  utmMedium: z.string().max(200).optional(),
  utmCampaign: z.string().max(200).optional(),
  eventId: z.string().max(128).optional(),
  fbc: z.string().max(128).optional(),
  fbp: z.string().max(128).optional(),
  // Honeypot field — should always be empty (bots fill hidden fields)
  website: z.string().max(0).optional(),
});

function hashPII(data: string): string {
  return crypto.createHash("sha256").update(data.trim().toLowerCase()).digest("hex");
}

function validateOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    const originHost = new URL(origin).host;
    // Accept requests from our domains (handles Vercel preview + custom domain)
    const allowedHosts = [
      "www.thegrandpolo.com",
      "thegrandpolo.com",
      "grand-polo.vercel.app",
    ];
    return allowedHosts.some(h => originHost === h || originHost.endsWith(".vercel.app"));
  } catch {
    return false;
  }
}

async function sendMetaCAPI(data: {
  email: string;
  phone?: string;
  firstName?: string;
  eventName: string;
  eventId: string;
  eventSourceUrl?: string;
  fbc?: string;
  fbp?: string;
  currency?: string;
  value?: number;
}) {
  const token = process.env.META_CONVERSIONS_API_TOKEN;
  if (!token) {
    console.warn("META_CONVERSIONS_API_TOKEN not set — skipping CAPI event");
    return;
  }
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (!pixelId || !/^\d+$/.test(pixelId)) return;

  try {
    const userData: Record<string, string> = { em: hashPII(data.email) };
    if (data.phone) userData.ph = hashPII(data.phone);
    if (data.firstName) userData.fn = hashPII(data.firstName);
    if (data.fbc) userData.fbc = data.fbc;
    if (data.fbp) userData.fbp = data.fbp;

    // Validate eventSourceUrl belongs to our domain
    let safeEventUrl = "https://www.thegrandpolo.com/contact";
    if (data.eventSourceUrl && data.eventSourceUrl.startsWith("https://www.thegrandpolo.com")) {
      safeEventUrl = data.eventSourceUrl;
    }

    const customData: Record<string, unknown> = {};
    if (data.currency) customData.currency = data.currency;
    if (data.value) customData.value = data.value;

    const response = await fetch(`https://graph.facebook.com/v18.0/${pixelId}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [{
          event_name: data.eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: data.eventId,
          event_source_url: safeEventUrl,
          user_data: userData,
          action_source: "website",
          custom_data: Object.keys(customData).length > 0 ? customData : undefined,
        }],
        access_token: token,
      }),
    });

    if (!response.ok) {
      console.error("Meta CAPI error:", response.status);
    }
  } catch (err) {
    console.error("Meta CAPI failed:", err);
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
    // CSRF protection — validate origin
    if (!validateOrigin(request)) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const parsed = leadSchema.parse(body);

    // Honeypot check — if 'website' field is filled, it's a bot
    if (parsed.website) {
      // Silently accept but don't process (don't reveal honeypot detection)
      return NextResponse.json({ success: true, eventId: parsed.eventId || crypto.randomUUID() });
    }

    // Spam detection
    const name = parsed.name || "";
    const message = parsed.message || "";
    const isSpam =
      name.includes("http") ||
      name.includes("www") ||
      name.length > 100 ||
      message.includes("[url") ||
      message.includes("http://") && message.includes(".ru");

    if (isSpam) {
      return NextResponse.json({ success: false, error: "Invalid submission" }, { status: 400 });
    }

    // Lead scoring
    let score = 10;
    if (parsed.formType === "contact") score = 50;
    if (parsed.formType === "enquiry") score = 70;
    if (parsed.propertyInterest) score += 20;
    if (parsed.phone && parsed.phone.length > 5) score += 10;

    const eventId = parsed.eventId || crypto.randomUUID();

    // Determine event name for Meta deduplication
    const eventName = parsed.formType === "newsletter" ? "Lead" : "Contact";

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

    // Meta CAPI with deduplication support (non-blocking)
    sendMetaCAPI({
      email: parsed.email,
      phone: parsed.phone,
      firstName: name.split(" ")[0] || undefined,
      eventName,
      eventId,
      fbc: parsed.fbc,
      fbp: parsed.fbp,
      currency: "AED",
      value: parsed.formType === "enquiry" ? 7340000 : undefined,
    });

    return NextResponse.json({ success: true, eventId });
  } catch (error) {
    console.error("Lead API error:", error);
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }
}
