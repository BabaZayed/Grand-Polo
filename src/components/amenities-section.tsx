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
    <section className="py-20 sm:py-28 bg-[#0A0E1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-3"
          >
            23 World-Class Amenities
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#FAF6F0] mb-4"
          >
            Life Beyond <span className="gold-text">Ordinary</span>
          </motion.h2>
          <div className="gold-divider max-w-xs mx-auto mb-6" />
          <p className="text-[#8B8678] text-sm max-w-2xl mx-auto">
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
                className="glass-card-hover rounded-lg p-4 text-center"
              >
                <Icon className="w-6 h-6 text-[#C9A84C] mx-auto mb-2" />
                <p className="text-[#FAF6F0] text-xs leading-tight">{amenity.name}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
