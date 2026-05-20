import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import WhatsAppButton from "@/components/whatsapp-button";
import { masterPlanFacts, amenities, SITE_URL } from "@/lib/data";
import {
  MapPin, Building2, TreePine, Users, Home, Trophy, Plane,
  Crown, Waves, Palette, CircleDot, Target, Circle,
  Swords, Sun, Flag, Baby, Dumbbell, Dog, Trees,
  UtensilsCrossed, Flower2, Mountain, Armchair, Gamepad2,
  Bike, Landmark, Shield, ShieldCheck, Clock,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Masterplan — A Balanced Masterpiece",
  description:
    "Grand Polo Club & Resort masterplan — 5.54M SqM equestrian community with 22 residential clusters, 3 polo fields, and world-class amenities by Emaar Properties.",
  openGraph: {
    title: "Masterplan — Grand Polo Club & Resort",
    description: "A visionary 5.54M SqM equestrian community with 22 clusters and 6,661 residences.",
    images: ["/images/hero/masterplan-bg.jpg"],
    url: `${SITE_URL}/masterplan`,
    type: "website",
  },
  alternates: { canonical: "/masterplan" },
};

const iconMap: Record<string, React.ElementType> = {
  Crown, Building2, Waves, Palette, TreePine, CircleDot, Target, Circle,
  Swords, Sun, Flag, Baby, Dumbbell, Dog, Trees, UtensilsCrossed,
  Flower2, Mountain, Armchair, Gamepad2, Bike, Landmark, Shield,
};

const stats = [
  { label: "Total Area", value: masterPlanFacts.totalArea, icon: MapPin },
  { label: "Open Space", value: masterPlanFacts.openSpace, icon: TreePine },
  { label: "Polo & Stables", value: masterPlanFacts.poloFieldsStables, icon: Trophy },
  { label: "Clubhouse GFA", value: masterPlanFacts.clubhouseGFA, icon: Building2 },
  { label: "Residential Clusters", value: `${masterPlanFacts.residentialClusters}`, icon: Home },
  { label: "Total Residences", value: masterPlanFacts.totalResidences.toLocaleString(), icon: Users },
  { label: "Est. Population", value: masterPlanFacts.estimatedPopulation.toLocaleString(), icon: Users },
  { label: "Min to Airport", value: `${masterPlanFacts.minToAirport}`, icon: Plane },
];

