import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import ContactSection from "@/components/contact-section";
import WhatsAppButton from "@/components/whatsapp-button";
import { SITE_URL } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Us — Grand Polo Club & Resort",
  description:
    "Connect with Grand Polo property consultants for exclusive access, personalized tours, and investment guidance. Call, email, or WhatsApp us today.",
  openGraph: {
    title: "Contact Us — Grand Polo Club & Resort",
    description: "Schedule a private viewing with our property consultants.",
    url: `${SITE_URL}/contact`,
    images: [{ url: "/images/hero/hero-dark.webp", width: 1200, height: 630, alt: "Grand Polo Club & Resort — Contact" }],
    type: "website",
  },
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default function ContactPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}` },
      { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE_URL}/contact` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <SiteHeader />
      <main id="main-content" className="pt-16 lg:pt-20">
        <section className="relative py-16 lg:py-24 bg-[#2A1506] overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(212,175,55,0.3) 1px, transparent 0)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium">
              Get in Touch
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FFFAF3] mt-3 mb-4">
              Schedule a <span className="gold-text">Private Viewing</span>
            </h1>
            <div className="gold-divider max-w-xs mb-4" />
            <p className="text-[#B89B6E] max-w-2xl">
              Our dedicated property consultants are ready to guide you through every step — from initial enquiry to securing your equestrian residence at Grand Polo Club & Resort.
            </p>
          </div>
        </section>
        <ContactSection />
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
}
