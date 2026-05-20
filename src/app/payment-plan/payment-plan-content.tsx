"use client";

import { getAvailableProjects, paymentPlans, formatPrice, faqs } from "@/lib/data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";

export default function PaymentPlanContent() {
  const properties = getAvailableProjects();

  return (
    <>
      <section className="py-16 lg:py-20 bg-[#5D3A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {properties.map((property) => {
              const milestones = paymentPlans[property.slug] || [];
              return (
                <div key={property.slug} className="rounded-xl overflow-hidden border border-[#D4AF37]/15 bg-[#3D2510]/50">
                  <div className="bg-[#2A1506]/50 p-5 border-b border-[#D4AF37]/10">
                    <h3 className="font-heading text-lg font-bold text-[#FFFAF3]">{property.name}</h3>
                    <p className="text-[#D4AF37] text-sm mt-1">From {formatPrice(property.startingPrice)}</p>
                    <p className="text-[#8B6B47] text-xs mt-1">{property.paymentPlan}</p>
                  </div>
                  <div className="p-5">
                    {milestones.length > 0 && (
                      <div className="flex h-3 rounded-full overflow-hidden mb-5 bg-[#2A1506]">
                        {milestones.map((m, i) => (
                          <div key={i} className={`${i === 0 ? "bg-[#D4AF37]" : i === milestones.length - 1 ? "bg-[#8B6B47]" : "bg-[#D4AF37]/40"}`} style={{ width: `${m.percentage}%` }} />
                        ))}
                      </div>
                    )}
                    <div className="space-y-0">
                      {milestones.map((milestone, mi) => (
                        <div key={mi} className="relative">
                          <div className="flex items-center gap-3 py-2.5">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${mi === 0 ? "gold-gradient text-[#2A1506]" : mi === milestones.length - 1 ? "bg-[#8B6B47] text-[#FFFAF3]" : "bg-[#2A1506] border border-[#D4AF37]/30 text-[#D4AF37]"}`}>
                              {milestone.percentage}%
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[#FFFAF3] text-sm font-medium">{milestone.label}</p>
                              <p className="text-[#8B6B47] text-xs">{milestone.date}</p>
                            </div>
                          </div>
                          {mi < milestones.length - 1 && <div className="absolute left-[15px] top-[36px] bottom-0 w-px bg-[#D4AF37]/10" />}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-5 border-t border-[#D4AF37]/10">
                    <Link href={`/projects/${property.slug}`} className="inline-flex items-center justify-center w-full h-10 rounded-lg border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 text-sm font-medium transition-colors">
                      View Full Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded-xl p-8 max-w-2xl mx-auto text-center border border-[#D4AF37]/15 bg-[#3D2510]/50">
            <h3 className="font-heading text-xl font-bold text-[#FFFAF3] mb-4">Payment Structure Summary</h3>
            <div className="grid grid-cols-3 gap-6 mb-4">
              <div>
                <p className="text-[#D4AF37] font-heading text-2xl font-bold">10%</p>
                <p className="text-[#8B6B47] text-sm mt-1">Down Payment</p>
                <p className="text-[#8B6B47]/60 text-xs">On Booking</p>
              </div>
              <div>
                <p className="text-[#D4AF37] font-heading text-2xl font-bold">10%</p>
                <p className="text-[#8B6B47] text-sm mt-1">Per Milestone</p>
                <p className="text-[#8B6B47]/60 text-xs">Every 6-12 Months</p>
              </div>
              <div>
                <p className="text-[#8B6B47] font-heading text-2xl font-bold">20%</p>
                <p className="text-[#8B6B47] text-sm mt-1">On Completion</p>
                <p className="text-[#8B6B47]/60 text-xs">At Handover</p>
              </div>
            </div>
            <p className="text-[#8B6B47] text-sm">
              All payment plans are construction-linked — you only pay as the developer delivers. No interest charged during the construction period.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-[#2A1506]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#FFFAF3] mb-8">Payment Plan FAQ</h2>
          <Accordion className="space-y-3">
            {faqs.filter((f) => f.question.toLowerCase().includes("payment") || f.question.toLowerCase().includes("price") || f.question.toLowerCase().includes("golden visa")).map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`} className="rounded-lg border border-[#D4AF37]/15 bg-[#3D2510]/50 px-5">
                <AccordionTrigger className="text-[#FFFAF3] font-heading text-left hover:text-[#D4AF37] hover:no-underline py-4 text-sm lg:text-base">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-[#8B6B47] text-sm leading-relaxed pb-4">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-[#5D3A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#FFFAF3] mb-4">Ready to Get Started?</h2>
          <p className="text-[#8B6B47] max-w-xl mx-auto mb-8">Speak with our property consultants to find the right payment plan for your investment goals.</p>
          <Link href="/contact" className="inline-flex items-center justify-center h-12 px-8 gold-gradient text-[#2A1506] font-bold text-sm rounded-lg hover:opacity-90 transition-opacity">Contact Us Today</Link>
        </div>
      </section>
    </>
  );
}
