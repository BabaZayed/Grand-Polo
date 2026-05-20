"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { projects } from "@/lib/data";
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
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#070B14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-3">Equestrian Living</p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-[#FAF6F0] mb-4">Regal <span className="gold-text">Residences</span></h1>
          <div className="gold-divider max-w-xs mx-auto mb-6" />
          <p className="text-[#8B8678] text-sm max-w-2xl mx-auto">22 residential clusters. 6,661 luxury residences. Discover your equestrian estate at Grand Polo Club & Resort.</p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-[#0A0E1A] border-b border-[#C9A84C]/10 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm transition-all ${
                activeTab === tab
                  ? "gold-gradient text-[#070B14] font-semibold"
                  : "text-[#8B8678] hover:text-[#C9A84C] border border-[#C9A84C]/20 hover:border-[#C9A84C]/40"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-[#0A0E1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/projects/${project.slug}`} className="block group">
                  <div className={`rounded-xl overflow-hidden ${project.status !== "Launching Soon" ? "glass-card-hover" : "glass-card"}`}>
                    <div className="relative h-56 overflow-hidden">
                      <Image src={project.imageUrl} alt={project.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className={`text-[10px] font-bold px-3 py-1 rounded-full tracking-wide uppercase ${
                          project.status === "Launching Soon" ? "bg-[#8B8678] text-[#070B14]" : "bg-[#C9A84C] text-[#070B14]"
                        }`}>
                          {project.clusterTag}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-heading text-xl text-[#FAF6F0] mb-2 group-hover:text-[#C9A84C] transition-colors">{project.name}</h3>
                      <p className="text-[#8B8678] text-sm mb-4">{project.tagline}</p>
                      {project.startingPrice > 0 && (
                        <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                          <div className="border border-[#C9A84C]/15 rounded-md py-2">
                            <p className="text-[#C9A84C] text-sm font-semibold">{project.bedrooms}</p>
                            <p className="text-[#8B8678] text-[10px]">Beds</p>
                          </div>
                          <div className="border border-[#C9A84C]/15 rounded-md py-2">
                            <p className="text-[#C9A84C] text-sm font-semibold">{project.facts.totalUnits}</p>
                            <p className="text-[#8B8678] text-[10px]">Units</p>
                          </div>
                          <div className="border border-[#C9A84C]/15 rounded-md py-2">
                            <p className="text-[#C9A84C] text-sm font-semibold">{(project.startingPrice / 1000000).toFixed(1)}M</p>
                            <p className="text-[#8B8678] text-[10px]">AED From</p>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-[#8B8678] text-xs">{project.status} {project.handover !== "TBA" ? `• ${project.handover}` : ""}</span>
                        <ArrowRight className="w-4 h-4 text-[#C9A84C] group-hover:translate-x-1 transition-transform" />
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
