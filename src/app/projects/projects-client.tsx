"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { projects, formatPrice } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import WhatsAppButton from "@/components/whatsapp-button";

const tabs = ["All", "Available", "Coming Soon"];

export default function ProjectsPageClient() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered = activeTab === "All"
    ? projects
    : activeTab === "Available"
      ? projects.filter((p) => p.status !== "Launching Soon")
      : projects.filter((p) => p.status === "Launching Soon");

  return (
    <main>
      <SiteHeader />
      <section className="pt-32 pb-16 bg-[#2A1506]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-3">Equestrian Living</p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-[#FFFAF3] mb-4">Regal <span className="gold-text">Residences</span></h1>
          <div className="gold-divider max-w-xs mx-auto mb-6" />
          <p className="text-[#B89B6E] text-sm max-w-2xl mx-auto">22 residential clusters. 6,661 luxury residences. Discover your equestrian estate at Grand Polo Club & Resort.</p>
        </div>
      </section>

      <section className="bg-[#3D2510] border-b border-[#D4AF37]/10 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-center gap-2">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} aria-pressed={activeTab === tab} aria-label={`Filter by ${tab}`} className={`px-5 py-2 rounded-full text-sm transition-all ${activeTab === tab ? "gold-gradient text-[#2A1506] font-semibold" : "text-[#B89B6E] hover:text-[#D4AF37] border border-[#D4AF37]/20 hover:border-[#D4AF37]/40"}`}>
              {tab}
            </button>
          ))}
        </div>
      </section>

      <section className="py-16 bg-[#5D3A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project, i) => (
              <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link href={`/projects/${project.slug}`} className="block group">
                  <div className={`rounded-xl overflow-hidden border transition-all duration-400 hover:-translate-y-1 ${project.status !== "Launching Soon" ? "border-[#D4AF37]/15 bg-[#3D2510]/50 hover:border-[#D4AF37]/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3),0_0_20px_rgba(212,175,55,0.08)]" : "border-[#D4AF37]/10 bg-[#3D2510]/30"}`}>
                    <div className="relative h-56 overflow-hidden">
                      <Image src={project.imageUrl} alt={`${project.name} — ${project.bedrooms}-bedroom luxury villas at Grand Polo Dubai`} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2A1506] via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className={`text-[10px] font-bold px-3 py-1 rounded-full tracking-wide uppercase ${project.status === "Launching Soon" ? "bg-[#B89B6E] text-[#FFFAF3]" : "gold-gradient text-[#2A1506]"}`}>
                          {project.clusterTag}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h2 className="font-heading text-xl text-[#FFFAF3] mb-2 group-hover:text-[#D4AF37] transition-colors">{project.name}</h2>
                      <p className="text-[#B89B6E] text-sm mb-4">{project.tagline}</p>
                      {project.startingPrice > 0 && (
                        <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                          <div className="border border-[#D4AF37]/15 rounded-md py-2">
                            <p className="text-[#D4AF37] text-sm font-semibold">{project.bedrooms}</p>
                            <p className="text-[#B89B6E] text-[10px]">Beds</p>
                          </div>
                          <div className="border border-[#D4AF37]/15 rounded-md py-2">
                            <p className="text-[#D4AF37] text-sm font-semibold">{project.facts.totalUnits}</p>
                            <p className="text-[#B89B6E] text-[10px]">Units</p>
                          </div>
                          <div className="border border-[#D4AF37]/15 rounded-md py-2">
                            <p className="text-[#D4AF37] text-sm font-semibold">{formatPrice(project.startingPrice)}</p>
                            <p className="text-[#B89B6E] text-[10px]">From</p>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-[#B89B6E] text-xs">{project.status} {project.handover !== "TBA" ? `• ${project.handover}` : ""}</span>
                        <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppButton />
    </main>
  );
}
