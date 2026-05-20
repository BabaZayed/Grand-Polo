import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import HeroSection from "@/components/hero-section";
import PropertiesSection from "@/components/properties-section";
import EquestrianSection from "@/components/equestrian-section";
import MasterplanSection from "@/components/masterplan-section";
import AmenitiesSection from "@/components/amenities-section";
import ContactSection from "@/components/contact-section";
import NewsletterSection from "@/components/newsletter-section";
import WhatsAppButton from "@/components/whatsapp-button";
import SocialProof from "@/components/social-proof";
import PWAInstallPrompt from "@/components/pwa-install-prompt";

export default function Home() {
  return (
    <main>
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
