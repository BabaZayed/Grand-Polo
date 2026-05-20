"use client";

import { motion } from "framer-motion";
import { ChevronDown, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section id="hero-section" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero/chevalia-estate-2-hero.jpg')" }}
      />
      {/* Rich brown gradient overlay - matching brochure style */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2A1506]/60 via-[#5D3A1A]/40 to-[#2A1506]" />

      {/* Subtle gold dust / particle animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#D4AF37] rounded-full opacity-0"
            animate={{
              opacity: [0, 0.6, 0],
              y: [0, -100, -200],
              x: [0, (i % 2 === 0 ? 20 : -20)],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 1.2,
              ease: "easeOut",
            }}
            style={{
              left: `${15 + i * 15}%`,
              bottom: `${10 + i * 5}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[#D4AF37] text-xs sm:text-sm tracking-[0.4em] uppercase font-sans mb-6"
        >
          By Emaar Properties
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#FFFAF3] leading-tight mb-4"
        >
          Grand Polo
          <br />
          <span className="gold-text">Club &amp; Resort</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="font-heading text-lg sm:text-xl md:text-2xl text-[#E0E0D1]/80 mb-8 italic"
        >
          Where Equestrian Elegance Meets Luxury Living
        </motion.p>

        {/* Animated gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="gold-divider max-w-xs mx-auto mb-8"
        />

        {/* Three key stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-10"
        >
          {[
            { value: "3", label: "Polo Fields" },
            { value: "6,661", label: "Residences" },
            { value: "5.54M", label: "SqM Masterplan" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-2xl sm:text-3xl text-[#D4AF37] font-bold">
                {stat.value}
              </p>
              <p className="text-[#E0E0D1]/60 text-xs sm:text-sm tracking-wide">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/projects">
            <Button className="gold-gradient gold-shimmer-hover text-[#2A1506] font-semibold px-8 py-3.5 rounded-md text-sm tracking-wide hover:opacity-90 transition-opacity w-full sm:w-auto">
              Explore Properties
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              variant="outline"
              className="border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] px-8 py-3.5 rounded-md text-sm tracking-wide w-full sm:w-auto group"
            >
              <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Watch Video
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[#8B6B47] text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-[#D4AF37]/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
