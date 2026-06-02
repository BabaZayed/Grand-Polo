"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const features = [
  {
    title: "The Polo Fields",
    subtitle: "Where Luxury Meets Equestrian Heritage",
    description: "A space crafted to harness the spirit and speed of the horses. Seamless landscapes envisioned to offer a contemporary take on classic polo grounds. Spanning 340,000 SqM, these fields define the monumentality of the vision.",
    image: "/images/gallery/polo-field-1.webp",
    stat: "340,000 SqM",
  },
  {
    title: "The Clubhouse",
    subtitle: "Homage To Design",
    description: "A fusion of cultural heritage with contemporary design principles emphasising sustainability, honouring the past while addressing modern needs. The elongated, single-storey Clubhouse boasts panoramic views of Polo Fields across 5,600 SqM.",
    image: "/images/gallery/clubhouse-1.webp",
    stat: "5,600 SqM",
  },
  {
    title: "The Stables",
    subtitle: "Experience The Exceptional",
    description: "An organic, spiraling design that encircles a large, landscaped courtyard. Set to become a significant global landmark in the equestrian realm — an inviting hidden gem revealed upon entering the building.",
    image: "/images/gallery/stables-1.webp",
    stat: "Private Stables",
  },
];

export default function EquestrianSection() {
  return (
    <section className="relative luxury-section-padding overflow-hidden">
      {/* Parallax background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/images/gallery/dubai-polo.webp')" }}
      />
      {/* Brown overlay */}
      <div className="absolute inset-0 bg-[#2A1506]/85" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-3"
          >
            The Heart of the Masterplan
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#FFFAF3] mb-4"
          >
            Discover <span className="gold-text">Equestrian</span> Living
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="gold-divider max-w-xs mx-auto mb-6"
          />
          <p className="text-[#E0E0D1]/60 text-sm max-w-2xl mx-auto">
            Situated in the heart of the masterplan, the Green Core enhances aesthetic appeal and promotes a sense of community and connection to nature. Comprising three Polo Fields, a luxurious Clubhouse, and private Stables.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group"
            >
              <div className="rounded-xl overflow-hidden border border-[#D4AF37]/15 bg-[#3D2510]/80 backdrop-blur-sm hover:border-[#D4AF37]/40 transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3),0_0_20px_rgba(212,175,55,0.08)]">
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A1506] via-[#2A1506]/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-heading text-2xl text-[#FFFAF3] mb-1">{feature.title}</h3>
                    <p className="text-[#D4AF37] text-xs tracking-wide">{feature.subtitle}</p>
                  </div>
                  {/* Stat badge */}
                  <div className="absolute top-4 right-4">
                    <span className="gold-gradient text-[#2A1506] text-[10px] font-bold px-3 py-1 rounded-full">
                      {feature.stat}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[#E0E0D1]/60 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
