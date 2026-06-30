import { Metadata } from "next";
import { SITE_URL } from "@/lib/data";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import WhatsAppButton from "@/components/whatsapp-button";

export const metadata: Metadata = {
  title: "The Elite Villa Collection — 5BR Luxury Villas | Emaar Dubai",
  description: "Exclusive release: 5-bedroom luxury villas at Grand Polo Club & Resort by Emaar. The Grand Estates (8,635 Sq.Ft.) & Boutique Sanctuaries. From AED 11.23M. 30% in 2026, 20% at handover 2029.",
  openGraph: {
    title: "Grand Polo Elite Villa Collection — Emaar Dubai",
    description: "Exclusive 5BR villas at Grand Polo Club & Resort. Chevalia, Equestra & Equiterra. Starting from AED 11.23M.",
    url: `${SITE_URL}/gpcr-elite-collection`,
    images: [{ url: "/images/hero/hero-dark.webp", width: 1200, height: 630, alt: "Grand Polo Elite Villa Collection" }]
  },
  alternates: { canonical: `${SITE_URL}/gpcr-elite-collection` },
};

const villas = [
  {
    cluster: "CHEVALIA ESTATE 2",
    name: "Villa 25",
    br: "5 BR",
    bua: "8,635 Sq.Ft.",
    plot: "8,875 Sq.Ft.",
    price: "AED 19.86M",
    psf: "AED 2,299 / Sq.Ft.",
    tier: "grand"
  },
  {
    cluster: "CHEVALIA ESTATE 2",
    name: "Villa 7",
    br: "5 BR",
    bua: "8,635 Sq.Ft.",
    plot: "8,875 Sq.Ft.",
    price: "AED 18.80M",
    psf: "AED 2,177 / Sq.Ft.",
    tier: "grand"
  },
  {
    cluster: "EQUESTRA",
    name: "Villa 211",
    br: "5 BR",
    bua: "5,055 Sq.Ft.",
    plot: "5,380 Sq.Ft.",
    price: "AED 11.23M",
    psf: "AED 2,222 / Sq.Ft.",
    tier: "boutique"
  },
  {
    cluster: "EQUITERRA",
    name: "Villa 264",
    br: "5 BR",
    bua: "5,056 Sq.Ft.",
    plot: "5,400 Sq.Ft.",
    price: "AED 11.24M",
    psf: "AED 2,223 / Sq.Ft.",
    tier: "boutique"
  },
];

const paymentPlan = [
  { pct: "30%", label: "Payable in 2026", desc: "Low entry barrier — secure your unit with minimal upfront capital" },
  { pct: "50%", label: "2027 – 2028", desc: "Balanced milestones spread smoothly across the construction period" },
  { pct: "20%", label: "Handover 2029", desc: "Final installment completely deferred until you receive your keys" },
];

const reasons = [
  { emoji: "🏆", title: "Emaar's Flagship", desc: "A high-end community built entirely around an exclusive, resort-style equestrian lifestyle — polo fields, clubhouse, and world-class amenities." },
  { emoji: "🌳", title: "World-Class Master Plan", desc: "Professional polo fields, lush green parks, elite wellness centers, running tracks — a complete resort lifestyle." },
  { emoji: "📈", title: "Built-In Equity", desc: "Highly competitive entry pricing compared to established luxury developments, ensuring strong capital appreciation potential." },
];

