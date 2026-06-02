"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects, formatPrice } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";

export default function PropertiesSection() {
  const available = projects.filter((p) => p.status !== "Launching Soon");
  const comingSoon = projects.filter((p) => p.status === "Launching Soon");

  return (
    <section className="luxury-section-padding bg-[#5D3A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-3"
          >
            Introducing the First Phase
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#FFFAF3] mb-4"
          >
            Regal <span className="gold-text">Residences</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="gold-divider max-w-xs mx-auto"
          />
        </div>

        {/* Property Cards - Featured */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {available.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Link href={`/projects/${project.slug}`} className="block group">
                <div className="rounded-xl overflow-hidden border border-[#D4AF37]/15 bg-[#3D2510] hover:border-[#D4AF37]/40 transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3),0_0_20px_rgba(212,175,55,0.08)]">
                  {/* Image */}
                  <div className="relative h-56 sm:h-64 overflow-hidden">
                    <Image
                      src={project.imageUrl}
                      alt={`${project.name} — ${project.bedrooms}-bedroom luxury villas at Grand Polo Club & Resort Dubai`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2A1506] via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="gold-gradient text-[#2A1506] text-[10px] font-bold px-3 py-1 rounded-full tracking-wide uppercase">
                        {project.clusterTag}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-heading text-xl text-[#FFFAF3] mb-1 group-hover:text-[#D4AF37] transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-[#D4AF37] text-sm font-semibold">
                        Starting from {formatPrice(project.startingPrice)}
                      </p>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-6">
                    <p className="text-[#B89B6E] text-sm mb-4 line-clamp-2">{project.tagline}</p>
                    <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                      <div className="border border-[#D4AF37]/15 rounded-md py-2">
                        <p className="text-[#D4AF37] text-sm font-semibold">{project.bedrooms}</p>
                        <p className="text-[#B89B6E] text-[10px]">Bedrooms</p>
                      </div>
                      <div className="border border-[#D4AF37]/15 rounded-md py-2">
                        <p className="text-[#D4AF37] text-sm font-semibold">{project.facts.totalUnits}</p>
                        <p className="text-[#B89B6E] text-[10px]">Units</p>
                      </div>
                      <div className="border border-[#D4AF37]/15 rounded-md py-2">
                        <p className="text-[#D4AF37] text-sm font-semibold">{project.handover}</p>
                        <p className="text-[#B89B6E] text-[10px]">Handover</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#B89B6E] text-xs">{project.status}</span>
                      <span className="text-[#D4AF37] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Details <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl overflow-hidden border border-[#D4AF37]/15 bg-[#3D2510]/50 p-8 text-center"
        >
          <h3 className="font-heading text-2xl text-[#FFFAF3] mb-3">
            <span className="gold-text">{comingSoon.length} More Clusters</span> Launching Soon
          </h3>
          <p className="text-[#B89B6E] text-sm mb-6 max-w-lg mx-auto">
            Equestra, Equitera, Montura, Selvara, and more — register your interest for priority access at launch.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {comingSoon.map((p) => (
              <span key={p.id} className="px-3 py-1 rounded-full text-xs border border-[#D4AF37]/20 text-[#B89B6E]">
                {p.name}
              </span>
            ))}
          </div>
          <Link href="/contact">
            <Button className="gold-gradient text-[#2A1506] font-semibold px-8 py-3 rounded-md text-sm hover:opacity-90 transition-opacity gold-shimmer-hover">
              Register Interest
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
