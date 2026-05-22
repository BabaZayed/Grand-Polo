import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Grand Polo Club & Resort by Emaar — Luxury Equestrian Villas in Dubai";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#2A1506",
          backgroundImage: "linear-gradient(135deg, #2A1506 0%, #5D3A1A 50%, #2A1506 100%)",
        }}
      >
        {/* Decorative top border */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
          }}
        />

        {/* Logo text */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 8,
          }}
        >
          <span
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#D4AF37",
              letterSpacing: "0.15em",
            }}
          >
            GRAND POLO
          </span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: "flex",
            fontSize: 20,
            color: "#8B6B47",
            letterSpacing: "0.3em",
            marginBottom: 30,
          }}
        >
          CLUB &amp; RESORT
        </div>

        {/* Gold divider */}
        <div
          style={{
            width: 200,
            height: 2,
            background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
            marginBottom: 30,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "#E0E0D1",
            opacity: 0.9,
            marginBottom: 20,
          }}
        >
          Dubai&apos;s Premier Equestrian Community by Emaar
        </div>

        {/* Key stats */}
        <div
          style={{
            display: "flex",
            gap: 40,
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: 28, color: "#D4AF37", fontWeight: 700 }}>3</span>
            <span style={{ fontSize: 12, color: "#8B6B47", letterSpacing: "0.1em" }}>POLO FIELDS</span>
          </div>
          <div style={{ width: 1, height: 40, background: "#D4AF37", opacity: 0.3 }} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: 28, color: "#D4AF37", fontWeight: 700 }}>6,661</span>
            <span style={{ fontSize: 12, color: "#8B6B47", letterSpacing: "0.1em" }}>RESIDENCES</span>
          </div>
          <div style={{ width: 1, height: 40, background: "#D4AF37", opacity: 0.3 }} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: 28, color: "#D4AF37", fontWeight: 700 }}>5.54M</span>
            <span style={{ fontSize: 12, color: "#8B6B47", letterSpacing: "0.1em" }}>SQM</span>
          </div>
        </div>

        {/* Price line */}
        <div
          style={{
            display: "flex",
            fontSize: 16,
            color: "#D4AF37",
            marginTop: 25,
          }}
        >
          Villas from AED 7.34M | Golden Visa Eligible
        </div>

        {/* Bottom border */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
