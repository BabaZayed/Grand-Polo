"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import WhatsAppButton from "@/components/whatsapp-button";
import { projects, formatPrice, SITE_URL, PHONE_NUMBER, masterPlanFacts } from "@/lib/data";
import type { PropertyType } from "@/lib/data";
import { Download, FileText, LayoutGrid, Phone, ChevronRight, MapPin, Map } from "lucide-react";
import { Button } from "@/components/ui/button";

type TabType = "brochures" | "floorplans" | "masterplan";

interface DownloadItem {
  slug: string;
  name: string;
  tagline: string;
  type: PropertyType;
  bedrooms: string;
  startingPrice: number;
  imageUrl: string;
  clusterTag: string;
  status: string;
  downloadType: "brochure" | "floorplan";
  fileName: string;
}

const brochureItems: DownloadItem[] = projects.map((p) => ({
  slug: p.slug,
  name: p.name,
  tagline: p.tagline,
  type: p.type,
  bedrooms: p.bedrooms,
  startingPrice: p.startingPrice,
  imageUrl: p.imageUrl,
  clusterTag: p.clusterTag,
  status: p.status,
  downloadType: "brochure" as const,
  fileName: `${p.slug}-brochure.pdf`,
}));

const floorplanItems: DownloadItem[] = projects.map((p) => ({
  slug: p.slug,
  name: p.name,
  tagline: p.tagline,
  type: p.type,
  bedrooms: p.bedrooms,
  startingPrice: p.startingPrice,
  imageUrl: p.imageUrl,
  clusterTag: p.clusterTag,
  status: p.status,
  downloadType: "floorplan" as const,
  fileName: `${p.slug}-floorplan.pdf`,
}));

function getDownloadUrl(item: DownloadItem): string {
  return `/api/download?type=${item.downloadType}&file=${item.fileName}`;
}

