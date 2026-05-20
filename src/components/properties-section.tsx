"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";

export default function PropertiesSection() {
  const available = projects.filter((p) => p.status !== "Launching Soon");
  const comingSoon = projects.filter((p) => p.status === "Launching Soon");

  return (
    <section className="py-20 sm:py-28 bg-[#070B14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-3"
          >
            Introducing the First Phase
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#FAF6F0] mb-4"
          >
            Regal <span className="gold-text">Residences</span>
          </motion.h2>
          <div className="gold-divider max-w-xs mx-auto" />
        </div>

        {/* Property Cards */}
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
                <div className="glass-card-hover rounded-xl overflow-hidden">
                  {/* Image */}
                  <div className="relative h-56 sm:h-64 overflow-hidden">
                    <Image
                      src={project.imageUrl}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#C9A84C] text-[#070B14] text-[10px] font-bold px-3 py-1 rounded-full tracking-wide uppercase">
                        {project.clusterTag}
                      </span>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-heading text-xl text-[#FAF6F0] mb-2 group-hover:text-[#C9A84C] transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-[#8B8678] text-sm mb-4 line-clamp-2">{project.tagline}</p>
                    <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                      <div className="border border-[#C9A84C]/15 rounded-md py-2">
                        <p className="text-[#C9A84C] text-sm font-semibold">{project.bedrooms}</p>
                        <p className="text-[#8B8678] text-[10px]">Bedrooms</p>
                      </div>
                      <div className="border border-[#C9A84C]/15 rounded-md py-2">
                        <p className="text-[#C9A84C] text-sm font-semibold">{project.facts.totalUnits}</p>
                        <p className="text-[#8B8678] text-[10px]">Units</p>
                      </div>
                      <div className="border border-[#C9A84C]/15 rounded-md py-2">
                        <p className="text-[#C9A84C] text-sm font-semibold">
                          {project.startingPrice >= 1000000
                            ? `${(project.startingPrice / 1000000).toFixed(1)}M`
                            : "TBA"}
                        </p>
                        <p className="text-[#8B8678] text-[10px]">From AED</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#8B8678] text-xs">{project.status} • {project.handover}</span>
                      <ArrowRight className="w-4 h-4 text-[#C9A84C] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-xl p-8 text-center"
        >
          <h3 className="font-heading text-2xl text-[#FAF6F0] mb-3">
            <span className="gold-text">{comingSoon.length} More Clusters</span> Launching Soon
          </h3>
          <p className="text-[#8B8678] text-sm mb-6 max-w-lg mx-auto">
            Equestra, Equitera, Montura, Selvara, and more — register your interest for priority access at launch.
          </p>
          <Link href="/contact">
            <Button className="gold-gradient text-[#070B14] font-semibold px-8 py-3 rounded-md text-sm hover:opacity-90 transition-opacity">
              Register Interest
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
