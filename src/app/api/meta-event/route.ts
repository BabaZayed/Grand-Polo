import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { z } from "zod";

function hashPII(data: string): string {
  return crypto.createHash("sha256").update(data.trim().toLowerCase()).digest("hex");
}

function validateOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return false;
  try {
    const originHost = new URL(origin).host;
    return originHost === host;
  } catch {
    return false;
  }
}

const metaEventSchema = z.object({
  eventName: z.enum(["ViewContent", "Lead", "Contact", "Search", "InitiateCheckout", "CompleteRegistration", "AddToWishlist"]),
  eventId: z.string().max(128),
  eventSourceUrl: z.string().url().optional(),
  fbc: z.string().max(128).optional(),
  fbp: z.string().max(128).optional(),
  email: z.string().email().optional(),
  phone: z.string().max(20).optional(),
  currency: z.enum(["AED", "USD", "EUR", "GBP"]).optional(),
  value: z.number().positive().optional(),
  contentName: z.string().max(200).optional(),
  contentCategory: z.string().max(100).optional(),
});

export async function POST(request: NextRequest) {
  try {
    // CSRF protection — validate origin
    if (!validateOrigin(request)) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    const token = process.env.META_CONVERSIONS_API_TOKEN;
    if (!token) {
      // Generic error — don't disclose configuration details
      return NextResponse.json({ success: false, error: "Service unavailable" }, { status: 503 });
    }

    const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
    if (!pixelId || !/^\d+$/.test(pixelId)) {
      return NextResponse.json({ success: false, error: "Service unavailable" }, { status: 503 });
    }

    const body = await request.json();
    const parsed = metaEventSchema.parse(body);

    // Validate eventSourceUrl belongs to our domain
    let safeEventUrl = "https://www.thegrandpolo.com";
    if (parsed.eventSourceUrl && parsed.eventSourceUrl.startsWith("https://www.thegrandpolo.com")) {
      safeEventUrl = parsed.eventSourceUrl;
    }

    const userData: Record<string, string> = {};
    if (parsed.email) userData.em = hashPII(parsed.email);
    if (parsed.phone) userData.ph = hashPII(parsed.phone);
    if (parsed.fbc) userData.fbc = parsed.fbc;
    if (parsed.fbp) userData.fbp = parsed.fbp;

    // Add client IP and user agent for better matching
    const forwarded = request.headers.get("x-forwarded-for");
    const clientIp = forwarded ? forwarded.split(",")[0].trim() : request.headers.get("x-real-ip") || "";
    const userAgent = request.headers.get("user-agent") || "";

    if (clientIp) userData.client_ip_address = clientIp;
    if (userAgent) userData.client_user_agent = userAgent;

    const customData: Record<string, unknown> = {};
    if (parsed.currency) customData.currency = parsed.currency;
    if (parsed.value) customData.value = parsed.value;
    if (parsed.contentName) customData.content_name = parsed.contentName;
    if (parsed.contentCategory) customData.content_category = parsed.contentCategory;

    const response = await fetch(`https://graph.facebook.com/v18.0/${pixelId}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [{
          event_name: parsed.eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: parsed.eventId,
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
      return NextResponse.json({ success: false, error: "Upstream error" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Meta event API error:", err);
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }
}
