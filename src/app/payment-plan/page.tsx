import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import WhatsAppButton from "@/components/whatsapp-button";
import PaymentPlanContent from "./payment-plan-content";
import { SITE_URL } from "@/lib/data";

export const metadata: Metadata = {
  title: "Payment Plans — Flexible Payment Structures",
  description:
    "Explore flexible payment plans at Grand Polo Club & Resort — 10% down payment with construction-linked instalments. Villas from AED 7.34M.",
  openGraph: {
    title: "Payment Plans — Grand Polo Club & Resort",
    description: "Flexible payment structures with just 10% down payment.",
    url: `${SITE_URL}/payment-plan`,
    type: "website",
    images: [{ url: "/images/hero/chevalia-estate-2-hero.jpg", width: 1200, height: 630, alt: "Grand Polo Club & Resort" }],
  },
  alternates: { canonical: `${SITE_URL}/payment-plan` },
};

export default function PaymentPlanPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-16 lg:pt-20">
        <section className="relative py-16 lg:py-24 bg-[#2A1506] overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(212,175,55,0.3) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium">Flexible Payment Options</span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FFFAF3] mt-3 mb-4">
              Flexible Payment <span className="gold-text">Structures</span>
            </h1>
            <div className="gold-divider max-w-xs mb-4" />
            <p className="text-[#B89B6E] max-w-2xl">
              Construction-linked payment plans with just 10% down payment. Pay gradually as your home takes shape — no interest during the construction period.
            </p>
          </div>
        </section>
        <PaymentPlanContent />
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
}
