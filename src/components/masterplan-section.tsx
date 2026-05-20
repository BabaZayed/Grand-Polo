"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
    <section className="py-20 sm:py-28 bg-[#070B14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-3"
          >
            Masterplan Overview
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#FAF6F0] mb-4"
          >
            A Balanced <span className="gold-text">Masterpiece</span>
          </motion.h2>
          <div className="gold-divider max-w-xs mx-auto mb-6" />
          <p className="text-[#8B8678] text-sm max-w-2xl mx-auto">
            Grand Polo Club & Resort is a masterplan built to strike a fine balance between lifestyle principles of leisure, nature, connectivity, wellness, and recreation.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card rounded-xl p-6 text-center gold-border-hover"
            >
              <p className="font-heading text-2xl sm:text-3xl text-[#C9A84C] mb-1">
                {stat.value}
                {stat.unit && <span className="text-base ml-1 text-[#8B8678]">{stat.unit}</span>}
              </p>
              <p className="text-[#8B8678] text-xs tracking-wide">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/masterplan">
            <Button className="gold-gradient text-[#070B14] font-semibold px-8 py-3 rounded-md text-sm hover:opacity-90 transition-opacity">
              View Full Masterplan
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
