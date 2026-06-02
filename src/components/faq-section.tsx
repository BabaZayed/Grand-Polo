"use client";

import { motion } from "framer-motion";
import { faqs } from "@/lib/data";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
  return (
    <section className="py-16 lg:py-24 bg-[#3D2510] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium">
            Common Questions
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFFAF3] mt-3 mb-4">
            Frequently Asked <span className="gold-text">Questions</span>
          </h2>
          <div className="gold-divider max-w-xs mx-auto mb-4" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="rounded-lg border border-[#D4AF37]/15 bg-[#2A1506]/50 px-5 data-[state=open]:border-[#D4AF37]/25 transition-all"
              >
                <AccordionTrigger className="text-[#FFFAF3] font-heading text-left hover:text-[#D4AF37] hover:no-underline py-4 text-sm lg:text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#B89B6E] text-sm leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
