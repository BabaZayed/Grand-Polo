"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import WhatsAppButton from "@/components/whatsapp-button";
import { projects, formatPrice, SITE_URL, PHONE_NUMBER } from "@/lib/data";
import type { PropertyType } from "@/lib/data";
import { Download, FileText, LayoutGrid, Phone, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type TabType = "brochures" | "floorplans";

interface DownloadItem {
  slug: string;
  name: string;
  tagline: string;
  type: PropertyType;
  bedrooms: string;
  startingPrice: number;
  imageUrl: string;
  clusterTag: string;
  downloadType: "brochure" | "floorplan";
  fileName: string;
}

const brochureItems: DownloadItem[] = projects
  .filter((p) => p.status !== "Launching Soon")
  .map((p) => ({
    slug: p.slug,
    name: p.name,
    tagline: p.tagline,
    type: p.type,
    bedrooms: p.bedrooms,
    startingPrice: p.startingPrice,
    imageUrl: p.imageUrl,
    clusterTag: p.clusterTag,
    downloadType: "brochure" as const,
    fileName: `${p.slug}-brochure.pdf`,
  }));

const floorplanItems: DownloadItem[] = projects
  .filter((p) => p.status !== "Launching Soon")
  .map((p) => ({
    slug: p.slug,
    name: p.name,
    tagline: p.tagline,
    type: p.type,
    bedrooms: p.bedrooms,
    startingPrice: p.startingPrice,
    imageUrl: p.imageUrl,
    clusterTag: p.clusterTag,
    downloadType: "floorplan" as const,
    fileName: `${p.slug}-floorplan.pdf`,
  }));

function getDownloadUrl(item: DownloadItem): string {
  return `/api/download?type=${item.downloadType}&file=${item.fileName}`;
}

export default function BrochuresPage() {
  const [activeTab, setActiveTab] = useState<TabType>("brochures");
  const items = activeTab === "brochures" ? brochureItems : floorplanItems;

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
            <div className="flex gap-0" role="tablist" aria-label="Document type">
              <button
                onClick={() => setActiveTab("brochures")}
                role="tab"
                aria-selected={activeTab === "brochures"}
                className={`flex items-center gap-2 px-6 sm:px-10 py-4 text-sm sm:text-base font-medium transition-all duration-300 border-b-2 ${
                  activeTab === "brochures"
                    ? "text-[#D4AF37] border-[#D4AF37] bg-[#D4AF37]/5"
                    : "text-[#B89B6E] border-transparent hover:text-[#D4AF37] hover:bg-[#D4AF37]/5"
                }`}
              >
                <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Brochures</span>
                <span className="hidden sm:inline text-xs bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded-full">
                  {brochureItems.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab("floorplans")}
                role="tab"
                aria-selected={activeTab === "floorplans"}
                className={`flex items-center gap-2 px-6 sm:px-10 py-4 text-sm sm:text-base font-medium transition-all duration-300 border-b-2 ${
                  activeTab === "floorplans"
                    ? "text-[#D4AF37] border-[#D4AF37] bg-[#D4AF37]/5"
                    : "text-[#B89B6E] border-transparent hover:text-[#D4AF37] hover:bg-[#D4AF37]/5"
                }`}
              >
                <LayoutGrid className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Floor Plans</span>
                <span className="hidden sm:inline text-xs bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded-full">
                  {floorplanItems.length}
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Download Cards Grid */}
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {items.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-[#B89B6E] text-lg">No {activeTab} available yet. Check back soon!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item) => (
                  <div
                    key={`${item.slug}-${item.downloadType}`}
                    className="group rounded-xl overflow-hidden border border-[#D4AF37]/15 bg-[#2A1506]/80 hover:border-[#D4AF37]/40 transition-all duration-400 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#D4AF37]/5"
                  >
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={item.imageUrl}
                        alt={`${item.name} — ${item.bedrooms}-bedroom luxury villas at Grand Polo Club & Resort`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2A1506] via-[#2A1506]/40 to-transparent" />

                      {/* Type badge */}
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded text-xs font-bold gold-gradient text-[#2A1506]">
                          {item.clusterTag}
                        </span>
                      </div>

                      {/* Document type badge */}
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 rounded text-xs font-bold bg-[#2A1506]/80 text-[#D4AF37] border border-[#D4AF37]/30 flex items-center gap-1">
                          {item.downloadType === "brochure" ? (
                            <><FileText className="w-3 h-3" /> Brochure</>
                          ) : (
                            <><LayoutGrid className="w-3 h-3" /> Floor Plan</>
                          )}
                        </span>
                      </div>

                      {/* Name overlay */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <h2 className="font-heading text-xl font-bold text-[#FFFAF3]">{item.name}</h2>
                        <p className="text-[#D4AF37] text-sm">{item.tagline}</p>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-5">
                      <div className="grid grid-cols-3 gap-3 mb-5">
                        <div className="rounded-lg p-2 text-center border border-[#D4AF37]/10 bg-[#3D2510]/50">
                          <p className="text-[#FFFAF3] text-xs font-bold">{item.bedrooms} Bed</p>
                          <p className="text-[#B89B6E] text-[10px]">Bedrooms</p>
                        </div>
                        <div className="rounded-lg p-2 text-center border border-[#D4AF37]/10 bg-[#3D2510]/50">
                          <p className="text-[#D4AF37] text-xs font-bold">{formatPrice(item.startingPrice)}</p>
                          <p className="text-[#B89B6E] text-[10px]">Starting</p>
                        </div>
                        <div className="rounded-lg p-2 text-center border border-[#D4AF37]/10 bg-[#3D2510]/50">
                          <p className="text-[#FFFAF3] text-xs font-bold">{item.clusterTag}</p>
                          <p className="text-[#B89B6E] text-[10px]">Cluster</p>
                        </div>
                      </div>

                      {/* Download button */}
                      <a
                        href={getDownloadUrl(item)}
                        className="flex items-center justify-center gap-2 w-full h-11 gold-gradient text-[#2A1506] font-bold text-sm rounded-lg hover:opacity-90 transition-opacity"
                      >
                        <Download className="w-4 h-4" />
                        Download {item.downloadType === "brochure" ? "Brochure" : "Floor Plan"}
                      </a>

                      {/* View property link */}
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
            )}
          </div>
        </section>

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
                    No registration required. Download brochures and floor plans instantly for all available properties.
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
