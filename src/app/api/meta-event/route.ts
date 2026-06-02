import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

function hashPII(data: string): string {
  return crypto.createHash("sha256").update(data.trim().toLowerCase()).digest("hex");
}

export async function POST(request: NextRequest) {
  try {
    const token = process.env.META_CONVERSIONS_API_TOKEN;
    if (!token) {
      return NextResponse.json({ success: false, error: "CAPI token not configured" }, { status: 500 });
    }

    const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1510715397129819";
    const body = await request.json();

    const { eventName, eventId, eventSourceUrl, fbc, fbp, email, phone } = body;

    if (!eventName || !eventId) {
      return NextResponse.json({ success: false, error: "eventName and eventId required" }, { status: 400 });
    }

    const userData: Record<string, string> = {};
    if (email) userData.em = hashPII(email);
    if (phone) userData.ph = hashPII(phone);
    if (fbc) userData.fbc = fbc;
    if (fbp) userData.fbp = fbp;

    // Add client IP and user agent for better matching
    const forwarded = request.headers.get("x-forwarded-for");
    const clientIp = forwarded ? forwarded.split(",")[0].trim() : request.headers.get("x-real-ip") || "";
    const userAgent = request.headers.get("user-agent") || "";

    if (clientIp) userData.client_ip_address = clientIp;
    if (userAgent) userData.client_user_agent = userAgent;

    const customData: Record<string, unknown> = {};
    if (body.currency) customData.currency = body.currency;
    if (body.value) customData.value = body.value;
    if (body.contentName) customData.content_name = body.contentName;
    if (body.contentCategory) customData.content_category = body.contentCategory;

    const response = await fetch(`https://graph.facebook.com/v18.0/${pixelId}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [{
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,
          event_source_url: eventSourceUrl || "https://www.thegrandpolo.com",
          user_data: userData,
          action_source: "website",
          custom_data: Object.keys(customData).length > 0 ? customData : undefined,
        }],
        access_token: token,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Meta CAPI error:", response.status, errText);
      return NextResponse.json({ success: false, error: "CAPI request failed" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Meta event API error:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
