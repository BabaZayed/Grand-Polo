import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import WhatsAppButton from "@/components/whatsapp-button";
import GalleryContent from "./gallery-content";
import { SITE_URL } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery — Designing Natural Dreamscapes",
  description:
    "Explore the visual story of Grand Polo Club & Resort — from polo fields and stables to luxury villa renders and the exclusive clubhouse.",
  openGraph: {
    title: "Gallery — Grand Polo Club & Resort",
    description: "Visual journey through Grand Polo's polo fields, luxury villas, and clubhouse.",
    images: ["/images/gallery/polo-field-1.jpg"],
    url: `${SITE_URL}/gallery`,
    type: "website",
  },
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-16 lg:pt-20">
        {/* Hero */}
        <section className="relative py-16 lg:py-24 bg-[#070B14] overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(201,168,76,0.3) 1px, transparent 0)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <span className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase font-medium">
              Visual Journey
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FAF6F0] mt-3 mb-4">
              Designing Natural <span className="gold-text">Dreamscapes</span>
            </h1>
            <div className="gold-divider max-w-xs mb-4" />
            <p className="text-[#8B8678] max-w-2xl">
              Explore the visual story of Grand Polo Club & Resort — from championship polo fields and private stables to luxury villa renders and the exclusive clubhouse. Each image captures a facet of the equestrian lifestyle that awaits.
            </p>
          </div>
        </section>

        <GalleryContent />
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
}
