"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import WhatsAppButton from "@/components/whatsapp-button";
import FloorPlanUnitCard from "@/components/floorplan-unit-card";
import FloorPlanDetailModal from "@/components/floorplan-detail-modal";
import { projects, formatPrice, SITE_URL, PHONE_NUMBER, masterPlanFacts, unitTypes } from "@/lib/data";
import type { PropertyType, UnitType, FloorPlanImage } from "@/lib/data";
import { Download, FileText, LayoutGrid, Phone, ChevronRight, MapPin, Map, BedDouble, Maximize, LandPlot, Tag, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

type TabType = "brochures" | "floorplans" | "masterplan";

const clusterFilters = ["All", "Estate Villas", "Field Villas", "Equestra", "Equitera", "Montura", "Selvara"];
const bedFilters = ["All", "3 Bed", "4 Bed", "5 Bed", "6 Bed"];

function getDownloadUrl(slug: string, type: "brochure" | "floorplan"): string {
  return `/api/download?type=${type}&file=${slug}-${type}.pdf`;
}

export default function BrochuresPage() {
  const [activeTab, setActiveTab] = useState<TabType>("floorplans");
  const [clusterFilter, setClusterFilter] = useState("All");
  const [bedFilter, setBedFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProjectSlug, setModalProjectSlug] = useState("");
  const [modalUnitIndex, setModalUnitIndex] = useState(0);

  // Build floor plan data: combine projects with their unit types
  const floorPlanData = useMemo(() => {
    return projects.map((p) => {
      const units = unitTypes[p.slug] || [];
      return { ...p, units };
    });
  }, []);

  // Filter floor plans by cluster and bedroom
  const filteredFloorPlans = useMemo(() => {
    let data = floorPlanData;
    if (clusterFilter !== "All") {
      data = data.filter((p) => p.clusterTag === clusterFilter);
    }
    if (bedFilter !== "All") {
      const bedNum = parseInt(bedFilter);
      data = data.filter((p) => p.units.some((u) => u.bedrooms === bedNum));
    }
    return data;
  }, [floorPlanData, clusterFilter, bedFilter]);

  // Count total unit types
  const totalUnitTypes = useMemo(() => {
    return floorPlanData.reduce((acc, p) => acc + p.units.length, 0);
  }, [floorPlanData]);

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
              Brochures <span className="font-heading">&</span> Floor Plans
            </h1>
            <p className="text-[#B89B6E] text-lg max-w-2xl mx-auto mb-2">
              Explore floor plan unit types, download brochures and floor plans for all Grand Polo Club & Resort properties.
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
                  {totalUnitTypes}
                </span>
              </button>
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
                  {projects.length + 1}
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

        {/* ====== FLOOR PLANS TAB ====== */}
        {activeTab === "floorplans" && (
          <section className="py-8 lg:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Filter Bar */}
              <div className="mb-8 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center gap-2 text-[#B89B6E] text-sm">
                    <Search className="w-4 h-4" />
                    <span>Filter by:</span>
                  </div>
                  {/* Cluster Filter */}
                  <div className="flex gap-2 flex-wrap">
                    {clusterFilters.map((c) => (
                      <button
                        key={c}
                        onClick={() => setClusterFilter(c)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          clusterFilter === c
                            ? "gold-gradient text-[#2A1506] font-bold"
                            : "text-[#B89B6E] border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center gap-2 text-[#B89B6E] text-sm">
                    <BedDouble className="w-4 h-4" />
                    <span>Bedrooms:</span>
                  </div>
                  {/* Bedroom Filter */}
                  <div className="flex gap-2 flex-wrap">
                    {bedFilters.map((b) => (
                      <button
                        key={b}
                        onClick={() => setBedFilter(b)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          bedFilter === b
                            ? "gold-gradient text-[#2A1506] font-bold"
                            : "text-[#B89B6E] border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
                <p className="text-[#B89B6E] text-xs">
                  Showing {filteredFloorPlans.reduce((acc, p) => {
                    const units = bedFilter === "All" ? p.units : p.units.filter((u) => u.bedrooms === parseInt(bedFilter));
                    return acc + units.length;
                  }, 0)} unit types across {filteredFloorPlans.length} clusters
                </p>
              </div>

              {/* Floor Plan Cards by Project */}
              <div className="space-y-10">
                {filteredFloorPlans.map((project) => {
                  const displayUnits = bedFilter === "All"
                    ? project.units
                    : project.units.filter((u) => u.bedrooms === parseInt(bedFilter));

                  if (displayUnits.length === 0) return null;

                  return (
                    <div key={project.id} className="rounded-xl overflow-hidden border border-[#D4AF37]/15 bg-[#2A1506]/80">
                      {/* Project Header */}
                      <div className="relative h-48 sm:h-56 overflow-hidden">
                        <Image
                          src={project.imageUrl}
                          alt={`${project.name} at Grand Polo Club & Resort`}
                          fill
                          sizes="(max-width: 768px) 100vw, 1200px"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2A1506] via-[#2A1506]/60 to-[#2A1506]/30" />
                        <div className="absolute inset-0 flex items-end p-6">
                          <div className="w-full">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="px-3 py-1 rounded text-xs font-bold gold-gradient text-[#2A1506]">
                                {project.clusterTag}
                              </span>
                              <span className="px-3 py-1 rounded text-xs font-medium border border-[#D4AF37]/30 text-[#D4AF37]">
                                {project.bedrooms} Bed
                              </span>
                              <span className="px-3 py-1 rounded text-xs font-medium border border-[#D4AF37]/30 text-[#D4AF37]">
                                {project.type === "townhouse" ? "Townhouse" : "Villa"}
                              </span>
                            </div>
                            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#FFFAF3] mb-1">{project.name}</h2>
                            <p className="text-[#D4AF37] text-sm">{project.tagline}</p>
                          </div>
                        </div>
                        {/* Quick stats overlay */}
                        <div className="absolute top-4 right-4 flex gap-2">
                          <a
                            href={getDownloadUrl(project.slug, "floorplan")}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#2A1506]/90 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-medium hover:bg-[#D4AF37]/10 transition-colors backdrop-blur-sm"
                          >
                            <Download className="w-3.5 h-3.5" /> Floor Plan PDF
                          </a>
                          <a
                            href={getDownloadUrl(project.slug, "brochure")}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#2A1506]/90 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-medium hover:bg-[#D4AF37]/10 transition-colors backdrop-blur-sm"
                          >
                            <FileText className="w-3.5 h-3.5" /> Brochure
                          </a>
                        </div>
                      </div>

                      {/* Unit Types Grid — Unified with Floor Plans */}
                      <div className="p-4 sm:p-6">
                        <h3 className="font-heading text-lg font-bold text-[#FFFAF3] mb-4">
                          Unit Configurations ({displayUnits.length} type{displayUnits.length > 1 ? "s" : ""})
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {displayUnits.map((unit, idx) => {
                            // Find the original index in the full units array for image mapping
                            const originalIdx = project.units.indexOf(unit);
                            const unitImages = project.floorPlanImages.filter((img) => img.unitTypeIndex === originalIdx);
                            const sharedImages = project.floorPlanImages.filter((img) => img.unitTypeIndex === -1 || img.unitTypeIndex === undefined);

                            return (
                              <FloorPlanUnitCard
                                key={idx}
                                unit={unit}
                                images={unitImages}
                                sharedImages={sharedImages}
                                projectName={project.name}
                                slug={project.slug}
                                onView={() => {
                                  setModalProjectSlug(project.slug);
                                  setModalUnitIndex(originalIdx);
                                  setModalOpen(true);
                                }}
                              />
                            );
                          })}
                        </div>

                        {/* Project Summary Bar */}
                        <div className="mt-5 pt-4 border-t border-[#D4AF37]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-4 text-xs">
                            <span className="text-[#B89B6E]">
                              <span className="text-[#D4AF37] font-bold">{project.facts.totalUnits}</span> Total Units
                            </span>
                            <span className="text-[#B89B6E]">
                              <span className="text-[#D4AF37] font-bold">{project.areaRange}</span> BUA Range
                            </span>
                            {project.plotArea && (
                              <span className="text-[#B89B6E]">
                                <span className="text-[#D4AF37] font-bold">{project.plotArea}</span> Plot Range
                              </span>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Link
                              href={`/projects/${project.slug}`}
                              className="flex items-center gap-1 px-4 py-2 rounded-lg border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 text-xs font-medium transition-colors"
                            >
                              Full Details <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                            <a
                              href={getDownloadUrl(project.slug, "floorplan")}
                              className="flex items-center gap-1 px-4 py-2 rounded-lg gold-gradient text-[#2A1506] text-xs font-bold hover:opacity-90 transition-opacity"
                            >
                              <Download className="w-3.5 h-3.5" /> Download Floor Plan
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* No results */}
              {filteredFloorPlans.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-[#B89B6E] text-lg mb-4">No floor plans match your filter.</p>
                  <button
                    onClick={() => { setClusterFilter("All"); setBedFilter("All"); }}
                    className="px-6 py-2 gold-gradient text-[#2A1506] font-bold text-sm rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ====== BROCHURES TAB ====== */}
        {activeTab === "brochures" && (
          <section className="py-12 lg:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                      href="/api/download?type=brochure&file=grand-polo-masterplan-brochure.pdf"
                      className="flex items-center justify-center gap-2 w-full h-11 gold-gradient text-[#2A1506] font-bold text-sm rounded-lg hover:opacity-90 transition-opacity"
                    >
                      <Download className="w-4 h-4" /> Download Brochure
                    </a>
                    <Link
                      href="/masterplan"
                      className="flex items-center justify-center gap-1 w-full h-10 mt-2 rounded-lg border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 text-sm font-medium transition-colors"
                    >
                      View Masterplan <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* All project brochure cards */}
                {projects.map((project) => (
                  <div
                    key={`${project.slug}-brochure`}
                    className="group rounded-xl overflow-hidden border border-[#D4AF37]/15 bg-[#2A1506]/80 hover:border-[#D4AF37]/40 transition-all duration-400 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#D4AF37]/5"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={project.imageUrl}
                        alt={`${project.name} — ${project.bedrooms}-bedroom luxury villas at Grand Polo Club & Resort`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2A1506] via-[#2A1506]/40 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded text-xs font-bold gold-gradient text-[#2A1506]">
                          {project.clusterTag}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 rounded text-xs font-bold bg-[#2A1506]/80 text-[#D4AF37] border border-[#D4AF37]/30 flex items-center gap-1">
                          <FileText className="w-3 h-3" /> Brochure
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h2 className="font-heading text-xl font-bold text-[#FFFAF3]">{project.name}</h2>
                        <p className="text-[#D4AF37] text-sm">{project.tagline}</p>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="grid grid-cols-3 gap-3 mb-5">
                        <div className="rounded-lg p-2 text-center border border-[#D4AF37]/10 bg-[#3D2510]/50">
                          <p className="text-[#FFFAF3] text-xs font-bold">{project.bedrooms} Bed</p>
                          <p className="text-[#B89B6E] text-[10px]">Type</p>
                        </div>
                        <div className="rounded-lg p-2 text-center border border-[#D4AF37]/10 bg-[#3D2510]/50">
                          <p className="text-[#D4AF37] text-xs font-bold">{formatPrice(project.startingPrice)}</p>
                          <p className="text-[#B89B6E] text-[10px]">Starting</p>
                        </div>
                        <div className="rounded-lg p-2 text-center border border-[#D4AF37]/10 bg-[#3D2510]/50">
                          <p className="text-[#FFFAF3] text-xs font-bold">{project.clusterTag}</p>
                          <p className="text-[#B89B6E] text-[10px]">Cluster</p>
                        </div>
                      </div>
                      <a
                        href={getDownloadUrl(project.slug, "brochure")}
                        className="flex items-center justify-center gap-2 w-full h-11 gold-gradient text-[#2A1506] font-bold text-sm rounded-lg hover:opacity-90 transition-opacity"
                      >
                        <Download className="w-4 h-4" /> Download Brochure
                      </a>
                      <Link
                        href={`/projects/${project.slug}`}
                        className="flex items-center justify-center gap-1 w-full h-10 mt-2 rounded-lg border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 text-sm font-medium transition-colors"
                      >
                        View Property <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ====== MASTERPLAN TAB ====== */}
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
                        <FileText className="w-4 h-4" /> Download Brochure
                      </a>
                      <a
                        href="/api/download?type=floorplan&file=grand-polo-masterplan-floorplan.pdf"
                        className="flex items-center justify-center gap-2 h-12 px-6 rounded-lg border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 text-sm font-medium transition-colors"
                      >
                        <LayoutGrid className="w-4 h-4" /> Download Community Layout
                      </a>
                    </div>
                  </div>

                  {/* Right - Visual */}
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
                      <p className="text-[#D4AF37] text-[10px] mt-1">{project.clusterTag} • {project.bedrooms} Bed</p>
                    </div>
                  </Link>
                ))}
              </div>
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

      {/* Floor Plan Detail Modal */}
      {(() => {
        const modalProject = projects.find((p) => p.slug === modalProjectSlug);
        const modalUnits = modalProject ? (unitTypes[modalProject.slug] || []) : [];
        const modalUnit = modalUnits[modalUnitIndex];
        if (!modalOpen || !modalProject || !modalUnit) return null;
        const modalUnitImages = modalProject.floorPlanImages.filter((img) => img.unitTypeIndex === modalUnitIndex);
        const modalSharedImages = modalProject.floorPlanImages.filter((img) => img.unitTypeIndex === -1 || img.unitTypeIndex === undefined);
        return (
          <FloorPlanDetailModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            unit={modalUnit}
            images={modalUnitImages}
            sharedImages={modalSharedImages}
            projectName={modalProject.name}
            slug={modalProject.slug}
            clusterTag={modalProject.clusterTag}
          />
        );
      })()}
    </>
  );
}
