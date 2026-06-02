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
    images: [{ url: "/images/hero/masterplan-bg.webp", width: 1200, height: 630, alt: "Grand Polo Club & Resort Masterplan" }],
    url: `${SITE_URL}/masterplan`,
    type: "website",
  },
  alternates: { canonical: `${SITE_URL}/masterplan` },
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
      <main id="main-content" className="pt-16 lg:pt-20">
        {/* Hero */}
        <section className="relative py-16 lg:py-24 bg-[#2A1506] overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(212,175,55,0.3) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium">Community Overview</span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FFFAF3] mt-3 mb-4">
              A Balanced <span className="gold-text">Masterpiece</span>
            </h1>
            <div className="gold-divider max-w-xs mb-4" />
            <p className="text-[#B89B6E] max-w-2xl">
              A visionary 5.54 million square metre community designed around the equestrian lifestyle — where polo fields, private stables, and a luxury clubhouse form the beating heart of 22 residential clusters and 6,661 homes.
            </p>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="py-16 lg:py-20 brochure-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="rounded-xl p-5 lg:p-6 text-center border border-[#D4AF37]/20 bg-white/50 hover:border-[#D4AF37]/40 transition-all">
                    <Icon className="w-5 h-5 text-[#D4AF37] mx-auto mb-2" />
                    <p className="text-[#D4AF37] font-heading text-xl lg:text-2xl font-bold">{stat.value}</p>
                    <p className="text-[#5D3A1A] text-xs mt-1">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* The Green Core */}
        <section className="py-16 lg:py-20 bg-[#5D3A1A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium">The Heart</span>
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#FFFAF3] mt-2 mb-4">The Green Core</h2>
            <div className="gold-divider max-w-xs mb-6" />
            <p className="text-[#B89B6E] max-w-3xl mb-10 leading-relaxed">
              At the heart of Grand Polo lies the Green Core — 340,000 SqM of polo fields, stables, and the clubhouse. This central green space connects all 22 residential clusters through a network of walking paths, cycling routes, and landscaped gardens.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "3 Championship Polo Fields", desc: "Hosting international tournaments and daily matches across 340,000 SqM of meticulously maintained grounds." },
                { title: "Private Stables & Riding Arenas", desc: "State-of-the-art stabling with expert care, professional training programs, and 3 jumping arenas." },
                { title: "5,600 SqM Luxury Clubhouse", desc: "Fine dining, lounge areas, and exclusive member amenities with panoramic views of the polo fields." },
              ].map((item) => (
                <div key={item.title} className="rounded-xl p-6 border border-[#D4AF37]/15 bg-[#3D2510]/50 hover:border-[#D4AF37]/30 transition-all">
                  <h3 className="font-heading text-lg font-bold text-[#FFFAF3] mb-2">{item.title}</h3>
                  <p className="text-[#B89B6E] text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="py-16 lg:py-20 brochure-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium">Strategic Positioning</span>
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#2A1506] mt-2 mb-4">Prime Location</h2>
            <div className="gold-divider max-w-xs mb-6" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <div className="flex items-start gap-3 mb-8">
                  <MapPin className="w-5 h-5 text-[#D4AF37] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[#2A1506] font-medium">{masterPlanFacts.location}</p>
                    <p className="text-[#5D3A1A] text-sm mt-1">Dubai South, near Al Maktoum International Airport</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  {[
                    { label: "Al Maktoum International Airport", time: "5 min", desc: "World's largest airport upon $35B expansion completion" },
                    { label: "Expo City Dubai", time: "10 min", desc: "Legacy district of Expo 2020 Dubai" },
                    { label: "Downtown Dubai / Burj Khalifa", time: "30 min", desc: "Dubai's iconic urban core" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-lg px-5 py-4 border border-[#D4AF37]/15 bg-white/50">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[#5D3A1A]">{item.label}</span>
                        <span className="flex items-center gap-1 text-[#D4AF37] font-bold"><Clock className="w-3 h-3" /> {item.time}</span>
                      </div>
                      <p className="text-[#5D3A1A]/60 text-xs">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl p-6 mt-6 border border-[#D4AF37]/30 bg-white/50">
                  <div className="flex items-center gap-3 mb-2">
                    <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
                    <p className="font-heading text-lg text-[#D4AF37] font-bold">Golden Visa Eligible</p>
                  </div>
                  <p className="text-[#5D3A1A] text-sm">All properties at Grand Polo qualify for the UAE 10-Year Golden Visa with family sponsorship. Properties start from AED 7.34M.</p>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden border border-[#D4AF37]/15">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14420.9!2d55.2!3d24.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDU0JzAwLjAiTiA1NcKwMTInMDAuMCJF!5e0!3m2!1sen!2sae!4v1"
                  width="100%" height="400"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)" }}
                  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Grand Polo Location"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Amenities Grid */}
        <section className="py-16 lg:py-20 bg-[#2A1506]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium">World-Class Facilities</span>
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#FFFAF3] mt-2 mb-8">23 Premium Amenities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {amenities.map((amenity) => {
                const Icon = iconMap[amenity.icon] || TreePine;
                return (
                  <div key={amenity.name} className="rounded-lg p-4 text-center border border-[#D4AF37]/10 bg-[#3D2510]/50 hover:border-[#D4AF37]/30 transition-all">
                    <Icon className="w-6 h-6 text-[#D4AF37] mx-auto mb-2" />
                    <div className="text-[#FFFAF3] text-sm font-medium">{amenity.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-20 bg-[#5D3A1A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#FFFAF3] mb-4">Ready to Explore?</h2>
            <p className="text-[#B89B6E] max-w-xl mx-auto mb-8">Discover the properties that call Grand Polo home, or speak with our consultants to find your perfect equestrian residence.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/projects" className="inline-flex items-center justify-center h-12 px-8 gold-gradient text-[#2A1506] font-bold text-sm rounded-lg hover:opacity-90 transition-opacity">View Properties</Link>
              <Link href="/contact" className="inline-flex items-center justify-center h-12 px-8 rounded-lg border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 text-sm font-medium transition-colors">Contact Us</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
}
