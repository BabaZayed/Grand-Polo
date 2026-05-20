"use client";

import { motion } from "framer-motion";
import { faqs } from "@/lib/data";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
  return (
    <section className="py-16 lg:py-24 bg-[#0C1220] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <span className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase font-medium">
            Common Questions
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF6F0] mt-3 mb-4">
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
                className="glass-card rounded-lg border-0 px-5 data-[state=open]:border-[#C9A84C]/20 transition-all"
              >
                <AccordionTrigger className="text-[#FAF6F0] font-heading text-left hover:text-[#C9A84C] hover:no-underline py-4 text-sm lg:text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#8B8678] text-sm leading-relaxed pb-4">
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