export default function BrochuresPage() {
  const [activeTab, setActiveTab] = useState<TabType>("brochures");

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="pt-16 lg:pt-20 min-h-screen bg-[#5D3A1A]">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 bg-[#2A1506] overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-[#D4AF37]/20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#D4AF37]/15" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#D4AF37]/10" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FFFAF3] mb-4">
              Brochures & Floor Plans
            </h1>
            <p className="text-[#B89B6E] text-lg max-w-2xl mx-auto mb-2">
              Download official brochures and floor plans for all Grand Polo Club & Resort properties.
              All documents are watermarked with our contact details for your convenience.
            </p>
            <p className="text-[#D4AF37] text-sm">
              For the most up-to-date information, please contact us at{" "}
              <a href={`tel:${PHONE_NUMBER}`} className="underline hover:text-[#FFFAF3] transition-colors">
                {PHONE_NUMBER}
              </a>
            </p>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="bg-[#3D2510] border-y border-[#D4AF37]/10 sticky top-16 lg:top-20 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-0 overflow-x-auto" role="tablist" aria-label="Document type">
              <button
                onClick={() => setActiveTab("brochures")}
                role="tab"
                aria-selected={activeTab === "brochures"}
                className={`flex items-center gap-2 px-6 sm:px-10 py-4 text-sm sm:text-base font-medium transition-all duration-300 border-b-2 whitespace-nowrap ${
                  activeTab === "brochures"
                    ? "text-[#D4AF37] border-[#D4AF37] bg-[#D4AF37]/5"
                    : "text-[#B89B6E] border-transparent hover:text-[#D4AF37] hover:bg-[#D4AF37]/5"
                }`}
              >
                <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Brochures</span>
                <span className="hidden sm:inline text-xs bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded-full">
                  {brochureItems.length + 1}
                </span>
              </button>
              <button
                onClick={() => setActiveTab("floorplans")}
                role="tab"
                aria-selected={activeTab === "floorplans"}
                className={`flex items-center gap-2 px-6 sm:px-10 py-4 text-sm sm:text-base font-medium transition-all duration-300 border-b-2 whitespace-nowrap ${
                  activeTab === "floorplans"
                    ? "text-[#D4AF37] border-[#D4AF37] bg-[#D4AF37]/5"
                    : "text-[#B89B6E] border-transparent hover:text-[#D4AF37] hover:bg-[#D4AF37]/5"
                }`}
              >
                <LayoutGrid className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Floor Plans</span>
                <span className="hidden sm:inline text-xs bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded-full">
                  {floorplanItems.length + 1}
                </span>
              </button>
              <button
                onClick={() => setActiveTab("masterplan")}
                role="tab"
                aria-selected={activeTab === "masterplan"}
                className={`flex items-center gap-2 px-6 sm:px-10 py-4 text-sm sm:text-base font-medium transition-all duration-300 border-b-2 whitespace-nowrap ${
                  activeTab === "masterplan"
                    ? "text-[#D4AF37] border-[#D4AF37] bg-[#D4AF37]/5"
                    : "text-[#B89B6E] border-transparent hover:text-[#D4AF37] hover:bg-[#D4AF37]/5"
                }`}
              >
                <Map className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Masterplan</span>
              </button>
            </div>
          </div>
        </section>

        {/* Masterplan Tab Content */}
        {activeTab === "masterplan" && (
          <section className="py-12 lg:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Masterplan Hero Card */}
              <div className="rounded-xl overflow-hidden border border-[#D4AF37]/30 bg-[#2A1506]/80 mb-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Left - Info */}
                  <div className="p-8 lg:p-10 flex flex-col justify-center">
                    <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium mb-3">Community Overview</span>
                    <h2 className="font-heading text-3xl lg:text-4xl font-bold text-[#FFFAF3] mb-4">
                      Grand Polo Club & Resort Masterplan
                    </h2>
                    <div className="gold-divider max-w-xs mb-6" />
                    <p className="text-[#B89B6E] leading-relaxed mb-6">
                      A visionary 5.54 million square metre community designed around the equestrian lifestyle — where polo fields, private stables, and a luxury clubhouse form the beating heart of 22 residential clusters and 6,661 homes.
                    </p>

                    {/* Key Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                      {[
                        { label: "Total Area", value: "5.54M SqM" },
                        { label: "Residences", value: "6,661" },
                        { label: "Clusters", value: "22" },
                        { label: "Polo Fields", value: "3" },
                        { label: "Amenities", value: "23" },
                        { label: "Airport", value: "5 Min" },
                      ].map((stat) => (
                        <div key={stat.label} className="rounded-lg p-3 text-center border border-[#D4AF37]/15 bg-[#3D2510]/50">
                          <p className="text-[#D4AF37] text-sm font-bold">{stat.value}</p>
                          <p className="text-[#B89B6E] text-[10px]">{stat.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Download buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href="/api/download?type=brochure&file=grand-polo-masterplan-brochure.pdf"
                        className="flex items-center justify-center gap-2 h-12 px-6 gold-gradient text-[#2A1506] font-bold text-sm rounded-lg hover:opacity-90 transition-opacity"
                      >
                        <FileText className="w-4 h-4" />
                        Download Brochure
                      </a>
                      <a
                        href="/api/download?type=floorplan&file=grand-polo-masterplan-floorplan.pdf"
                        className="flex items-center justify-center gap-2 h-12 px-6 rounded-lg border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 text-sm font-medium transition-colors"
                      >
                        <LayoutGrid className="w-4 h-4" />
                        Download Community Layout
                      </a>
                    </div>
                  </div>

                  {/* Right - Visual / Quick links */}
                  <div className="relative min-h-[350px] bg-gradient-to-br from-[#3D2510] to-[#2A1506]">
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <div className="text-center">
                        <div className="w-24 h-24 rounded-full gold-gradient flex items-center justify-center mx-auto mb-6">
                          <Map className="w-10 h-10 text-[#2A1506]" />
                        </div>
                        <h3 className="font-heading text-2xl font-bold text-[#FFFAF3] mb-3">22 Residential Clusters</h3>
                        <p className="text-[#B89B6E] text-sm mb-6">All clusters now available — Brochures & Floor Plans ready for download</p>
                        <div className="space-y-2">
                          <Link
                            href="/masterplan"
                            className="flex items-center justify-center gap-2 h-11 px-6 rounded-lg border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 text-sm font-medium transition-colors"
                          >
                            View Full Masterplan <ChevronRight className="w-4 h-4" />
                          </Link>
                          <Link
                            href="/projects"
                            className="flex items-center justify-center gap-2 h-11 px-6 rounded-lg border border-[#D4AF37]/15 text-[#B89B6E] hover:text-[#D4AF37] hover:border-[#D4AF37]/30 text-sm transition-colors"
                          >
                            View All Properties <ChevronRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* All Clusters Grid */}
              <h3 className="font-heading text-xl font-bold text-[#FFFAF3] mb-6">All Clusters</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {projects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.slug}`}
                    className="group rounded-xl overflow-hidden border border-[#D4AF37]/10 bg-[#2A1506]/60 hover:border-[#D4AF37]/30 text-center transition-all"
                  >
                    <div className="relative h-28 overflow-hidden">
                      <Image
                        src={project.imageUrl}
                        alt={`${project.name} at Grand Polo Club & Resort`}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2A1506] via-[#2A1506]/40 to-transparent" />
                    </div>
                    <div className="p-3">
                      <h4 className="font-heading text-sm font-bold text-[#FFFAF3] group-hover:text-[#D4AF37] transition-colors">
                        {project.name}
                      </h4>
                      <p className="text-[#D4AF37] text-[10px] mt-1">{project.clusterTag}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Brochures / Floor Plans Tab Content */}
        {activeTab !== "masterplan" && (
          <section className="py-12 lg:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {(() => {
                const items = activeTab === "brochures" ? brochureItems : floorplanItems;

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Masterplan card always first */}
                    <div className="group rounded-xl overflow-hidden border border-[#D4AF37]/30 bg-[#2A1506]/80 hover:border-[#D4AF37]/50 transition-all duration-400 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#D4AF37]/5">
                      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-[#3D2510] to-[#2A1506]">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <Map className="w-12 h-12 text-[#D4AF37] mx-auto mb-2" />
                            <p className="text-[#D4AF37] text-xs tracking-[0.2em] uppercase font-medium">Community Overview</p>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2A1506] via-[#2A1506]/40 to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 rounded text-xs font-bold gold-gradient text-[#2A1506]">
                            Masterplan
                          </span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <span className="px-3 py-1 rounded text-xs font-bold bg-[#2A1506]/80 text-[#D4AF37] border border-[#D4AF37]/30 flex items-center gap-1">
                            {activeTab === "brochures" ? (
                              <><FileText className="w-3 h-3" /> Brochure</>
                            ) : (
                              <><LayoutGrid className="w-3 h-3" /> Layout</>
                            )}
                          </span>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3">
                          <h2 className="font-heading text-xl font-bold text-[#FFFAF3]">Grand Polo Masterplan</h2>
                          <p className="text-[#D4AF37] text-sm">Complete Community Overview</p>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="grid grid-cols-3 gap-3 mb-5">
                          <div className="rounded-lg p-2 text-center border border-[#D4AF37]/10 bg-[#3D2510]/50">
                            <p className="text-[#D4AF37] text-xs font-bold">5.54M</p>
                            <p className="text-[#B89B6E] text-[10px]">SqM Area</p>
                          </div>
                          <div className="rounded-lg p-2 text-center border border-[#D4AF37]/10 bg-[#3D2510]/50">
                            <p className="text-[#D4AF37] text-xs font-bold">6,661</p>
                            <p className="text-[#B89B6E] text-[10px]">Residences</p>
                          </div>
                          <div className="rounded-lg p-2 text-center border border-[#D4AF37]/10 bg-[#3D2510]/50">
                            <p className="text-[#D4AF37] text-xs font-bold">22</p>
                            <p className="text-[#B89B6E] text-[10px]">Clusters</p>
                          </div>
                        </div>
                        <a
                          href={`/api/download?type=${activeTab === "brochures" ? "brochure" : "floorplan"}&file=grand-polo-masterplan-${activeTab === "brochures" ? "brochure" : "floorplan"}.pdf`}
                          className="flex items-center justify-center gap-2 w-full h-11 gold-gradient text-[#2A1506] font-bold text-sm rounded-lg hover:opacity-90 transition-opacity"
                        >
                          <Download className="w-4 h-4" />
                          Download {activeTab === "brochures" ? "Brochure" : "Community Layout"}
                        </a>
                        <Link
                          href="/masterplan"
                          className="flex items-center justify-center gap-1 w-full h-10 mt-2 rounded-lg border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 text-sm font-medium transition-colors"
                        >
                          View Masterplan <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>

                    {/* All project download cards */}
                    {items.map((item) => (
                      <div
                        key={`${item.slug}-${item.downloadType}`}
                        className="group rounded-xl overflow-hidden border border-[#D4AF37]/15 bg-[#2A1506]/80 hover:border-[#D4AF37]/40 transition-all duration-400 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#D4AF37]/5"
                      >
                        <div className="relative h-52 overflow-hidden">
                          <Image
                            src={item.imageUrl}
                            alt={`${item.name} — ${item.bedrooms !== "TBA" ? item.bedrooms + "-bedroom" : ""} luxury villas at Grand Polo Club & Resort`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#2A1506] via-[#2A1506]/40 to-transparent" />
                          <div className="absolute top-3 left-3">
                            <span className="px-3 py-1 rounded text-xs font-bold gold-gradient text-[#2A1506]">
                              {item.clusterTag}
                            </span>
                          </div>
                          <div className="absolute top-3 right-3">
                            <span className="px-3 py-1 rounded text-xs font-bold bg-[#2A1506]/80 text-[#D4AF37] border border-[#D4AF37]/30 flex items-center gap-1">
                              {item.downloadType === "brochure" ? (
                                <><FileText className="w-3 h-3" /> Brochure</>
                              ) : (
                                <><LayoutGrid className="w-3 h-3" /> Floor Plan</>
                              )}
                            </span>
                          </div>
                          <div className="absolute bottom-3 left-3 right-3">
                            <h2 className="font-heading text-xl font-bold text-[#FFFAF3]">{item.name}</h2>
                            <p className="text-[#D4AF37] text-sm">{item.tagline}</p>
                          </div>
                        </div>
                        <div className="p-5">
                          <div className="grid grid-cols-3 gap-3 mb-5">
                            <div className="rounded-lg p-2 text-center border border-[#D4AF37]/10 bg-[#3D2510]/50">
                              <p className="text-[#FFFAF3] text-xs font-bold">{item.bedrooms !== "TBA" ? `${item.bedrooms} Bed` : "Villas"}</p>
                              <p className="text-[#B89B6E] text-[10px]">Type</p>
                            </div>
                            <div className="rounded-lg p-2 text-center border border-[#D4AF37]/10 bg-[#3D2510]/50">
                              <p className="text-[#D4AF37] text-xs font-bold">{item.startingPrice > 0 ? formatPrice(item.startingPrice) : "TBA"}</p>
                              <p className="text-[#B89B6E] text-[10px]">Starting</p>
                            </div>
                            <div className="rounded-lg p-2 text-center border border-[#D4AF37]/10 bg-[#3D2510]/50">
                              <p className="text-[#FFFAF3] text-xs font-bold">{item.clusterTag}</p>
                              <p className="text-[#B89B6E] text-[10px]">Cluster</p>
                            </div>
                          </div>
                          <a
                            href={getDownloadUrl(item)}
                            className="flex items-center justify-center gap-2 w-full h-11 gold-gradient text-[#2A1506] font-bold text-sm rounded-lg hover:opacity-90 transition-opacity"
                          >
                            <Download className="w-4 h-4" />
                            Download {item.downloadType === "brochure" ? "Brochure" : "Floor Plan"}
                          </a>
                          <Link
                            href={`/projects/${item.slug}`}
                            className="flex items-center justify-center gap-1 w-full h-10 mt-2 rounded-lg border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 text-sm font-medium transition-colors"
                          >
                            View Property <ChevronRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </section>
        )}

        {/* Info Banner */}
        <section className="py-12 bg-[#3D2510] border-t border-[#D4AF37]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-xl p-8 border border-[#D4AF37]/15 bg-[#2A1506]/80">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-5 h-5 text-[#2A1506]" />
                  </div>
                  <h3 className="font-heading text-[#FFFAF3] text-sm font-bold mb-1">Watermarked PDFs</h3>
                  <p className="text-[#B89B6E] text-xs leading-relaxed">
                    All downloadable documents are watermarked with our contact details for easy reference and verification.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center mx-auto mb-3">
                    <Phone className="w-5 h-5 text-[#2A1506]" />
                  </div>
                  <h3 className="font-heading text-[#FFFAF3] text-sm font-bold mb-1">Speak to an Expert</h3>
                  <p className="text-[#B89B6E] text-xs leading-relaxed">
                    For the latest pricing, availability, and custom floor plans, reach out to our property consultants.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center mx-auto mb-3">
                    <Download className="w-5 h-5 text-[#2A1506]" />
                  </div>
                  <h3 className="font-heading text-[#FFFAF3] text-sm font-bold mb-1">Instant Download</h3>
                  <p className="text-[#B89B6E] text-xs leading-relaxed">
                    No registration required. Download brochures and floor plans instantly for all 13 clusters plus the masterplan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-20 bg-[#2A1506] border-t border-[#D4AF37]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#FFFAF3] mb-4">
              Ready to Schedule a Viewing?
            </h2>
            <p className="text-[#B89B6E] max-w-xl mx-auto mb-8">
              Our property consultants are available to provide detailed information, custom floor plans, and private viewings at Grand Polo Club & Resort.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="gold-gradient text-[#2A1506] font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity gold-shimmer-hover">
                  Book a Viewing
                </Button>
              </Link>
              <a href={`tel:${PHONE_NUMBER}`}>
                <Button className="border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 px-8 py-3 rounded-lg font-medium transition-colors bg-transparent">
                  <Phone className="w-4 h-4 mr-2" /> Call {PHONE_NUMBER}
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
}
