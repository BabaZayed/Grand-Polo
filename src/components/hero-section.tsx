"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section id="hero-section" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero/hero-dark.jpg')" }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070B14]/70 via-[#070B14]/50 to-[#070B14]" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[#C9A84C] text-xs sm:text-sm tracking-[0.4em] uppercase font-sans mb-6"
        >
          Grand Polo Club &amp; Resort
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#FAF6F0] leading-tight mb-6"
        >
          A New Chapter of
          <br />
          <span className="gold-text">Luxury Equestrian</span>
          <br />
          Living Unfolds
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-[#8B8678] text-sm sm:text-base mb-4"
        >
          By Emaar Properties PJSC
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-6 text-[#8B8678] text-xs sm:text-sm mb-10"
        >
          <span>3 Polo Fields</span>
          <span className="text-[#C9A84C]">•</span>
          <span>Private Stables</span>
          <span className="text-[#C9A84C]">•</span>
          <span>6,661 Residences</span>
          <span className="text-[#C9A84C]">•</span>
          <span>From AED 7.34M</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/projects">
            <Button className="gold-gradient text-[#070B14] font-semibold px-8 py-3 rounded-md text-sm tracking-wide hover:opacity-90 transition-opacity w-full sm:w-auto">
              Explore Properties
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" className="border-[#C9A84C]/40 text-[#C9A84C] hover:bg-[#C9A84C]/10 px-8 py-3 rounded-md text-sm tracking-wide w-full sm:w-auto">
              Enquire Now
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-[#C9A84C]/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
