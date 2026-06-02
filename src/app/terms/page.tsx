import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import WhatsAppButton from "@/components/whatsapp-button";
import { SITE_URL } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for Grand Polo Club & Resort website — usage terms, property disclaimers, intellectual property, and legal notices.",
  robots: { index: false, follow: true },
  openGraph: {
    title: "Terms of Service — Grand Polo Club & Resort",
    description: "Usage terms, disclaimers, and legal notices for our website.",
    url: `${SITE_URL}/terms`,
    type: "website",
  },
  alternates: { canonical: `${SITE_URL}/terms` },
};

const sections = [
  { title: "1. Acceptance of Terms", content: "By accessing and using this website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you must not use this website." },
  { title: "2. Website Purpose", content: "This website is an informational platform for Grand Polo Club & Resort, a development by Emaar Properties PJSC. The website is operated by an authorised independent brokerage agent. Nothing on this website constitutes an offer to sell or a solicitation of an offer to buy any property." },
  { title: "3. Property Information", content: "All property information, including but not limited to prices, specifications, floor plans, dimensions, amenities, availability, and handover dates, is provided for informational purposes only and is subject to change without prior notice. Images, renders, and artist impressions are for illustrative purposes only." },
  { title: "4. No Investment Advice", content: "Nothing on this website constitutes investment, legal, tax, or financial advice. Any mention of potential returns, rental yields, capital appreciation, or investment performance is based on historical data and market analysis, and should not be relied upon as a guarantee of future performance." },
  { title: "5. Intellectual Property", content: "All content on this website, including text, images, renders, graphics, logos, design elements, and software, is the property of their respective owners and is protected by applicable intellectual property laws." },
  { title: "6. Limitation of Liability", content: "To the fullest extent permitted by applicable law, we disclaim all liability for any loss or damage arising from your use of this website or reliance on any information provided herein." },
  { title: "7. Governing Law", content: "These Terms of Service are governed by and construed in accordance with the laws of the United Arab Emirates. Any disputes arising from or in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Dubai, UAE." },
];

export default function TermsPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}` },
      { "@type": "ListItem", position: 2, name: "Terms of Service", item: `${SITE_URL}/terms` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <SiteHeader />
      <main className="pt-16 lg:pt-20">
        <section className="py-16 lg:py-24 bg-[#5D3A1A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#FFFAF3] mb-4">Terms of Service</h1>
            <div className="gold-divider max-w-xs mb-4" />
            <p className="text-[#B89B6E] text-sm mb-8">Last updated: February 2025</p>
            <div className="rounded-xl p-6 lg:p-8 mb-8 border border-[#D4AF37]/30 bg-[#3D2510]/50">
              <p className="text-[#B89B6E] text-sm leading-relaxed">
                These Terms of Service govern your use of the Grand Polo Club & Resort website. By accessing this website, you agree to these terms. Please read them carefully. For questions, contact{" "}
                <a href="mailto:info@thegrandpolo.com" className="text-[#D4AF37]">info@thegrandpolo.com</a>.
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
                For legal enquiries, contact us at{" "}
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
