import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects, paymentPlans, unitTypes, formatPrice, SITE_URL } from "@/lib/data";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import WhatsAppButton from "@/components/whatsapp-button";
import { BedDouble, Maximize, LandPlot, Users, Calendar, Tag, Check, ArrowLeft, Phone, Mail, ShieldCheck } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = projects.find((p) => p.slug === slug);
  if (!property) return { title: "Property Not Found" };

  const priceStr = property.startingPrice > 0
    ? `from AED ${(property.startingPrice / 1000000).toFixed(property.startingPrice % 1000000 === 0 ? 0 : 2)}M`
    : "Coming Soon";

  return {
    title: `${property.name} — ${property.bedrooms} Bed Villas ${priceStr}`,
    description: property.description.slice(0, 160),
    openGraph: {
      title: `${property.name} — Grand Polo Club & Resort`,
      description: property.description.slice(0, 160),
      images: [property.imageUrl],
      url: `${SITE_URL}/projects/${slug}`,
      type: "website",
    },
    alternates: { canonical: `/projects/${slug}` },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const property = projects.find((p) => p.slug === slug);

  if (!property) {
    return (
      <>
        <SiteHeader />
        <main className="min-h-screen flex items-center justify-center bg-[#070B14] pt-20">
          <div className="text-center px-4">
            <h1 className="font-heading text-4xl text-[#C9A84C] mb-4">Property Not Found</h1>
            <Link href="/projects" className="text-[#8B8678] hover:text-[#C9A84C] transition-colors">
              Back to Properties
            </Link>
          </div>
        </main>
        <SiteFooter />
        <WhatsAppButton />
      </>
    );
  }

  const isLaunching = property.status === "Launching Soon";
  const milestones = paymentPlans[property.slug] || [];
  const units = unitTypes[property.slug as keyof typeof unitTypes] || [];

  // JSON-LD: BreadcrumbList
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}` },
      { "@type": "ListItem", position: 2, name: "Properties", item: `${SITE_URL}/projects` },
      { "@type": "ListItem", position: 3, name: property.name, item: `${SITE_URL}/projects/${property.slug}` },
    ],
  };

  // JSON-LD: RealEstateListing
  const listingLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.name,
    description: property.description,
    url: `${SITE_URL}/projects/${property.slug}`,
    image: `${SITE_URL}${property.imageUrl}`,
    datePosted: "2025-01-01",
    offers: {
      "@type": "Offer",
      price: property.startingPrice > 0 ? property.startingPrice : undefined,
      priceCurrency: "AED",
      availability: isLaunching ? "PreOrder" : "InStock",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
  };

  const stats = [
    { icon: BedDouble, label: "Bedrooms", value: property.bedrooms },
    { icon: Maximize, label: "BUA", value: property.areaRange },
    { icon: LandPlot, label: "Plot Area", value: property.plotArea || "—" },
    { icon: Tag, label: "Starting Price", value: property.startingPrice > 0 ? formatPrice(property.startingPrice) : "TBA" },
    { icon: Users, label: "Total Units", value: property.facts.totalUnits > 0 ? `${property.facts.totalUnits}` : "TBA" },
    { icon: Calendar, label: "Handover", value: property.handover },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listingLd) }} />
      <SiteHeader />
      <main className="pt-16 lg:pt-20">
        {/* Hero */}
        <section className="relative h-[60vh] min-h-[420px]">
          <Image
            src={property.imageUrl}
            alt={property.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-[#070B14]/60 to-[#070B14]/30" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
              <Link href="/projects" className="inline-flex items-center text-[#8B8678] hover:text-[#C9A84C] text-sm mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1" /> Back to Properties
              </Link>
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-3 py-1 rounded text-xs font-bold ${isLaunching ? "bg-[#1B4D3E] text-[#FAF6F0]" : "gold-gradient text-[#070B14]"}`}>
                  {isLaunching ? "Launching Soon" : "Available"}
                </span>
                <span className="px-3 py-1 rounded text-xs font-medium border border-[#C9A84C]/30 text-[#C9A84C]">
                  {property.bedrooms} Bedroom{property.bedrooms !== "TBA" ? "s" : ""}
                </span>
                <span className="px-3 py-1 rounded text-xs font-medium border border-[#C9A84C]/30 text-[#C9A84C]">
                  {property.clusterTag}
                </span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FAF6F0] mb-2">{property.name}</h1>
              <p className="text-[#C9A84C] text-lg">{property.tagline}</p>
              {!isLaunching && property.startingPrice > 0 && (
                <p className="text-[#C9A84C] font-heading text-3xl font-bold mt-4">
                  Starting from {formatPrice(property.startingPrice)}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="bg-[#0C1220] border-y border-[#C9A84C]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="glass-card rounded-lg p-4 text-center">
                  <stat.icon className="w-5 h-5 text-[#C9A84C] mx-auto mb-2" />
                  <p className="text-[#FAF6F0] text-sm font-bold">{stat.value}</p>
                  <p className="text-[#8B8678] text-xs mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="py-16 lg:py-20 bg-[#070B14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#FAF6F0] mb-4">
                  About {property.name}
                </h2>
                <div className="gold-divider max-w-xs mb-6" />
                <p className="text-[#8B8678] leading-relaxed mb-6">{property.description}</p>

                {property.facts.goldenVisa && (
                  <div className="glass-card rounded-lg p-4 gold-border mb-8 inline-flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#C9A84C]" />
                    <div>
                      <p className="text-[#C9A84C] text-sm font-bold">Golden Visa Eligible</p>
                      <p className="text-[#8B8678] text-xs">10-year UAE residency for property owner and family</p>
                    </div>
                  </div>
                )}

                {/* Features */}
                <h3 className="font-heading text-xl font-bold text-[#FAF6F0] mb-4 mt-8">Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                  {property.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-[#FAF6F0]/80">
                      <Check className="w-4 h-4 text-[#C9A84C] shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Amenities */}
                <h3 className="font-heading text-xl font-bold text-[#FAF6F0] mb-4">Community Amenities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 text-[#FAF6F0]/80">
                      <Check className="w-4 h-4 text-[#C9A84C] shrink-0" />
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar CTA */}
              <div>
                <div className="glass-card rounded-xl p-6 sticky top-24">
                  <h3 className="font-heading text-lg font-bold text-[#FAF6F0] mb-3">
                    {isLaunching ? "Register Your Interest" : "Check Availability"}
                  </h3>
                  <p className="text-[#8B8678] text-sm mb-5">
                    {isLaunching
                      ? "Be the first to receive launch details, pricing, and priority selection when this community opens."
                      : "Schedule a private viewing with our dedicated property consultants and explore these exceptional homes."}
                  </p>
                  <div className="space-y-3">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center w-full h-11 gold-gradient text-[#070B14] font-bold text-sm rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Check Availability
                    </Link>
                    <a
                      href="tel:+97141234567"
                      className="flex items-center justify-center gap-2 w-full h-11 rounded-lg border border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C]/10 text-sm font-medium transition-colors"
                    >
                      <Phone className="w-4 h-4" /> Call Now
                    </a>
                    <a
                      href="mailto:info@thegrandpolo.com"
                      className="flex items-center justify-center gap-2 w-full h-11 rounded-lg border border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C]/10 text-sm font-medium transition-colors"
                    >
                      <Mail className="w-4 h-4" /> Email Us
                    </a>
                  </div>
                  <div className="mt-5 pt-5 border-t border-[#C9A84C]/10 text-xs text-[#8B8678] space-y-1">
                    <p>Developer: {property.facts.developer}</p>
                    <p>Location: {property.facts.location}</p>
                    <p>Payment Plan: {property.paymentPlan}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Unit Types Table */}
        {units.length > 0 && (
          <section className="py-16 lg:py-20 bg-[#0C1220] border-t border-[#C9A84C]/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#FAF6F0] mb-2">Unit Types</h2>
              <p className="text-[#8B8678] mb-8">Available configurations within {property.name}</p>
              <div className="glass-card rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#C9A84C]/10 bg-[#121A2E]/50">
                        <th className="text-left p-4 text-[#C9A84C] text-sm font-medium">Type</th>
                        <th className="text-left p-4 text-[#C9A84C] text-sm font-medium">Units</th>
                        <th className="text-left p-4 text-[#C9A84C] text-sm font-medium">Avg BUA (sqft)</th>
                        <th className="text-left p-4 text-[#C9A84C] text-sm font-medium">Avg Plot (sqft)</th>
                        <th className="text-left p-4 text-[#C9A84C] text-sm font-medium">Starting Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {units.map((unit, i) => (
                        <tr key={i} className="border-b border-[#C9A84C]/5 last:border-0">
                          <td className="p-4 text-[#FAF6F0] text-sm font-medium">{unit.type}</td>
                          <td className="p-4 text-[#FAF6F0]/80 text-sm">{unit.units}</td>
                          <td className="p-4 text-[#FAF6F0]/80 text-sm">{unit.avgBUA.toLocaleString()}</td>
                          <td className="p-4 text-[#FAF6F0]/80 text-sm">{unit.avgPlot.toLocaleString()}</td>
                          <td className="p-4 text-[#C9A84C] text-sm font-bold">{formatPrice(unit.startingPrice)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Payment Plan Milestones */}
        {milestones.length > 0 && (
          <section className="py-16 lg:py-20 bg-[#070B14] border-t border-[#C9A84C]/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#FAF6F0] mb-2">Payment Plan</h2>
              <p className="text-[#8B8678] mb-8">{property.paymentPlan} — Flexible construction-linked milestones</p>

              <div className="glass-card rounded-xl p-6 lg:p-8 max-w-3xl">
                {/* Progress bar */}
                <div className="flex h-4 rounded-full overflow-hidden mb-8 bg-[#121A2E]">
                  {milestones.map((m, i) => (
                    <div
                      key={i}
                      className={`${
                        i === 0
                          ? "bg-[#C9A84C]"
                          : i === milestones.length - 1
                          ? "bg-[#1B4D3E]"
                          : "bg-[#C9A84C]/40"
                      }`}
                      style={{ width: `${m.percentage}%` }}
                    />
                  ))}
                </div>

                {/* Milestone timeline */}
                <div className="space-y-0">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-center gap-4 py-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                            index === 0
                              ? "gold-gradient text-[#070B14]"
                              : index === milestones.length - 1
                              ? "bg-[#1B4D3E] text-[#FAF6F0]"
                              : "bg-[#121A2E] border border-[#C9A84C]/30 text-[#C9A84C]"
                          }`}
                        >
                          {milestone.percentage}%
                        </div>
                        <div className="flex-1">
                          <p className="text-[#FAF6F0] text-sm font-medium">{milestone.label}</p>
                          <p className="text-[#8B8678] text-xs">{milestone.date}</p>
                        </div>
                      </div>
                      {index < milestones.length - 1 && (
                        <div className="absolute left-[19px] top-[52px] bottom-0 w-px bg-[#C9A84C]/10" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="mt-8 pt-6 border-t border-[#C9A84C]/10">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-[#C9A84C] font-heading text-lg font-bold">10%</p>
                      <p className="text-[#8B8678] text-xs">Down Payment</p>
                    </div>
                    <div>
                      <p className="text-[#C9A84C] font-heading text-lg font-bold">10%</p>
                      <p className="text-[#8B8678] text-xs">Per Milestone</p>
                    </div>
                    <div>
                      <p className="text-[#1B4D3E] font-heading text-lg font-bold">20%</p>
                      <p className="text-[#8B8678] text-xs">On Completion</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Features & Amenities Grid */}
        <section className="py-16 lg:py-20 bg-[#0C1220] border-t border-[#C9A84C]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#FAF6F0] mb-2">Features</h2>
                <p className="text-[#8B8678] mb-6">What makes {property.name} exceptional</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.features.map((feature) => (
                    <div key={feature} className="glass-card rounded-lg p-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#C9A84C]/10 flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 text-[#C9A84C]" />
                      </div>
                      <span className="text-[#FAF6F0] text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#FAF6F0] mb-2">Amenities</h2>
                <p className="text-[#8B8678] mb-6">World-class facilities at your doorstep</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.amenities.map((amenity) => (
                    <div key={amenity} className="glass-card rounded-lg p-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#C9A84C]/10 flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 text-[#C9A84C]" />
                      </div>
                      <span className="text-[#FAF6F0] text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-20 bg-[#070B14] border-t border-[#C9A84C]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#FAF6F0] mb-4">
              {isLaunching ? "Register for Priority Access" : "Check Availability at " + property.name}
            </h2>
            <p className="text-[#8B8678] max-w-xl mx-auto mb-8">
              {isLaunching
                ? "Be among the first to receive launch details and priority selection for this exclusive community."
                : "Schedule a private viewing and discover the equestrian luxury lifestyle at Grand Polo Club & Resort."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center h-12 px-8 gold-gradient text-[#070B14] font-bold text-sm rounded-lg hover:opacity-90 transition-opacity"
              >
                Check Availability
              </Link>
              <Link
                href="/payment-plan"
                className="inline-flex items-center justify-center h-12 px-8 rounded-lg border border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C]/10 text-sm font-medium transition-colors"
              >
                View Payment Plans
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
