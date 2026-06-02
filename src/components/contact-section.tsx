"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, Loader2, CheckCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PHONE_NUMBER, WHATSAPP_LINK, EMAIL, projects } from "@/lib/data";
import { trackLead, getFbp, getFbc } from "@/lib/meta-pixel";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", propertyInterest: "", website: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      // Generate eventId for Meta deduplication
      const eventId = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      
      // Get Meta cookies for CAPI matching (critical for attribution)
      const fbp = getFbp();
      const fbc = getFbc();
      
      // Track client-side event with same eventId for deduplication
      trackLead({ formType: "contact", propertyInterest: form.propertyInterest, eventId });

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, formType: "contact", eventId, fbp, fbc }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setIsSuccess(true);
      setForm({ name: "", email: "", phone: "", message: "", propertyInterest: "", website: "" });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="luxury-section-padding bg-[#5D3A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-3"
          >
            Get In Touch
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#FFFAF3] mb-4"
          >
            Schedule a <span className="gold-text">Private Viewing</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="gold-divider max-w-xs mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Contact Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="rounded-xl p-6 border border-[#D4AF37]/15 bg-[#3D2510]/50">
              <h3 className="font-heading text-lg text-[#D4AF37] mb-4">Contact Information</h3>
              <div className="space-y-4">
                <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-3 text-[#FFFAF3]/80 hover:text-[#D4AF37] transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  {PHONE_NUMBER}
                </a>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-[#FFFAF3]/80 hover:text-[#D4AF37] transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  {EMAIL}
                </a>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-green-400 hover:text-green-300 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-green-400" />
                  </div>
                  WhatsApp
                </a>
                <div className="flex items-start gap-3 text-[#FFFAF3]/80">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  Grand Polo Club & Resort, Near Al Maktoum Int&apos;l Airport, Dubai, UAE
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-xl overflow-hidden border border-[#D4AF37]/15">
              <iframe
                title="Grand Polo Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14430.5!2d55.1!3d24.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sGrand+Polo+Club+Dubai!5e0!3m2!1sen!2sae!4v1"
                width="100%"
                height="220"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)" }}
                sandbox="allow-scripts allow-same-origin allow-popups"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Golden Visa Badge */}
            <div className="rounded-xl p-6 text-center border border-[#D4AF37]/30 bg-[#3D2510]/50">
              <p className="font-heading text-lg text-[#D4AF37] mb-2">Golden Visa Eligible</p>
              <p className="text-[#B89B6E] text-sm">All properties at Grand Polo qualify for the UAE 10-Year Golden Visa with family sponsorship</p>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="rounded-xl p-8 border border-[#D4AF37]/15 bg-[#3D2510]/50 space-y-5">
              {/* Honeypot — hidden from users, bots auto-fill this */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="contact-website">Website</label>
                <input
                  type="text"
                  id="contact-website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website || ""}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="text-[#B89B6E] text-xs mb-1 block">Full Name</label>
                  <Input
                    id="contact-name"
                    name="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="bg-[#2A1506] border-[#D4AF37]/20 text-[#FFFAF3] placeholder:text-[#D4C4A0] focus:border-[#D4AF37]/50 text-base"
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="text-[#B89B6E] text-xs mb-1 block">Email</label>
                  <Input
                    id="contact-email"
                    name="email"
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="bg-[#2A1506] border-[#D4AF37]/20 text-[#FFFAF3] placeholder:text-[#D4C4A0] focus:border-[#D4AF37]/50 text-base"
                    placeholder="your@email.com"
                    autoComplete="email"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-phone" className="text-[#B89B6E] text-xs mb-1 block">Phone</label>
                  <Input
                    id="contact-phone"
                    name="phone"
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="bg-[#2A1506] border-[#D4AF37]/20 text-[#FFFAF3] placeholder:text-[#D4C4A0] focus:border-[#D4AF37]/50 text-base"
                    placeholder="+971 XX XXX XXXX"
                    autoComplete="tel"
                  />
                </div>
                <div>
                  <label htmlFor="contact-property" className="text-[#B89B6E] text-xs mb-1 block">Property Interest</label>
                  <select
                    id="contact-property"
                    name="propertyInterest"
                    value={form.propertyInterest}
                    onChange={(e) => setForm({ ...form, propertyInterest: e.target.value })}
                    className="w-full h-11 sm:h-9 rounded-md border border-[#D4AF37]/20 bg-[#2A1506] text-[#FFFAF3] text-base sm:text-sm px-3 focus:border-[#D4AF37]/50"
                  >
                    <option value="">Select a property</option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="contact-message" className="text-[#B89B6E] text-xs mb-1 block">Message</label>
                <Textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="bg-[#2A1506] border-[#D4AF37]/20 text-[#FFFAF3] placeholder:text-[#D4C4A0] min-h-[100px] focus:border-[#D4AF37]/50 text-base"
                  placeholder="Tell us about your requirements..."
                />
              </div>
              {error && <p className="text-red-400 text-sm">{error}</p>}
              {isSuccess && (
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <CheckCircle className="w-4 h-4" /> Thank you! We&apos;ll be in touch shortly.
                </div>
              )}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="gold-gradient text-[#2A1506] font-semibold px-8 py-3 rounded-md text-sm w-full hover:opacity-90 transition-opacity gold-shimmer-hover"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                ) : (
                  <span className="flex items-center gap-2 justify-center">
                    <Send className="w-4 h-4" /> Submit Enquiry
                  </span>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
