import { NextRequest, NextResponse } from "next/server";

/**
 * WhatsApp Webhook Endpoint — The Grand Polo (dedicated, independent of the shared
 * oasisemaar.com/api/wa webhook). Handles Meta's verification handshake (GET) and
 * incoming message auto-reply (POST) for +1 555-914-8659.
 */

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || "grand_polo_webhook_verify_2026";
const WHATSAPP_TOKEN = process.env.WHATSAPP_SYSTEM_TOKEN || process.env.WHATSAPP_ACCESS_TOKEN || "";
const PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID || "1105433352662667";

const ESCALATION_KEYWORDS = [
  "speak to ahmed", "talk to ahmed", "ahmed directly",
  "human", "real person", "call me", "phone call",
  "urgent", "manager", "supervisor", "complaint",
  "not a bot", "speak to someone", "live agent"
];

const WELCOME_REPLY = `Welcome to The Grand Polo - Grand Polo Club & Resort by Emaar.

I'm Tina, your personal consultant for this development. To connect you with the right availability, please share:

- Which unit type are you interested in (villa, townhouse)?
- Are you seeking a primary residence, secondary home, or investment allocation?
- What is your preferred bedroom count and budget range?

I'll personally route you to a senior consultant within 2 hours.

- Tina, The Grand Polo`;

const ESCALATION_REPLY = `Thank you. I've flagged your request as a priority.

A senior consultant will message you directly here on WhatsApp within the next hour. For immediate assistance, call:

+971 52 691 9169

- Tina, The Grand Polo`;

async function sendWhatsApp(to: string, message: string) {
  if (!WHATSAPP_TOKEN) return null;
  try {
    const r = await fetch(`https://graph.facebook.com/v22.0/${PHONE_ID}/messages`, {
      method: "POST",
      headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({ messaging_product: "whatsapp", to, type: "text", text: { body: message } }),
    });
    return await r.json();
  } catch (e) {
    console.error("Send error:", e);
    return null;
  }
}

function isEscalation(text: string) {
  const lower = (text || "").toLowerCase();
  return ESCALATION_KEYWORDS.some(kw => lower.includes(kw));
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");
  if (mode === "subscribe" && token === VERIFY_TOKEN && challenge) {
    return new Response(challenge, { status: 200, headers: { "Content-Type": "text/plain" } });
  }
  return new Response("Forbidden", { status: 403 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.entry) return new Response("ok", { status: 200 });

    for (const entry of body.entry) {
      for (const change of entry.changes || []) {
        const value = change.value || {};
        if (value.messages) {
          for (const msg of value.messages) {
            const from = msg.from;
            const text = msg.text?.body || "";
            const name = value.contacts?.[0]?.profile?.name || "Unknown";

            if (isEscalation(text)) {
              console.log(`[GP ESCALATION] ${name} (${from}): ${text?.substring(0, 200)}`);
              await sendWhatsApp(from, ESCALATION_REPLY);
              continue;
            }
            console.log(`[GP LEAD] ${name} (${from}): ${text?.substring(0, 100)}`);
            await sendWhatsApp(from, WELCOME_REPLY);
          }
        }
        if (value.statuses) {
          for (const s of value.statuses) {
            console.log(`[GP STATUS] ${s.status} -> ${s.recipient_id}`);
          }
        }
      }
    }
    return new Response("ok", { status: 200 });
  } catch (e) {
    console.error("Grand Polo WA error:", e);
    return new Response("error", { status: 500 });
  }
}
