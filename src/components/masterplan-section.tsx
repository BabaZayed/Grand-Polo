"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const stats = [
  { value: "5.54M", unit: "SqM", label: "Total Area" },
  { value: "1.59M", unit: "SqM", label: "Open Space" },
  { value: "340K", unit: "SqM", label: "Polo Fields & Stables" },
  { value: "5,600", unit: "SqM", label: "Clubhouse GFA" },
  { value: "22", unit: "", label: "Residential Clusters" },
  { value: "6,661", unit: "", label: "Total Residences" },
  { value: "26,965", unit: "", label: "Est. Population" },
  { value: "5", unit: "Min", label: "To Airport" },
];

export default function MasterplanSection() {
  return (
    <section className="luxury-section-padding brochure-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-3"
          >
            Masterplan Overview
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#2A1506] mb-4"
          >
            <span className="gold-text">5.54 Million</span> SqM Masterplan
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="gold-divider max-w-xs mx-auto mb-6"
          />
          <p className="text-[#5D3A1A] text-sm max-w-2xl mx-auto">
            Grand Polo Club & Resort is a masterplan built to strike a fine balance between lifestyle principles of leisure, nature, connectivity, wellness, and recreation.
          </p>
        </div>

        {/* Masterplan Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl overflow-hidden border border-[#D4AF37]/20 mb-12 shadow-lg"
        >
          <div className="relative aspect-[16/7]">
            <Image
              src="/images/hero/masterplan-bg.webp"
              alt="Grand Polo Masterplan"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#2A1506]/20" />
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl p-6 text-center border border-[#D4AF37]/20 bg-white/50 backdrop-blur-sm hover:border-[#D4AF37]/40 hover:shadow-md transition-all"
            >
              <p className="font-heading text-2xl sm:text-3xl text-[#D4AF37] mb-1">
                {stat.value}
                {stat.unit && <span className="text-base ml-1 text-[#B89B6E]">{stat.unit}</span>}
              </p>
              <p className="text-[#5D3A1A] text-xs tracking-wide">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/masterplan">
            <Button className="gold-gradient text-[#2A1506] font-semibold px-8 py-3 rounded-md text-sm hover:opacity-90 transition-opacity gold-shimmer-hover">
              View Full Masterplan
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
