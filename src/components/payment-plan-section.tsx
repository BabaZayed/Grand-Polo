"use client";

import { motion } from "framer-motion";
import { getAvailableProjects, paymentPlans, formatPrice } from "@/lib/data";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

// Parse milestone date string like "Jul 2025" → Date (last day of that month)
function parseMilestoneDate(dateStr: string): Date | null {
  if (dateStr === "On Booking" || dateStr === "On Completion") return null;
  const match = dateStr.match(/^(\w{3})\s+(\d{4})$/);
  if (!match) return null;
  const months: Record<string, number> = { Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11 };
  const month = months[match[1]];
  const year = parseInt(match[2]);
  if (month === undefined) return null;
  return new Date(year, month + 1, 0); // Last day of that month
}

export default function PaymentPlanSection() {
  const properties = getAvailableProjects();
  const today = new Date();

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
          <p className="text-[#B89B6E] max-w-2xl mx-auto">
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
                  {milestones.map((milestone, mi) => {
                    const milestoneDate = parseMilestoneDate(milestone.date);
                    const isCompleted = milestoneDate ? milestoneDate < today : mi === 0;
                    return (
                      <div key={mi} className="relative">
                        <div className="flex items-center gap-4 py-3">
                          <div className="relative z-10">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${isCompleted ? "bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30" : mi === milestones.length - 1 ? "bg-[#B89B6E] text-[#FFFAF3]" : mi === 0 ? "gold-gradient text-[#2A1506]" : "bg-[#2A1506] border border-[#D4AF37]/30 text-[#D4AF37]"}`}>
                              {milestone.percentage}%
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium ${isCompleted ? "text-[#B89B6E] line-through decoration-[#D4AF37]/30" : "text-[#FFFAF3]"}`}>
                              {milestone.label}
                            </p>
                            <p className="text-xs">
                              {isCompleted ? (
                                <span className="text-[#D4AF37]">Completed</span>
                              ) : (
                                <span className="text-[#B89B6E]">{milestone.date}</span>
                              )}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className={`text-xs shrink-0 ${isCompleted ? "border-[#D4AF37]/30 text-[#D4AF37]" : mi === 0 ? "border-[#D4AF37]/30 text-[#D4AF37]" : mi === milestones.length - 1 ? "border-[#B89B6E]/30 text-[#B89B6E]" : "border-[#B89B6E]/20 text-[#B89B6E]"}`}
                          >
                            {isCompleted ? "Paid" : mi === 0 ? "Booking" : mi === milestones.length - 1 ? "Completion" : "Instalment"}
                          </Badge>
                        </div>
                        {mi < milestones.length - 1 && <div className={`absolute left-[15px] top-[44px] bottom-0 w-px ${isCompleted ? "bg-[#D4AF37]/20" : "bg-[#D4AF37]/10"}`} />}
                      </div>
                    );
                  })}
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
