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

      {/* FAQ Accordion */}
      <section className="py-16 lg:py-20 bg-[#0C1220]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <Accordion className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="glass-card rounded-lg border-0 px-5"
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
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-[#070B14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#FAF6F0] mb-4">
            Still Have Questions?
          </h2>
          <p className="text-[#8B8678] max-w-xl mx-auto mb-8">
            Our property consultants are ready to answer any questions about Grand Polo Club & Resort — from pricing and payment plans to location and lifestyle.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-12 px-8 gold-gradient text-[#070B14] font-bold text-sm rounded-lg hover:opacity-90 transition-opacity"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
