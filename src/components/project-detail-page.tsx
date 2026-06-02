"use client";

import { getProject, formatPrice, paymentPlans, unitTypes, getProjectGallery } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { BedDouble, Home, Maximize, Calendar, ArrowLeft, Check, Phone, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PHONE_NUMBER, EMAIL } from "@/lib/data";
import { trackViewContent, getFbp, getFbc } from "@/lib/meta-pixel";

interface ProjectDetailPageProps {
  slug: string;
}

export default function ProjectDetailPage({ slug }: ProjectDetailPageProps) {
  const property = getProject(slug);
  if (!property) notFound();

  const isLaunching = property.status === "Launching Soon";
  const milestones = paymentPlans[property.slug] || [];
  const units = unitTypes[property.slug as keyof typeof unitTypes] || [];
  const gallery = getProjectGallery(property.slug);

  // Track ViewContent on mount (critical for real estate — high intent signal)
  useEffect(() => {
    const eventId = `vc-${property.slug}-${Date.now()}`;
    // Client-side pixel with same eventId for deduplication
    trackViewContent({
      content_name: property.name,
      content_category: "property",
      content_ids: [property.slug],
      content_type: "product",
      value: property.startingPrice,
      currency: "AED",
    }, eventId);
    // Server-side CAPI (fire-and-forget)
    fetch("/api/meta-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName: "ViewContent",
        eventId,
        eventSourceUrl: window.location.href,
        fbp: getFbp(),
        fbc: getFbc(),
        contentName: property.name,
        contentCategory: "property",
        currency: "AED",
        value: property.startingPrice,
      }),
    }).catch(() => {}); // Non-blocking
  }, [property.slug, property.name, property.startingPrice]);

  return (
    <div className="pt-16 lg:pt-20">
      <section className="relative h-[60vh] min-h-[400px]">
        <Image src={property.imageUrl} alt={`${property.name} — ${property.bedrooms}-bedroom luxury villas at Grand Polo Club & Resort`} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A1506] via-[#2A1506]/50 to-[#2A1506]/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 lg:px-8 pb-8">
            <Link href="/projects" className="inline-flex items-center text-[#B89B6E] hover:text-[#D4AF37] text-sm mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Projects
            </Link>
            <div className="flex items-center gap-3 mb-3">
              {isLaunching ? (
                <Badge className="bg-[#B89B6E] text-[#FFFAF3] border-0">Launching Soon</Badge>
              ) : (
                <Badge className="gold-gradient text-[#2A1506] border-0 font-bold">Available</Badge>
              )}
              <Badge variant="outline" className="border-[#D4AF37]/20 text-[#D4AF37]">{property.bedrooms} Bed</Badge>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FFFAF3] mb-2">{property.name}</h1>
            <p className="text-[#D4AF37] text-lg">{property.tagline}</p>
            {!isLaunching && (
              <p className="text-[#D4AF37] font-heading text-3xl font-bold mt-4">{formatPrice(property.startingPrice)}</p>
            )}
          </div>
        </div>
      </section>

      {!isLaunching && (
        <section className="bg-[#3D2510] border-y border-[#D4AF37]/10">
          <div className="container mx-auto px-4 lg:px-8 py-6">
            <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-12">
              {[
                { icon: BedDouble, label: "Bedrooms", value: property.bedrooms },
                { icon: Home, label: "Total Units", value: `${property.facts.totalUnits}` },
                { icon: Maximize, label: "Area Range", value: property.areaRange },
                { icon: Calendar, label: "Handover", value: property.handover },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="text-[#FFFAF3] text-sm font-bold">{stat.value}</p>
                    <p className="text-[#B89B6E] text-xs">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-12 lg:py-16 bg-[#5D3A1A]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#FFFAF3] mb-4">About {property.name}</h2>
              <p className="text-[#B89B6E] leading-relaxed mb-8">{property.description}</p>

              <h3 className="font-heading text-xl font-bold text-[#FFFAF3] mb-4">Key Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {property.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-[#FFFAF3]/80">
                    <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <h3 className="font-heading text-xl font-bold text-[#FFFAF3] mb-4">Amenities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2 text-[#FFFAF3]/80">
                    <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span className="text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl p-6 border border-[#D4AF37]/15 bg-[#3D2510]/50 sticky top-24">
                <h3 className="font-heading text-lg font-bold text-[#FFFAF3] mb-4">
                  {isLaunching ? "Register Interest" : "Check Availability"}
                </h3>
                <p className="text-[#B89B6E] text-sm mb-4">
                  {isLaunching ? "Be the first to know about launch dates, pricing, and priority access." : "Schedule a private viewing with our property consultants."}
                </p>
                <div className="space-y-3">
                  <Link href="/contact" className="inline-flex items-center justify-center w-full h-10 gold-gradient text-[#2A1506] font-bold text-sm rounded-lg hover:opacity-90 transition-opacity">Check Availability</Link>
                  <a href={`tel:${PHONE_NUMBER}`} className="flex items-center justify-center gap-2 w-full h-10 rounded-lg border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 text-sm font-medium transition-colors"><Phone className="w-4 h-4" /> Call Now</a>
                  <a href={`mailto:${EMAIL}`} className="flex items-center justify-center gap-2 w-full h-10 rounded-lg border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 text-sm font-medium transition-colors"><Mail className="w-4 h-4" /> Email Us</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {units.length > 0 && (
        <section className="py-12 lg:py-16 bg-[#3D2510] border-t border-[#D4AF37]/10">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#FFFAF3] mb-8">Unit Types</h2>
            <div className="rounded-xl overflow-hidden border border-[#D4AF37]/15 bg-[#2A1506]/50">
              <div className="overflow-x-auto">
                <table className="w-full">
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
                        <td className="p-4 text-[#D4AF37] text-sm font-medium">{formatPrice(unit.startingPrice)}</td>
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
        <section className="py-12 lg:py-16 bg-[#5D3A1A] border-t border-[#D4AF37]/10">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#FFFAF3] mb-2">Payment Plan</h2>
            <p className="text-[#B89B6E] mb-8">{property.paymentPlan}</p>
            <div className="rounded-xl p-6 max-w-2xl border border-[#D4AF37]/15 bg-[#3D2510]/50">
              <div className="flex h-4 rounded-full overflow-hidden mb-6 bg-[#2A1506]">
                {milestones.map((m, i) => (
                  <div key={i} className={`${i === 0 ? "bg-[#D4AF37]" : i === milestones.length - 1 ? "bg-[#B89B6E]" : "bg-[#D4AF37]/40"} transition-all`} style={{ width: `${m.percentage}%` }} />
                ))}
              </div>
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
          </div>
        </section>
      )}

      {gallery.length > 0 && (
        <section className="py-12 lg:py-16 bg-[#3D2510] border-t border-[#D4AF37]/10">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#FFFAF3] mb-8">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {gallery.map((img, index) => (
                <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden group border border-[#D4AF37]/10 hover:border-[#D4AF37]/40 transition-all duration-300">
                  <Image
                    src={img.imageUrl}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-[#2A1506]/0 group-hover:bg-[#2A1506]/30 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
