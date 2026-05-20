"use client";

import { faqs } from "@/lib/data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";

export default function FAQContent() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const qaLd = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(qaLd) }} />

      <section className="py-16 lg:py-20 bg-[#5D3A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <Accordion className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`} className="rounded-lg border border-[#D4AF37]/15 bg-[#3D2510]/50 px-5">
                <AccordionTrigger className="text-[#FFFAF3] font-heading text-left hover:text-[#D4AF37] hover:no-underline py-4 text-sm lg:text-base">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-[#8B6B47] text-sm leading-relaxed pb-4">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-[#2A1506]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#FFFAF3] mb-4">Still Have Questions?</h2>
          <p className="text-[#8B6B47] max-w-xl mx-auto mb-8">Our property consultants are ready to answer any questions about Grand Polo Club & Resort.</p>
          <Link href="/contact" className="inline-flex items-center justify-center h-12 px-8 gold-gradient text-[#2A1506] font-bold text-sm rounded-lg hover:opacity-90 transition-opacity">Contact Us</Link>
        </div>
      </section>
    </>
  );
}
