"use client";

import { motion } from "framer-motion";
import { getAvailableProjects, paymentPlans, formatPrice } from "@/lib/data";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function PaymentPlanSection() {
  const properties = getAvailableProjects();

  return (
    <section className="py-16 lg:py-24 bg-[#5D3A1A] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium">Flexible Payment Options</span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFFAF3] mt-3 mb-4">
            Payment <span className="gold-text">Plans</span>
          </h2>
          <div className="gold-divider max-w-xs mx-auto mb-4" />
          <p className="text-[#8B6B47] max-w-2xl mx-auto">
            Construction-linked payment plans with just 10% down payment. Pay gradually as your home takes shape.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {properties.map((property, index) => {
            const milestones = paymentPlans[property.slug] || [];
            return (
              <motion.div
                key={property.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl overflow-hidden border border-[#D4AF37]/15 bg-[#3D2510]/50"
              >
                <div className="bg-[#2A1506]/50 p-5 border-b border-[#D4AF37]/10">
                  <h3 className="font-heading text-lg font-bold text-[#FFFAF3]">{property.name}</h3>
                  <p className="text-[#D4AF37] text-sm mt-1">From {formatPrice(property.startingPrice)}</p>
                </div>

                <div className="p-5 space-y-0">
                  {milestones.map((milestone, mi) => (
                    <div key={mi} className="relative">
                      <div className="flex items-center gap-4 py-3">
                        <div className="relative z-10">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${mi === 0 ? "gold-gradient text-[#2A1506]" : mi === milestones.length - 1 ? "bg-[#8B6B47] text-[#FFFAF3]" : "bg-[#2A1506] border border-[#D4AF37]/30 text-[#D4AF37]"}`}>
                            {milestone.percentage}%
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[#FFFAF3] text-sm font-medium">{milestone.label}</p>
                          <p className="text-[#8B6B47] text-xs">{milestone.date}</p>
                        </div>
                        <Badge
                          variant="outline"
                          className={`text-xs shrink-0 ${mi === 0 ? "border-[#D4AF37]/30 text-[#D4AF37]" : mi === milestones.length - 1 ? "border-[#8B6B47]/30 text-[#8B6B47]" : "border-[#8B6B47]/20 text-[#8B6B47]"}`}
                        >
                          {mi === 0 ? "Booking" : mi === milestones.length - 1 ? "Completion" : "Instalment"}
                        </Badge>
                      </div>
                      {mi < milestones.length - 1 && <div className="absolute left-[15px] top-[44px] bottom-0 w-px bg-[#D4AF37]/10" />}
                    </div>
                  ))}
                </div>

                <div className="p-5 border-t border-[#D4AF37]/10">
                  <Link href={`/projects/${property.slug}`} className="inline-flex items-center justify-center w-full h-10 rounded-lg border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 text-sm font-medium transition-colors">
                    View Full Details
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
