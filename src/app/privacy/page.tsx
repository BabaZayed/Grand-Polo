import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import WhatsAppButton from "@/components/whatsapp-button";
import { SITE_URL } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Grand Polo Club & Resort — how we collect, use, and protect your personal data in compliance with UAE and DIFC regulations.",
  robots: { index: false, follow: true },
  openGraph: {
    title: "Privacy Policy — Grand Polo Club & Resort",
    description: "How we collect, use, and protect your personal data.",
    url: `${SITE_URL}/privacy`,
    type: "website",
  },
  alternates: { canonical: `${SITE_URL}/privacy` },
};

const sections = [
  { title: "1. Information We Collect", content: "We collect personal information that you voluntarily provide when filling out enquiry forms, newsletter subscriptions, or contacting us. This includes your name, email address, phone number, and any message content you provide. We also automatically collect certain technical information when you visit our website, including your IP address, browser type, device information, operating system, referring URLs, and browsing behaviour through cookies and similar technologies." },
  { title: "2. How We Use Your Information", content: "We use your personal information to: respond to your enquiries about Grand Polo Club & Resort properties and schedule viewings; send you relevant property information, project updates, and marketing communications where you have provided consent; process and manage your property viewing requests and follow-up communications; comply with applicable laws, regulations, and legal processes; and improve our website, services, and overall customer experience." },
  { title: "3. Data Protection & Security", content: "We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. All data transmitted through our contact forms is encrypted using SSL/TLS technology. We comply with the Dubai International Financial Centre (DIFC) Data Protection Law No. 5 of 2020 and applicable UAE federal laws regarding data protection." },
  { title: "4. Cookies & Tracking Technologies", content: "Our website uses cookies and similar tracking technologies to analyse website traffic, deliver personalised content, and improve your browsing experience. We use Google Analytics to collect anonymised usage data, Meta (Facebook) Pixel for advertising and conversion tracking, and essential cookies necessary for website functionality." },
  { title: "5. Third-Party Services", content: "We use third-party services to operate and improve our website, including Google Analytics for website analytics, Meta (Facebook) for advertising and conversion tracking, and Google services for lead management and communication. We do not sell, rent, or trade your personal data to any third parties for marketing purposes." },
  { title: "6. Your Rights & Contact", content: "Under applicable data protection laws, you have the right to: access the personal data we hold about you; request correction of inaccurate or incomplete data; request deletion of your personal data; restrict or object to the processing of your data; withdraw consent for marketing communications at any time; and request data portability. To exercise any of these rights, please contact us at info@thegrandpolo.com." },
];

export default function PrivacyPage() {
  // No BreadcrumbList schema — this page is noindex, structured data is unnecessary

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="pt-16 lg:pt-20">
        <section className="py-16 lg:py-24 bg-[#5D3A1A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#FFFAF3] mb-4">Privacy Policy</h1>
            <div className="gold-divider max-w-xs mb-4" />
            <p className="text-[#B89B6E] text-sm mb-8">Last updated: February 2025</p>
            <div className="rounded-xl p-6 lg:p-8 mb-8 border border-[#D4AF37]/30 bg-[#3D2510]/50">
              <p className="text-[#B89B6E] text-sm leading-relaxed">
                This Privacy Policy describes how Grand Polo Club & Resort (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, and protects your personal information when you visit our website or interact with our services.
              </p>
            </div>
            {sections.map((section) => (
              <div key={section.title} className="mb-10">
                <h2 className="font-heading text-xl font-bold text-[#FFFAF3] mb-3">{section.title}</h2>
                <p className="text-[#B89B6E] leading-relaxed">{section.content}</p>
              </div>
            ))}
            <div className="mt-12 pt-8 border-t border-[#D4AF37]/10 text-center">
              <p className="text-[#B89B6E] text-sm">
                For privacy-related enquiries, contact us at{" "}
                <a href="mailto:info@thegrandpolo.com" className="text-[#D4AF37] hover:text-[#E8C84A]">info@thegrandpolo.com</a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
}
