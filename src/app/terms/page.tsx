import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import WhatsAppButton from "@/components/whatsapp-button";
import { SITE_URL } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for Grand Polo Club & Resort website — usage terms, property disclaimers, intellectual property, and legal notices.",
  openGraph: {
    title: "Terms of Service — Grand Polo Club & Resort",
    description: "Usage terms, disclaimers, and legal notices for our website.",
    url: `${SITE_URL}/terms`,
    type: "website",
  },
  alternates: { canonical: "/terms" },
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By accessing and using this website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you must not use this website. These terms apply to all visitors, users, and others who access or use the site. Your continued use of the website following the posting of any changes constitutes acceptance of those changes. We reserve the right to modify these terms at any time, and it is your responsibility to review these terms periodically for updates.",
  },
  {
    title: "2. Website Purpose",
    content:
      "This website is an informational platform for Grand Polo Club & Resort, a development by Emaar Properties PJSC. The website is operated by an authorised independent brokerage agent. The purpose of the site is to provide information about the development, showcase available properties, and facilitate enquiries between potential buyers and authorised sales agents. Nothing on this website constitutes an offer to sell or a solicitation of an offer to buy any property. All property transactions are subject to the terms and conditions set by Emaar Properties PJSC.",
  },
  {
    title: "3. Property Information",
    content:
      "All property information, including but not limited to prices, specifications, floor plans, dimensions, amenities, availability, and handover dates, is provided for informational purposes only and is subject to change without prior notice. While we make every effort to ensure the accuracy of the information presented, we do not guarantee its completeness, accuracy, or reliability. Final specifications, prices, and terms are determined by Emaar Properties PJSC and may differ from those displayed on this website. Images, renders, and artist impressions are for illustrative purposes only and may not represent the final product. Prospective buyers should verify all information with Emaar Properties PJSC before making any purchasing decisions.",
  },
  {
    title: "4. No Investment Advice",
    content:
      "Nothing on this website constitutes investment, legal, tax, or financial advice. Any mention of potential returns, rental yields, capital appreciation, or investment performance is based on historical data and market analysis, and should not be relied upon as a guarantee of future performance. Past performance is not indicative of future results. Real estate investments involve risk, and the value of properties can go down as well as up. You should seek independent professional advice from qualified financial, legal, and tax advisors before making any investment decision regarding properties at Grand Polo Club & Resort.",
  },
  {
    title: "5. Intellectual Property",
    content:
      "All content on this website, including text, images, renders, graphics, logos, design elements, and software, is the property of their respective owners and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, create derivative works from, publicly display, publicly perform, or otherwise exploit any content on this website without prior written permission from the copyright holder. The Grand Polo Club & Resort name, logo, and associated branding are trademarks of Emaar Properties PJSC. Unauthorised use of any trademarks or content is strictly prohibited.",
  },
  {
    title: "6. Limitation of Liability",
    content:
      "To the fullest extent permitted by applicable law, we disclaim all liability for any loss or damage arising from your use of this website or reliance on any information provided herein. This includes, but is not limited to, direct, indirect, incidental, special, and consequential damages, loss of profits, data, or business opportunities. We are not responsible for the content, accuracy, or practices of any third-party websites linked from this site. The inclusion of any link does not imply endorsement by us. Your use of this website and any information contained herein is at your sole risk.",
  },
  {
    title: "7. Governing Law",
    content:
      "These Terms of Service are governed by and construed in accordance with the laws of the United Arab Emirates. Any disputes arising from or in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Dubai, UAE. Without prejudice to any other rights or remedies available to us, any breach of these terms may result in immediate termination of your access to this website. If any provision of these terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.",
  },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <SiteHeader />
      <main className="pt-16 lg:pt-20">
        <section className="py-16 lg:py-24 bg-[#070B14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#FAF6F0] mb-4">
              Terms of Service
            </h1>
            <div className="gold-divider max-w-xs mb-4" />
            <p className="text-[#8B8678] text-sm mb-8">Last updated: February 2025</p>

            <div className="glass-card rounded-xl p-6 lg:p-8 mb-8 gold-border">
              <p className="text-[#8B8678] text-sm leading-relaxed">
                These Terms of Service govern your use of the Grand Polo Club & Resort website. By accessing this website, you agree to these terms. Please read them carefully before proceeding. If you have any questions, contact us at{" "}
                <a href="mailto:info@thegrandpolo.com" className="text-[#C9A84C]">
                  info@thegrandpolo.com
                </a>
                .
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

            <div className="mt-12 pt-8 border-t border-[#C9A84C]/10 text-center">
              <p className="text-[#8B8678] text-sm">
                For legal enquiries, contact us at{" "}
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
