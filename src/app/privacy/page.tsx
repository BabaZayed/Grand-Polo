import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import WhatsAppButton from "@/components/whatsapp-button";
import { SITE_URL } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Grand Polo Club & Resort — how we collect, use, and protect your personal data in compliance with UAE and DIFC regulations.",
  openGraph: {
    title: "Privacy Policy — Grand Polo Club & Resort",
    description: "How we collect, use, and protect your personal data.",
    url: `${SITE_URL}/privacy`,
    type: "website",
  },
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    title: "1. Information We Collect",
    content:
      "We collect personal information that you voluntarily provide when filling out enquiry forms, newsletter subscriptions, or contacting us. This includes your name, email address, phone number, and any message content you provide. We also automatically collect certain technical information when you visit our website, including your IP address, browser type, device information, operating system, referring URLs, and browsing behaviour through cookies and similar technologies. This technical data helps us understand how visitors interact with our website and enables us to improve the user experience and optimize our services.",
  },
  {
    title: "2. How We Use Your Information",
    content:
      "We use your personal information to: respond to your enquiries about Grand Polo Club & Resort properties and schedule viewings; send you relevant property information, project updates, and marketing communications where you have provided consent; process and manage your property viewing requests and follow-up communications; comply with applicable laws, regulations, and legal processes; and improve our website, services, and overall customer experience. We may share your information with Emaar Properties PJSC and authorised sales agents for the purpose of facilitating property transactions and ensuring you receive comprehensive service throughout your property journey.",
  },
  {
    title: "3. Data Protection & Security",
    content:
      "We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. All data transmitted through our contact forms is encrypted using SSL/TLS technology. We comply with the Dubai International Financial Centre (DIFC) Data Protection Law No. 5 of 2020 and applicable UAE federal laws regarding data protection, including Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data. Our security measures include regular security assessments, access controls, encryption of sensitive data, and employee training on data protection practices.",
  },
  {
    title: "4. Cookies & Tracking Technologies",
    content:
      "Our website uses cookies and similar tracking technologies to analyse website traffic, deliver personalised content, and improve your browsing experience. We use Google Analytics to collect anonymised usage data, Meta (Facebook) Pixel for advertising and conversion tracking, and essential cookies necessary for website functionality. You can manage cookie preferences through your browser settings at any time. Please note that disabling certain cookies may affect the functionality of the website. Third-party cookies are governed by the respective privacy policies of those services.",
  },
  {
    title: "5. Third-Party Services",
    content:
      "We use third-party services to operate and improve our website, including Google Analytics for website analytics and traffic analysis, Meta (Facebook) for advertising, conversion tracking, and remarketing, and Google services for lead management and communication. These services may collect and process your data according to their own privacy policies. We do not sell, rent, or trade your personal data to any third parties for marketing purposes. Data shared with Emaar Properties PJSC and authorised agents is done so solely for the purpose of facilitating your property enquiry and transaction.",
  },
  {
    title: "6. Your Rights & Contact",
    content:
      "Under applicable data protection laws, you have the right to: access the personal data we hold about you; request correction of inaccurate or incomplete data; request deletion of your personal data; restrict or object to the processing of your data; withdraw consent for marketing communications at any time; and request data portability. To exercise any of these rights, please contact us at info@thegrandpolo.com. We will respond to your request within 30 days. If you are not satisfied with our response, you may lodge a complaint with the relevant data protection authority in the UAE.",
  },
];

export default function PrivacyPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}` },
      { "@type": "ListItem", position: 2, name: "Privacy Policy", item: `${SITE_URL}/privacy` },
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
              Privacy Policy
            </h1>
            <div className="gold-divider max-w-xs mb-4" />
            <p className="text-[#8B8678] text-sm mb-8">Last updated: February 2025</p>

            <div className="glass-card rounded-xl p-6 lg:p-8 mb-8 gold-border">
              <p className="text-[#8B8678] text-sm leading-relaxed">
                This Privacy Policy describes how Grand Polo Club & Resort (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, and protects your personal information when you visit our website or interact with our services. We are committed to ensuring your privacy is protected in compliance with the Dubai International Financial Centre (DIFC) Data Protection Law and applicable UAE federal regulations.
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
                For privacy-related enquiries, contact us at{" "}
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
