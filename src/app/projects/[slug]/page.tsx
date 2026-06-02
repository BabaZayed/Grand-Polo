import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects, paymentPlans, unitTypes, formatPrice, SITE_URL } from "@/lib/data";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import WhatsAppButton from "@/components/whatsapp-button";
import { BedDouble, Maximize, LandPlot, Users, Calendar, Tag, Check, ArrowLeft, Phone, Mail, ShieldCheck, Download, FileText, LayoutGrid } from "lucide-react";

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

  const isLaunching = property.status === "Launching Soon";

  return {
    title: `${property.name} — ${property.bedrooms} Bed Villas ${priceStr}`,
    description: property.description.slice(0, 155).replace(/\s+\S*$/, "") + (property.description.length > 155 ? "..." : ""),
    openGraph: {
      title: `${property.name} — Grand Polo Club & Resort`,
      description: property.description.slice(0, 155).replace(/\s+\S*$/, "") + (property.description.length > 155 ? "..." : ""),
      images: [property.imageUrl],
      url: `${SITE_URL}/projects/${slug}`,
      type: "website",
    },
    alternates: { canonical: `${SITE_URL}/projects/${slug}` },

  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const property = projects.find((p) => p.slug === slug);

  if (!property) {
    return (
      <>
        <SiteHeader />
        <main id="main-content" className="min-h-screen flex items-center justify-center bg-[#5D3A1A] pt-20">
          <div className="text-center px-4">
            <h1 className="font-heading text-4xl text-[#D4AF37] mb-4">Property Not Found</h1>
            <Link href="/projects" className="text-[#B89B6E] hover:text-[#D4AF37] transition-colors">Back to Properties</Link>
          </div>
        </main>
        <SiteFooter />
        <WhatsAppButton />
      </>
    );
  }

  const milestones = paymentPlans[property.slug] || [];
  const units = unitTypes[property.slug as keyof typeof unitTypes] || [];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}` },
      { "@type": "ListItem", position: 2, name: "Properties", item: `${SITE_URL}/projects` },
      { "@type": "ListItem", position: 3, name: property.name, item: `${SITE_URL}/projects/${property.slug}` },
    ],
  };

  const listingLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.name,
    description: property.description,
    url: `${SITE_URL}/projects/${property.slug}`,
    image: `${SITE_URL}${property.imageUrl}`,
    datePosted: "2025-01-15",
    offers: { "@type": "Offer", price: property.startingPrice > 0 ? property.startingPrice : undefined, priceCurrency: "AED", availability: "InStock" },
    address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
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
      <main id="main-content" className="pt-16 lg:pt-20">
        <section className="relative h-[60vh] min-h-[420px]">
          <Image src={property.imageUrl} alt={`${property.name} — ${property.bedrooms}-bedroom luxury villas at Grand Polo Club & Resort`} fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A1506] via-[#2A1506]/60 to-[#2A1506]/30" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
              <Link href="/projects" className="inline-flex items-center text-[#B89B6E] hover:text-[#D4AF37] text-sm mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1" /> Back to Properties
              </Link>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded text-xs font-bold gold-gradient text-[#2A1506]">
                  Off-Plan
                </span>
                <span className="px-3 py-1 rounded text-xs font-medium border border-[#D4AF37]/30 text-[#D4AF37]">
                  {property.bedrooms} Bedroom{property.bedrooms !== "TBA" ? "s" : ""}
                </span>
                <span className="px-3 py-1 rounded text-xs font-medium border border-[#D4AF37]/30 text-[#D4AF37]">
                  {property.clusterTag}
                </span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FFFAF3] mb-2">{property.name}</h1>
              <p className="text-[#D4AF37] text-lg">{property.tagline}</p>
              {property.startingPrice > 0 && (
                <p className="text-[#D4AF37] font-heading text-3xl font-bold mt-4">Starting from {formatPrice(property.startingPrice)}</p>
              )}
            </div>
          </div>
        </section>

        <section className="bg-[#3D2510] border-y border-[#D4AF37]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-lg p-4 text-center border border-[#D4AF37]/15 bg-[#2A1506]/50">
                  <stat.icon className="w-5 h-5 text-[#D4AF37] mx-auto mb-2" />
                  <p className="text-[#FFFAF3] text-sm font-bold">{stat.value}</p>
                  <p className="text-[#B89B6E] text-xs mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20 bg-[#5D3A1A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#FFFAF3] mb-4">About {property.name}</h2>
                <div className="gold-divider max-w-xs mb-6" />
                <p className="text-[#B89B6E] leading-relaxed mb-6">{property.description}</p>

                {property.facts.goldenVisa && (
                  <div className="rounded-lg p-4 border border-[#D4AF37]/30 bg-[#3D2510]/50 mb-8 inline-flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                    <div>
                      <p className="text-[#D4AF37] text-sm font-bold">Golden Visa Eligible</p>
                      <p className="text-[#B89B6E] text-xs">10-year UAE residency for property owner and family</p>
                    </div>
                  </div>
                )}

                <h3 className="font-heading text-xl font-bold text-[#FFFAF3] mb-4 mt-8">Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                  {property.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-[#FFFAF3]/80">
                      <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <h3 className="font-heading text-xl font-bold text-[#FFFAF3] mb-4">Community Amenities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 text-[#FFFAF3]/80">
                      <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="rounded-xl p-6 border border-[#D4AF37]/15 bg-[#3D2510]/50 sticky top-24">
                  <h3 className="font-heading text-lg font-bold text-[#FFFAF3] mb-3">
                    Check Availability
                  </h3>
                  <p className="text-[#B89B6E] text-sm mb-5">
                    Schedule a private viewing with our dedicated property consultants.
                  </p>
                  <div className="space-y-3">
                    <Link href="/contact" className="inline-flex items-center justify-center w-full h-11 gold-gradient text-[#2A1506] font-bold text-sm rounded-lg hover:opacity-90 transition-opacity">Check Availability</Link>
                    <a href={`/api/download?type=brochure&file=${property.slug}-brochure.pdf`} className="flex items-center justify-center gap-2 w-full h-11 rounded-lg border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 text-sm font-medium transition-colors"><FileText className="w-4 h-4" /> Download Brochure</a>
                    <a href={`/api/download?type=floorplan&file=${property.slug}-floorplan.pdf`} className="flex items-center justify-center gap-2 w-full h-11 rounded-lg border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 text-sm font-medium transition-colors"><LayoutGrid className="w-4 h-4" /> Download Floor Plan</a>
                    <a href="tel:+971526919169" className="flex items-center justify-center gap-2 w-full h-11 rounded-lg border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 text-sm font-medium transition-colors"><Phone className="w-4 h-4" /> Call Now</a>
                    <a href="mailto:info@thegrandpolo.com" className="flex items-center justify-center gap-2 w-full h-11 rounded-lg border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 text-sm font-medium transition-colors"><Mail className="w-4 h-4" /> Email Us</a>
                  </div>
                  <div className="mt-5 pt-5 border-t border-[#D4AF37]/10 text-xs text-[#B89B6E] space-y-1">
                    <p>Developer: {property.facts.developer}</p>
                    <p>Location: {property.facts.location}</p>
                    <p>Payment Plan: {property.paymentPlan}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {units.length > 0 && (
          <section className="py-16 lg:py-20 bg-[#3D2510] border-t border-[#D4AF37]/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#FFFAF3] mb-2">Unit Types</h2>
              <p className="text-[#B89B6E] mb-8">Available configurations within {property.name}</p>
              <div className="rounded-xl overflow-hidden border border-[#D4AF37]/15 bg-[#2A1506]/50">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <caption className="sr-only">Unit types available at {property.name}</caption>
                    <thead>
                      <tr className="border-b border-[#D4AF37]/10 bg-[#2A1506]">
                        <th className="text-left p-4 text-[#D4AF37] text-sm font-medium">Type</th>
                        <th className="text-left p-4 text-[#D4AF37] text-sm font-medium">Units</th>
                        <th className="text-left p-4 text-[#D4AF37] text-sm font-medium">Avg BUA (sqft)</th>
                        <th className="text-left p-4 text-[#D4AF37] text-sm font-medium">Avg Plot (sqft)</th>
                        <th className="text-left p-4 text-[#D4AF37] text-sm font-medium">Starting Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {units.map((unit, i) => (
                        <tr key={i} className="border-b border-[#D4AF37]/5 last:border-0">
                          <td className="p-4 text-[#FFFAF3] text-sm font-medium">{unit.type}</td>
                          <td className="p-4 text-[#FFFAF3]/80 text-sm">{unit.units}</td>
                          <td className="p-4 text-[#FFFAF3]/80 text-sm">{unit.avgBUA.toLocaleString()}</td>
                          <td className="p-4 text-[#FFFAF3]/80 text-sm">{unit.avgPlot.toLocaleString()}</td>
                          <td className="p-4 text-[#D4AF37] text-sm font-bold">{formatPrice(unit.startingPrice)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}

        {milestones.length > 0 && (
          <section className="py-16 lg:py-20 bg-[#5D3A1A] border-t border-[#D4AF37]/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#FFFAF3] mb-2">Payment Plan</h2>
              <p className="text-[#B89B6E] mb-8">{property.paymentPlan} — Flexible construction-linked milestones</p>
              <div className="rounded-xl p-6 lg:p-8 max-w-3xl border border-[#D4AF37]/15 bg-[#3D2510]/50">
                <div className="flex h-4 rounded-full overflow-hidden mb-8 bg-[#2A1506]">
                  {milestones.map((m, i) => (
                    <div key={i} className={`${i === 0 ? "bg-[#D4AF37]" : i === milestones.length - 1 ? "bg-[#B89B6E]" : "bg-[#D4AF37]/40"}`} style={{ width: `${m.percentage}%` }} />
                  ))}
                </div>
                <div className="space-y-0">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-center gap-4 py-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${index === 0 ? "gold-gradient text-[#2A1506]" : index === milestones.length - 1 ? "bg-[#B89B6E] text-[#FFFAF3]" : "bg-[#2A1506] border border-[#D4AF37]/30 text-[#D4AF37]"}`}>
                          {milestone.percentage}%
                        </div>
                        <div className="flex-1">
                          <p className="text-[#FFFAF3] text-sm font-medium">{milestone.label}</p>
                          <p className="text-[#B89B6E] text-xs">{milestone.date}</p>
                        </div>
                      </div>
                      {index < milestones.length - 1 && <div className="absolute left-[19px] top-[52px] bottom-0 w-px bg-[#D4AF37]/10" />}
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-[#D4AF37]/10">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div><p className="text-[#D4AF37] font-heading text-lg font-bold">10%</p><p className="text-[#B89B6E] text-xs">Down Payment</p></div>
                    <div><p className="text-[#D4AF37] font-heading text-lg font-bold">10%</p><p className="text-[#B89B6E] text-xs">Per Milestone</p></div>
                    <div><p className="text-[#B89B6E] font-heading text-lg font-bold">20%</p><p className="text-[#B89B6E] text-xs">On Completion</p></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Related Properties — Internal linking for SEO */}
        <section className="py-16 lg:py-20 bg-[#3D2510] border-t border-[#D4AF37]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#FFFAF3] mb-2">Explore Other Clusters</h2>
            <p className="text-[#B89B6E] mb-8">Discover more luxury villa communities at Grand Polo Club & Resort</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.filter((p) => p.slug !== property.slug).slice(0, 3).map((p) => (
                <Link key={p.id} href={`/projects/${p.slug}`} className="group rounded-xl overflow-hidden border border-[#D4AF37]/15 bg-[#2A1506]/50 hover:border-[#D4AF37]/40 transition-all duration-400 hover:-translate-y-1">
                  <div className="relative h-48 overflow-hidden">
                    <Image src={p.imageUrl} alt={`${p.name} — luxury villas at Grand Polo Dubai`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2A1506] via-transparent to-transparent" />

                  </div>
                  <div className="p-4">
                    <h3 className="font-heading text-lg text-[#FFFAF3] group-hover:text-[#D4AF37] transition-colors">{p.name}</h3>
                    <p className="text-[#D4AF37] text-sm font-semibold">{p.startingPrice > 0 ? `From ${formatPrice(p.startingPrice)}` : "Contact for Price"}</p>
                    <p className="text-[#B89B6E] text-xs mt-1">{p.bedrooms} Beds • {p.facts.totalUnits > 0 ? `${p.facts.totalUnits} Units` : "TBA"}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20 bg-[#2A1506] border-t border-[#D4AF37]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#FFFAF3] mb-4">Check Availability at {property.name}</h2>
            <p className="text-[#B89B6E] max-w-xl mx-auto mb-8">Schedule a private viewing and discover the equestrian luxury lifestyle.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="inline-flex items-center justify-center h-12 px-8 gold-gradient text-[#2A1506] font-bold text-sm rounded-lg hover:opacity-90 transition-opacity">Check Availability</Link>
              <a href={`/api/download?type=brochure&file=${property.slug}-brochure.pdf`} className="inline-flex items-center justify-center h-12 px-8 rounded-lg border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 text-sm font-medium transition-colors gap-2"><Download className="w-4 h-4" /> Download Brochure</a>
              <Link href="/brochures" className="inline-flex items-center justify-center h-12 px-8 rounded-lg border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 text-sm font-medium transition-colors">All Brochures & Floor Plans</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
}