export default function GPCRPage() {
  return (
    <main id="main-content" className="bg-[#2A1506]">
      <SiteHeader />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#2A1506] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-4">Emaar Properties · Exclusive Release</p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-[#FFFAF3] mb-4 leading-tight">
            The Elite <span className="gold-text">Villa Collection</span>
          </h1>
          <div className="gold-divider max-w-xs mx-auto mb-6" />
          <p className="text-[#B89B6E] text-base max-w-2xl mx-auto mb-8">
            A rare entry-level pricing averaging AED 2,230/Sq.Ft. — high capital growth, premium lifestyle investment at Grand Polo Club & Resort.
          </p>
          <WhatsAppButton />
        </div>
      </section>

      {/* The Grand Estates */}
      <section className="py-20 bg-[#3D2510]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-2">The Exclusive Inventory</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#FFFAF3] mb-3">The Grand <span className="gold-text">Estates</span></h2>
            <p className="text-[#B89B6E] text-sm">Massive plots and layouts — the pinnacle of polo-side living</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {villas.filter(v => v.tier === "grand").map((v, i) => (
              <div key={i} className="bg-[#2A1506]/80 border border-[#D4AF37]/15 rounded-xl p-8 hover:border-[#D4AF37]/30 transition-all">
                <span className="text-[10px] font-bold px-3 py-1 rounded-full gold-gradient text-[#2A1506] uppercase tracking-wide">{v.cluster}</span>
                <h3 className="font-heading text-2xl text-[#FFFAF3] mt-4 mb-5">{v.name}</h3>
                <div className="flex gap-6 flex-wrap mb-6">
                  <div><p className="text-[#B89B6E] text-xs">BEDROOMS</p><p className="text-[#FFFAF3] font-semibold">{v.br}</p></div>
                  <div><p className="text-[#B89B6E] text-xs">BUA</p><p className="text-[#FFFAF3] font-semibold">{v.bua}</p></div>
                  <div><p className="text-[#B89B6E] text-xs">PLOT</p><p className="text-[#FFFAF3] font-semibold">{v.plot}</p></div>
                </div>
                <div className="pt-5 border-t border-[#D4AF37]/10">
                  <span className="text-[#D4AF37] text-2xl font-bold font-heading">{v.price}</span>
                  <span className="text-[#B89B6E] text-sm ml-3">{v.psf}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Boutique Sanctuaries */}
      <section className="py-20 bg-[#5D3A1A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-2">The Exclusive Inventory</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#FFFAF3] mb-3">The Boutique <span className="gold-text">Sanctuaries</span></h2>
            <p className="text-[#B89B6E] text-sm">Curated luxury on a more intimate scale</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {villas.filter(v => v.tier === "boutique").map((v, i) => (
              <div key={i} className="bg-[#3D2510]/60 border border-[#D4AF37]/10 rounded-xl p-7 hover:border-[#D4AF37]/25 transition-all">
                <span className="text-[10px] font-bold px-3 py-1 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] uppercase tracking-wide">{v.cluster}</span>
                <h3 className="font-heading text-2xl text-[#FFFAF3] mt-4 mb-5">{v.name}</h3>
                <div className="flex gap-5 flex-wrap mb-5">
                  <div><p className="text-[#B89B6E] text-xs">BEDROOMS</p><p className="text-[#FFFAF3] font-semibold">{v.br}</p></div>
                  <div><p className="text-[#B89B6E] text-xs">BUA</p><p className="text-[#B89B6E] text-xs">BUA</p><p className="text-[#FFFAF3] font-semibold">{v.bua}</p></div>
                  <div><p className="text-[#B89B6E] text-xs">PLOT</p><p className="text-[#FFFAF3] font-semibold">{v.plot}</p></div>
                </div>
                <div className="pt-5 border-t border-[#D4AF37]/10">
                  <span className="text-[#D4AF37] text-xl font-bold font-heading">{v.price}</span>
                  <span className="text-[#B89B6E] text-sm ml-2">{v.psf}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Plan */}
      <section className="py-20 bg-[#2A1506]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-2">Investment Structure</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#FFFAF3] mb-3">Elite Rewarding <span className="gold-text">Payment Plan</span></h2>
            <p className="text-[#B89B6E] text-sm">Maximize your ROI with a relaxed, construction-linked capital deployment</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {paymentPlan.map((p, i) => (
              <div key={i} className="bg-[#3D2510]/40 border border-[#D4AF37]/10 rounded-xl p-8 text-center">
                <div className="text-4xl font-bold text-[#D4AF37] font-heading mb-3">{p.pct}</div>
                <p className="text-[#FFFAF3] font-semibold mb-3">{p.label}</p>
                <p className="text-[#B89B6E] text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why GPCR */}
      <section className="py-20 bg-[#3D2510]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-2">The Destination</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#FFFAF3] mb-3">Why Grand Polo <span className="gold-text">Club & Resort</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reasons.map((r, i) => (
              <div key={i} className="text-center p-6">
                <div className="text-4xl mb-4">{r.emoji}</div>
                <h4 className="font-heading text-xl text-[#FFFAF3] mb-3">{r.title}</h4>
                <p className="text-[#B89B6E] text-sm leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-b from-[#2A1506] to-[#1A0D03]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl text-[#FFFAF3] mb-4">Act Now — Highly Coveted <span className="gold-text">Inventory</span></h2>
          <p className="text-[#B89B6E] text-base mb-8">Marketing collateral, brochures, and master plans are fully prepared for your review. Reply directly or get in touch immediately.</p>
          <WhatsAppButton />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
