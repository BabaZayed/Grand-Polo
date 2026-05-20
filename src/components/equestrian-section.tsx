"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const features = [
  {
    title: "The Polo Fields",
    subtitle: "Where Luxury Meets Equestrian Heritage",
    description: "A space crafted to harness the spirit and speed of the horses. Seamless landscapes envisioned to offer a contemporary take on classic polo grounds. Spanning 340,000 SqM, these fields define the monumentality of the vision.",
    image: "/images/gallery/polo-field-1.jpg",
  },
  {
    title: "The Clubhouse",
    subtitle: "Homage To Design",
    description: "A fusion of cultural heritage with contemporary design principles emphasising sustainability, honouring the past while addressing modern needs. The elongated, single-storey Clubhouse boasts panoramic views of Polo Fields across 5,600 SqM.",
    image: "/images/gallery/clubhouse-1.jpg",
  },
  {
    title: "The Stables",
    subtitle: "Experience The Exceptional",
    description: "An organic, spiraling design that encircles a large, landscaped courtyard. Set to become a significant global landmark in the equestrian realm — an inviting hidden gem revealed upon entering the building.",
    image: "/images/gallery/stables-1.jpg",
  },
];

export default function EquestrianSection() {
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
            The Heart of the Masterplan
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#FAF6F0] mb-4"
          >
            The Green <span className="gold-text">Core</span>
          </motion.h2>
          <div className="gold-divider max-w-xs mx-auto mb-6" />
          <p className="text-[#8B8678] text-sm max-w-2xl mx-auto">
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
              <div className="glass-card-hover rounded-xl overflow-hidden">
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-[#070B14]/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-heading text-2xl text-[#FAF6F0] mb-1">{feature.title}</h3>
                    <p className="text-[#C9A84C] text-xs tracking-wide">{feature.subtitle}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[#8B8678] text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
