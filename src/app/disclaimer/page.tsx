import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import WhatsAppButton from "@/components/whatsapp-button";
import { SITE_URL } from "@/lib/data";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Disclaimer for Grand Polo Club & Resort — Independent Authorised Brokerage, RERA compliance, and legal notices for Dubai real estate.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Disclaimer — Grand Polo Club & Resort",
    description: "Independent Authorised Brokerage disclaimer and legal notices.",
    url: `${SITE_URL}/disclaimer`,
    type: "website",
  },
  alternates: { canonical: `${SITE_URL}/disclaimer` },
};

const sections = [
  { title: "Independent Authorised Brokerage", content: "This website is operated by an independent authorised brokerage agent, not by Emaar Properties PJSC directly. While we are authorised to market and sell Grand Polo Club & Resort properties, we are an independent entity. All sales are ultimately conducted through and subject to the terms and conditions of Emaar Properties PJSC." },
  { title: "Accuracy of Information", content: "While every effort has been made to ensure the accuracy of the information presented on this website, we make no warranties or representations regarding its completeness, accuracy, or reliability. Property specifications, prices, availability, payment plans, and handover dates are subject to change by Emaar Properties PJSC without prior notice." },
  { title: "No Guarantee of Returns", content: "Any mention of potential rental yields, capital appreciation, return on investment, or other financial metrics on this website is based on market analysis and historical data only. Past performance is not indicative of future results." },
  { title: "Not Financial Advice", content: "The information provided on this website does not constitute financial, investment, legal, or tax advice. You should not rely on any information on this website as a substitute for professional advice tailored to your specific circumstances." },
  { title: "RERA Compliance", content: "This website and its operator comply with the regulations set forth by the Real Estate Regulatory Agency (RERA) of Dubai and the Dubai Land Department (DLD). All property listings are for developments registered with RERA, and all transactions are conducted in accordance with Dubai's real estate laws." },
  { title: "Limitation of Liability", content: "To the maximum extent permitted by applicable law, we disclaim all liability for any loss, damage, or expense arising from your use of this website or reliance on any information provided herein." },
];

export default function DisclaimerPage() {
  // No BreadcrumbList schema — this page is noindex, structured data is unnecessary

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="pt-16 lg:pt-20">
        <section className="py-16 lg:py-24 bg-[#5D3A1A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#FFFAF3] mb-4">Disclaimer</h1>
            <div className="gold-divider max-w-xs mb-4" />
            <p className="text-[#B89B6E] text-sm mb-8">Last updated: February 2025</p>
            <div className="rounded-xl p-6 lg:p-8 mb-8 border border-[#D4AF37]/30 bg-[#3D2510]/50">
              <p className="text-[#D4AF37] font-heading font-bold text-sm mb-2">Independent Authorised Brokerage</p>
              <p className="text-[#B89B6E] text-sm leading-relaxed">
                This website is operated by an independent authorised brokerage agent, not by Emaar Properties PJSC. All property transactions are subject to Emaar&apos;s terms and conditions. Please read the full disclaimer below carefully.
              </p>
            </div>
            {sections.map((section) => (
              <div key={section.title} className="mb-10">
                <h2 className="font-heading text-xl font-bold text-[#FFFAF3] mb-3">{section.title}</h2>
                <p className="text-[#B89B6E] leading-relaxed">{section.content}</p>
              </div>
            ))}
            <div className="mt-12 pt-8 border-t border-[#D4AF37]/10">
              <p className="text-[#B89B6E] text-sm text-center">
                For questions about this disclaimer, contact us at{" "}
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
