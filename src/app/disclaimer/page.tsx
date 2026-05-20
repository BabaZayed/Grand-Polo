import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import WhatsAppButton from "@/components/whatsapp-button";
import { SITE_URL } from "@/lib/data";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Disclaimer for Grand Polo Club & Resort — Independent Authorised Brokerage, RERA compliance, and legal notices for Dubai real estate.",
  openGraph: {
    title: "Disclaimer — Grand Polo Club & Resort",
    description: "Independent Authorised Brokerage disclaimer and legal notices.",
    url: `${SITE_URL}/disclaimer`,
    type: "website",
  },
  alternates: { canonical: "/disclaimer" },
};

const sections = [
  {
    title: "Independent Authorised Brokerage",
    content:
      "This website is operated by an independent authorised brokerage agent, not by Emaar Properties PJSC directly. While we are authorised to market and sell Grand Polo Club & Resort properties, we are an independent entity and not an employee, subsidiary, or affiliate of Emaar Properties PJSC. All sales are ultimately conducted through and subject to the terms and conditions of Emaar Properties PJSC. Our brokerage licence is issued by the Dubai Land Department (DLD) and regulated by the Real Estate Regulatory Agency (RERA), ensuring compliance with all applicable Dubai real estate laws and regulations. Any agreement for the purchase of a property at Grand Polo Club & Resort is between the buyer and Emaar Properties PJSC.",
  },
  {
    title: "Accuracy of Information",
    content:
      "While every effort has been made to ensure the accuracy of the information presented on this website, we make no warranties or representations regarding its completeness, accuracy, or reliability. Property specifications, prices, availability, payment plans, and handover dates are subject to change by Emaar Properties PJSC without prior notice. Images, renders, and artist impressions are for illustrative purposes only and may not represent the final product. Dimensions, areas, and layouts shown are approximate and may vary from the actual property. Prospective buyers should verify all information directly with Emaar Properties PJSC or their authorised sales office before making any purchasing decision.",
  },
  {
    title: "No Guarantee of Returns",
    content:
      "Any mention of potential rental yields, capital appreciation, return on investment, or other financial metrics on this website is based on market analysis and historical data only. Past performance is not indicative of future results. The Dubai real estate market, like any investment market, carries inherent risks, and property values can fluctuate. We make no guarantees, representations, or warranties regarding the investment performance, rental income, or future value of any property at Grand Polo Club & Resort. Prospective buyers should conduct their own due diligence and seek independent financial, legal, and tax advice before making any property investment.",
  },
  {
    title: "Not Financial Advice",
    content:
      "The information provided on this website does not constitute financial, investment, legal, or tax advice. You should not rely on any information on this website as a substitute for professional advice tailored to your specific circumstances. Always consult with qualified professionals — including financial advisors, legal counsel, and tax specialists — before making any property investment decision. The content on this website is provided for general informational purposes only and should be treated as a starting point for your own research rather than a definitive investment guide.",
  },
  {
    title: "RERA Compliance",
    content:
      "This website and its operator comply with the regulations set forth by the Real Estate Regulatory Agency (RERA) of Dubai and the Dubai Land Department (DLD). All property listings are for developments registered with RERA, and all transactions are conducted in accordance with Dubai's real estate laws. Buyers are protected under RERA's Escrow Law (Law No. 8 of 2007), which ensures that all payments made towards off-plan properties are held in an escrow account managed by DLD until the property is delivered. We encourage all prospective buyers to verify the RERA registration status of any property through the Dubai REST app or the DLD website.",
  },
  {
    title: "Limitation of Liability",
    content:
      "To the maximum extent permitted by applicable law, we disclaim all liability for any loss, damage, or expense arising from your use of this website or reliance on any information provided herein. This includes direct, indirect, incidental, special, and consequential damages, whether based on contract, tort, strict liability, or any other legal theory. We are not liable for any errors, omissions, or inaccuracies in the information provided. Your use of this website is at your sole risk. In no event shall our total liability exceed the amount you paid, if any, to access this website.",
  },
];

export default function DisclaimerPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}` },
      { "@type": "ListItem", position: 2, name: "Disclaimer", item: `${SITE_URL}/disclaimer` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <SiteHeader />
      <main className="pt-16 lg:pt-20">
        <section className="py-16 lg:py-24 bg-[#070B14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#FAF6F0] mb-4">
              Disclaimer
            </h1>
            <div className="gold-divider max-w-xs mb-4" />
            <p className="text-[#8B8678] text-sm mb-8">Last updated: February 2025</p>

            <div className="glass-card rounded-xl p-6 lg:p-8 mb-8 gold-border">
              <p className="text-[#C9A84C] font-heading font-bold text-sm mb-2">
                Independent Authorised Brokerage
              </p>
              <p className="text-[#8B8678] text-sm leading-relaxed">
                This website is operated by an independent authorised brokerage agent, not by Emaar Properties PJSC. All property transactions are subject to Emaar&apos;s terms and conditions. Please read the full disclaimer below carefully.
              </p>
            </div>

            {sections.map((section) => (
              <div key={section.title} className="mb-10">
                <h2 className="font-heading text-xl font-bold text-[#FAF6F0] mb-3">
                  {section.title}
                </h2>
                <p className="text-[#8B8678] leading-relaxed">{section.content}</p>
              </div>
            ))}

            <div className="mt-12 pt-8 border-t border-[#C9A84C]/10">
              <p className="text-[#8B8678] text-sm text-center">
                For questions about this disclaimer, contact us at{" "}
                <a href="mailto:info@thegrandpolo.com" className="text-[#C9A84C] hover:text-[#E0C878]">
                  info@thegrandpolo.com
                </a>
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
