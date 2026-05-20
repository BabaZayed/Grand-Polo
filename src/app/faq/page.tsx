import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import WhatsAppButton from "@/components/whatsapp-button";
import FAQContent from "./faq-content";
import { SITE_URL } from "@/lib/data";

export const metadata: Metadata = {
  title: "FAQ — Common Questions",
  description:
    "Frequently asked questions about Grand Polo Club & Resort — pricing, payment plans, Golden Visa, amenities, location, and more.",
  openGraph: {
    title: "FAQ — Grand Polo Club & Resort",
    description: "Common questions about Grand Polo Club & Resort answered.",
    url: `${SITE_URL}/faq`,
    type: "website",
  },
  alternates: { canonical: "/faq" },
};

export default function FAQPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}` },
      { "@type": "ListItem", position: 2, name: "FAQ", item: `${SITE_URL}/faq` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
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
              Knowledge Base
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FAF6F0] mt-3 mb-4">
              Common <span className="gold-text">Questions</span>
            </h1>
            <div className="gold-divider max-w-xs mb-4" />
            <p className="text-[#8B8678] max-w-2xl">
              Everything you need to know about Grand Polo Club & Resort — from property types and pricing to payment plans, Golden Visa eligibility, and community amenities.
            </p>
          </div>
        </section>
        <FAQContent />
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
}
