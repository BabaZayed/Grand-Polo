import dynamic from "next/dynamic";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import HeroSection from "@/components/hero-section";
import PropertiesSection from "@/components/properties-section";
import { SITE_URL } from "@/lib/data";

// Lazy-load below-fold components for faster initial page load
const EquestrianSection = dynamic(() => import("@/components/equestrian-section"));
const MasterplanSection = dynamic(() => import("@/components/masterplan-section"));
const AmenitiesSection = dynamic(() => import("@/components/amenities-section"));
const ContactSection = dynamic(() => import("@/components/contact-section"));
const NewsletterSection = dynamic(() => import("@/components/newsletter-section"));
const WhatsAppButton = dynamic(() => import("@/components/whatsapp-button"));
const SocialProof = dynamic(() => import("@/components/social-proof"));
const PWAInstallPrompt = dynamic(() => import("@/components/pwa-install-prompt"));

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
  ],
};

export default function Home() {
  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <SiteHeader />
      <HeroSection />
      <PropertiesSection />
      <EquestrianSection />
      <MasterplanSection />
      <AmenitiesSection />
      <ContactSection />
      <NewsletterSection />
      <SiteFooter />
      <WhatsAppButton />
      <SocialProof />
      <PWAInstallPrompt />
    </main>
  );
}