export default function MasterplanPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}` },
      { "@type": "ListItem", position: 2, name: "Masterplan", item: `${SITE_URL}/masterplan` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <SiteHeader />
      <main className="pt-16 lg:pt-20">
        {/* Hero */}
        <section className="relative py-16 lg:py-24 bg-[#070B14] overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(201,168,76,0.3) 1px, transparent 0)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <span className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase font-medium">
              Community Overview
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FAF6F0] mt-3 mb-4">
              A Balanced <span className="gold-text">Masterpiece</span>
            </h1>
            <div className="gold-divider max-w-xs mb-4" />
            <p className="text-[#8B8678] max-w-2xl">
              A visionary 5.54 million square metre community designed around the equestrian lifestyle — where polo fields, private stables, and a luxury clubhouse form the beating heart of 22 residential clusters and 6,661 homes.
            </p>
          </div>
        </section>

        {/* Full Stats Grid */}
        <section className="py-16 lg:py-20 bg-[#0C1220]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="glass-card rounded-xl p-5 lg:p-6 text-center">
                    <Icon className="w-5 h-5 text-[#C9A84C] mx-auto mb-2" />
                    <p className="text-[#C9A84C] font-heading text-xl lg:text-2xl font-bold">
                      {stat.value}
                    </p>
                    <p className="text-[#8B8678] text-xs mt-1">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* The Green Core */}
        <section className="py-16 lg:py-20 bg-[#070B14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase font-medium">
              The Heart
            </span>
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#FAF6F0] mt-2 mb-4">
              The Green Core
            </h2>
            <div className="gold-divider max-w-xs mb-6" />
            <p className="text-[#8B8678] max-w-3xl mb-10 leading-relaxed">
              At the heart of Grand Polo lies the Green Core — 340,000 SqM of polo fields, stables, and the clubhouse. This central green space connects all 22 residential clusters through a network of walking paths, cycling routes, and landscaped gardens. The Green Core is not merely an amenity; it is the soul of the community, a place where the equestrian tradition comes alive every day. Three championship polo fields host international tournaments and daily matches, while private stables offer world-class care and training. The 5,600 SqM luxury clubhouse provides fine dining, lounge areas, and exclusive member amenities with panoramic views of the fields.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "3 Championship Polo Fields",
                  desc: "Hosting international tournaments and daily matches across 340,000 SqM of meticulously maintained grounds — the largest polo facility in the Middle East.",
                },
                {
                  title: "Private Stables & Riding Arenas",
                  desc: "State-of-the-art stabling with expert care, professional training programs, and 3 jumping arenas for riders of all levels.",
                },
                {
                  title: "5,600 SqM Luxury Clubhouse",
                  desc: "Fine dining, lounge areas, and exclusive member amenities with panoramic views of the polo fields and surrounding landscapes.",
                },
              ].map((item) => (
                <div key={item.title} className="glass-card rounded-xl p-6">
                  <h3 className="font-heading text-lg font-bold text-[#FAF6F0] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#8B8678] text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Architecture */}
        <section className="py-16 lg:py-20 bg-[#0C1220]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase font-medium">
              Design Philosophy
            </span>
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#FAF6F0] mt-2 mb-4">
              The Architecture
            </h2>
            <div className="gold-divider max-w-xs mb-6" />
            <p className="text-[#8B8678] max-w-3xl mb-6 leading-relaxed">
              Grand Polo&apos;s architecture is inspired by the clean lines and grandeur of equestrian estates. Clean horizontal and vertical lines exude grandeur and expansiveness, while golden light illuminates meticulously curated landscapes. Each cluster is designed to maximise views of the Green Core while providing privacy and exclusivity.
            </p>
            <p className="text-[#8B8678] max-w-3xl leading-relaxed">
              Interiors feature a refined blend of opulence and intent — polished marble, cascading natural light, and carefully curated material palettes that echo the equestrian heritage while embracing contemporary luxury. The architecture creates homes of grandeur, where every detail celebrates the elegance of equestrian form and the warmth of golden light.
            </p>
          </div>
        </section>

        {/* The Landscape */}
        <section className="py-16 lg:py-20 bg-[#070B14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase font-medium">
              Natural Beauty
            </span>
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#FAF6F0] mt-2 mb-4">
              The Landscape
            </h2>
            <div className="gold-divider max-w-xs mb-6" />
            <p className="text-[#8B8678] max-w-3xl mb-6 leading-relaxed">
              Beyond the gallop, life unfolds as a harmonious interplay between the thrill of sport and the tranquillity of nature. Sunlit days by the Galloping Fountain, exhilarating matches enjoyed from your private vantage, tranquil evenings spent amidst the floral garden and along verdant paths. The landscape design celebrates the natural beauty of the Arabian desert while creating lush green spaces — from the forest walk to the mounded garden.
            </p>
            <p className="text-[#8B8678] max-w-3xl leading-relaxed">
              Sweeping views of the central green and sun-dappled meadows stretch like painted landscapes, offering families a canvas to create their story of cherishable moments. Every outdoor space has been designed to offer residents a connection to nature that is rare in urban Dubai — a lifestyle that offers an opportunity to be one with nature, every day.
            </p>
          </div>
        </section>

        {/* Location */}
        <section className="py-16 lg:py-20 bg-[#0C1220]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase font-medium">
              Strategic Positioning
            </span>
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#FAF6F0] mt-2 mb-4">
              Prime Location
            </h2>
            <div className="gold-divider max-w-xs mb-6" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <div className="flex items-start gap-3 mb-8">
                  <MapPin className="w-5 h-5 text-[#C9A84C] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[#FAF6F0] font-medium">{masterPlanFacts.location}</p>
                    <p className="text-[#8B8678] text-sm mt-1">
                      Dubai South, near Al Maktoum International Airport
                    </p>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  {[
                    { label: "Al Maktoum International Airport", time: "5 min", desc: "World's largest airport upon $35B expansion completion" },
                    { label: "Expo City Dubai", time: "10 min", desc: "Legacy district of Expo 2020 Dubai" },
                    { label: "Downtown Dubai / Burj Khalifa", time: "30 min", desc: "Dubai's iconic urban core" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="glass-card rounded-lg px-5 py-4"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[#8B8678]">{item.label}</span>
                        <span className="flex items-center gap-1 text-[#C9A84C] font-bold">
                          <Clock className="w-3 h-3" /> {item.time}
                        </span>
                      </div>
                      <p className="text-[#8B8678]/60 text-xs">{item.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Golden Visa Badge */}
                <div className="glass-card rounded-xl p-6 mt-6 gold-border">
                  <div className="flex items-center gap-3 mb-2">
                    <ShieldCheck className="w-6 h-6 text-[#C9A84C]" />
                    <p className="font-heading text-lg text-[#C9A84C] font-bold">
                      Golden Visa Eligible
                    </p>
                  </div>
                  <p className="text-[#8B8678] text-sm">
                    All properties at Grand Polo qualify for the UAE 10-Year Golden Visa with family sponsorship. Properties start from AED 7.34M — well above the AED 2M threshold.
                  </p>
                </div>
              </div>
              <div className="glass-card rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14420.9!2d55.2!3d24.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDU0JzAwLjAiTiA1NcKwMTInMDAuMCJF!5e0!3m2!1sen!2sae!4v1"
                  width="100%"
                  height="400"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Grand Polo Location"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Amenities Grid */}
        <section className="py-16 lg:py-20 bg-[#070B14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase font-medium">
              World-Class Facilities
            </span>
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#FAF6F0] mt-2 mb-8">
              23 Premium Amenities
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {amenities.map((amenity) => {
                const Icon = iconMap[amenity.icon] || TreePine;
                return (
                  <div
                    key={amenity.name}
                    className="glass-card rounded-lg p-4 text-center hover:border-[#C9A84C]/30 transition-all"
                  >
                    <Icon className="w-6 h-6 text-[#C9A84C] mx-auto mb-2" />
                    <h4 className="text-[#FAF6F0] text-sm font-medium">{amenity.name}</h4>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-20 bg-[#0C1220]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#FAF6F0] mb-4">
              Ready to Explore?
            </h2>
            <p className="text-[#8B8678] max-w-xl mx-auto mb-8">
              Discover the properties that call Grand Polo home, or speak with our consultants to find your perfect equestrian residence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center h-12 px-8 gold-gradient text-[#070B14] font-bold text-sm rounded-lg hover:opacity-90 transition-opacity"
              >
                View Properties
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center h-12 px-8 rounded-lg border border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C]/10 text-sm font-medium transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
}
