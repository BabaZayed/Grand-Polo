import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import WhatsAppButton from "@/components/whatsapp-button";
import { SITE_URL } from "@/lib/data";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "About — An Unprecedented Vision",
  description:
    "Learn about Grand Polo Club & Resort — Emaar's flagship equestrian community in Dubai with 3 polo fields, private stables, and 6,661 luxury residences.",
  openGraph: {
    title: "About — Grand Polo Club & Resort",
    description: "An unprecedented vision for equestrian luxury living in Dubai by Emaar Properties.",
    url: `${SITE_URL}/about`,
    images: [{ url: "/images/hero/chevalia-estate-2-hero.jpg", width: 1200, height: 630, alt: "Grand Polo Club & Resort" }],
    type: "website",
  },
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function AboutPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}` },
      { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/about` },
    ],
  };

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "About Grand Polo Club & Resort",
    description: "Learn about Emaar's flagship equestrian community in Dubai",
    url: `${SITE_URL}/about`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <SiteHeader />
      <main className="pt-16 lg:pt-20">
        {/* Hero */}
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
              Our Story
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FFFAF3] mt-3 mb-4">
              An Unprecedented <span className="gold-text">Vision</span>
            </h1>
            <div className="gold-divider max-w-xs mb-4" />
            <p className="text-[#8B6B47] max-w-2xl">
              Grand Polo Club & Resort represents a new chapter in Dubai&apos;s legacy of extraordinary communities — where the equestrian tradition meets contemporary luxury on an unprecedented scale.
            </p>
          </div>
        </section>

        {/* About Grand Polo Vision */}
        <section className="py-16 lg:py-20 bg-[#5D3A1A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#FFFAF3] mb-4">
              The Grand Polo Vision
            </h2>
            <div className="gold-divider max-w-xs mb-6" />
            <p className="text-[#8B6B47] leading-relaxed mb-4">
              Grand Polo Club & Resort is a community built to strike a fine balance between lifestyle principles of leisure, nature, connectivity, wellness, and recreation. It is not merely a residential development — it is a lifestyle statement that blends the heritage of captivating equestrian experiences with seamless landscapes exuding modernity.
            </p>
            <p className="text-[#8B6B47] leading-relaxed mb-4">
              With three championship polo fields, a luxury clubhouse, and private stables at its heart, Grand Polo offers a lifestyle that provides an opportunity to be one with nature, every day. A lifestyle that celebrates the equestrian tradition while providing every modern comfort. Spanning 5.54 million square metres with 22 residential clusters and 6,661 residences, it is one of the most ambitious equestrian-themed communities ever conceived.
            </p>
            <p className="text-[#8B6B47] leading-relaxed">
              Beyond the gallop, life unfolds as a harmonious interplay between the thrill of sport and the tranquillity of nature. Sunlit days by the Galloping Fountain, exhilarating matches enjoyed from your private vantage, tranquil evenings spent amidst the floral garden and along verdant paths — this is the Grand Polo way of life.
            </p>
          </div>
        </section>

        {/* About Emaar Properties */}
        <section className="py-16 lg:py-20 brochure-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#2A1506] mb-4">
              About Emaar Properties
            </h2>
            <div className="gold-divider max-w-xs mb-6" />
            <p className="text-[#5D3A1A] leading-relaxed mb-4">
              Emaar Properties PJSC is one of the world&apos;s most valuable real estate development companies. Listed on the Dubai Financial Market, Emaar has a proven track record of delivering iconic masterplan communities and landmarks that have shaped Dubai&apos;s skyline and established the city as a global destination.
            </p>
            <p className="text-[#5D3A1A] leading-relaxed mb-4">
              The developer of the Burj Khalifa — the world&apos;s tallest building — The Dubai Mall — the world&apos;s largest shopping destination — Dubai Marina, Arabian Ranches, and Downtown Dubai, Emaar has delivered over 60,000 residences and created some of the most sought-after addresses in the world. Properties in Emaar communities consistently outperform the broader market, with historical appreciation rates of 8-15% annually for off-plan purchases.
            </p>
            <p className="text-[#5D3A1A] leading-relaxed mb-6">
              Grand Polo Club & Resort is Emaar&apos;s latest flagship community, bringing the equestrian lifestyle to Dubai for the first time at this scale. The developer&apos;s reputation ensures that Grand Polo will be delivered to the highest standards, protecting and enhancing your investment.
            </p>
            <a
              href="https://www.emaar.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#E8C84A] transition-colors text-sm font-medium"
            >
              Visit emaar.com <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Architectural Vision */}
        <section className="py-16 lg:py-20 bg-[#5D3A1A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#FFFAF3] mb-4">
              Architectural Vision
            </h2>
            <div className="gold-divider max-w-xs mb-6" />
            <p className="text-[#8B6B47] leading-relaxed mb-4">
              The architecture of Grand Polo Club & Resort is defined by clean horizontal and vertical lines that exude grandeur and expansiveness — a design philosophy that runs throughout the masterplan. Each villa is positioned to maximise views of the central Green Core, where three polo fields, the clubhouse, and stables create a panoramic backdrop of equestrian excellence.
            </p>
            <p className="text-[#8B6B47] leading-relaxed mb-4">
              Interiors feature a refined blend of opulence and intent — where polished marble and cascading natural light shape each room into a living masterpiece. Carefully curated material palettes echo the equestrian heritage while embracing contemporary luxury, with joinery finishes that reflect the equestrian tradition and metal finishes in warm tones that complement the community&apos;s identity.
            </p>
            <p className="text-[#8B6B47] leading-relaxed">
              The building orientation ensures that natural light floods the living spaces while providing views that connect residents to the equestrian heart of the community. Homes of grandeur, where architecture embodies the elegance of equestrian form, and golden light illuminates meticulously curated landscapes.
            </p>
          </div>
        </section>

        {/* Landscape Vision */}
        <section className="py-16 lg:py-20 brochure-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#2A1506] mb-4">
              Landscape Vision
            </h2>
            <div className="gold-divider max-w-xs mb-6" />
            <p className="text-[#5D3A1A] leading-relaxed mb-4">
              Beyond the gallop, life unfolds as a harmonious interplay between the thrill of sport and the tranquillity of nature. Sunlit days by the Galloping Fountain, exhilarating matches enjoyed from your private vantage, tranquil evenings spent amidst the floral garden and along verdant paths.
            </p>
            <p className="text-[#5D3A1A] leading-relaxed mb-4">
              The landscape design celebrates the natural beauty of the desert while creating lush green spaces — from the forest walk to the mounded garden, every outdoor space connects residents to nature. Villas overlook meadows, polo fields, curated gardens, and private stables — where horses gallop and nature breathes.
            </p>
            <p className="text-[#5D3A1A] leading-relaxed">
              Sweeping views of the central green and sun-dappled meadows stretch like painted landscapes, offering families a canvas to create their story of cherishable moments. The landscape architecture at Grand Polo is not decorative — it is foundational to the community&apos;s identity, creating an environment where the equestrian lifestyle is not an amenity but a daily reality.
            </p>
          </div>
        </section>

        {/* Explore The Oasis Cross-link */}
        <section className="py-16 lg:py-20 bg-[#2A1506]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="rounded-xl p-8 max-w-xl mx-auto border border-[#D4AF37]/15 bg-[#3D2510]/50">
              <h3 className="font-heading text-xl font-bold text-[#FFFAF3] mb-3">
                Explore The Oasis
              </h3>
              <p className="text-[#8B6B47] text-sm mb-6">
                Discover The Oasis by Emaar — another flagship masterplan community featuring a 3.5km crystal lagoon and waterfront living with 7,000+ residences across 9 clusters. A complementary vision for Dubai luxury.
              </p>
              <a
                href="https://oasisemaar.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#E8C84A] transition-colors font-medium"
              >
                Visit oasisemaar.com <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Trusted Resources */}
        <section className="py-16 lg:py-20 bg-[#5D3A1A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#FFFAF3] mb-4">
              Trusted Resources
            </h2>
            <div className="gold-divider max-w-xs mb-6" />
            <p className="text-[#8B6B47] mb-8">
              Authoritative organisations that govern and regulate Dubai&apos;s real estate market, ensuring transparency and investor protection.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: "Emaar Properties", url: "https://www.emaar.com", desc: "Developer of Grand Polo Club & Resort and Dubai's most iconic landmarks" },
                { name: "Dubai Land Department (DLD)", url: "https://www.dubailand.gov.ae", desc: "Government authority regulating Dubai's real estate sector" },
                { name: "RERA", url: "https://www.rera.ae", desc: "Real Estate Regulatory Agency — protecting buyer rights and regulating brokers" },
                { name: "Dubai REST", url: "https://dubairest.gov.ae", desc: "Dubai Real Estate Strategic Trust — secure digital property transactions" },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl p-5 border border-[#D4AF37]/15 bg-[#3D2510]/50 hover:border-[#D4AF37]/30 transition-all group block"
                >
                  <h3 className="text-[#FFFAF3] font-medium group-hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                    {item.name} <ExternalLink className="w-3 h-3" />
                  </h3>
                  <p className="text-[#8B6B47] text-sm mt-1">{item.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
}
