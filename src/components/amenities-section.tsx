"use client";

import { motion } from "framer-motion";
import { amenities } from "@/lib/data";
import {
  Crown, Building2, Waves, Palette, TreePine, CircleDot, Target, Circle,
  Swords, Sun, Flag, Baby, Dumbbell, Dog, Trees, UtensilsCrossed,
  Flower2, Mountain, Armchair, Gamepad2, Bike, Landmark, Shield,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Crown, Building2, Waves, Palette, TreePine, CircleDot, Target, Circle,
  Swords, Sun, Flag, Baby, Dumbbell, Dog, Trees, UtensilsCrossed,
  Flower2, Mountain, Armchair, Gamepad2, Bike, Landmark, Shield,
};

export default function AmenitiesSection() {
  return (
    <section className="luxury-section-padding bg-[#2A1506]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-3"
          >
            23 World-Class Amenities
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#FFFAF3] mb-4"
          >
            Life Beyond <span className="gold-text">Ordinary</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="gold-divider max-w-xs mx-auto mb-6"
          />
          <p className="text-[#8B6B47] text-sm max-w-2xl mx-auto">
            Enter a world where recreation becomes art. From the galloping fountain to the art pavilion, each space inspires joy and connection.
          </p>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {amenities.map((amenity, i) => {
            const Icon = iconMap[amenity.icon] || Crown;
            return (
              <motion.div
                key={amenity.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="rounded-lg p-4 text-center border border-[#D4AF37]/10 bg-[#3D2510]/50 hover:border-[#D4AF37]/30 hover:bg-[#3D2510]/80 transition-all duration-300 group cursor-default"
              >
                <Icon className="w-6 h-6 text-[#D4AF37] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-[#FFFAF3]/80 text-xs leading-tight">{amenity.name}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
