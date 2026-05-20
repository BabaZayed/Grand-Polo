"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, Loader2, CheckCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PHONE_NUMBER, WHATSAPP_LINK, EMAIL, projects } from "@/lib/data";
import { trackLead } from "@/lib/meta-pixel";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", propertyInterest: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, formType: "contact" }),
      });
      if (!res.ok) throw new Error("Submission failed");
      trackLead({ formType: "contact", propertyInterest: form.propertyInterest });
      setIsSuccess(true);
      setForm({ name: "", email: "", phone: "", message: "", propertyInterest: "" });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#070B14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-3"
          >
            Get In Touch
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#FAF6F0] mb-4"
          >
            Begin Your <span className="gold-text">Equestrian</span> Journey
          </motion.h2>
          <div className="gold-divider max-w-xs mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="glass-card rounded-xl p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#8B8678] text-xs mb-1 block">Full Name</label>
                  <Input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="bg-[#0C1220] border-[#C9A84C]/20 text-[#FAF6F0] placeholder:text-[#8B8678]/50"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-[#8B8678] text-xs mb-1 block">Email</label>
                  <Input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="bg-[#0C1220] border-[#C9A84C]/20 text-[#FAF6F0] placeholder:text-[#8B8678]/50"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#8B8678] text-xs mb-1 block">Phone</label>
                  <Input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="bg-[#0C1220] border-[#C9A84C]/20 text-[#FAF6F0] placeholder:text-[#8B8678]/50"
                    placeholder="+971 XX XXX XXXX"
                  />
                </div>
                <div>
                  <label className="text-[#8B8678] text-xs mb-1 block">Property Interest</label>
                  <select
                    value={form.propertyInterest}
                    onChange={(e) => setForm({ ...form, propertyInterest: e.target.value })}
                    className="w-full h-9 rounded-md border border-[#C9A84C]/20 bg-[#0C1220] text-[#FAF6F0] text-sm px-3"
                  >
                    <option value="">Select a property</option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[#8B8678] text-xs mb-1 block">Message</label>
                <Textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="bg-[#0C1220] border-[#C9A84C]/20 text-[#FAF6F0] placeholder:text-[#8B8678]/50 min-h-[100px]"
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
                className="gold-gradient text-[#070B14] font-semibold px-8 py-3 rounded-md text-sm w-full hover:opacity-90 transition-opacity"
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

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-heading text-lg text-[#C9A84C] mb-4">Contact Information</h3>
              <div className="space-y-4">
                <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-3 text-[#FAF6F0]/80 hover:text-[#C9A84C] transition-colors">
                  <Phone className="w-5 h-5 text-[#C9A84C]" /> {PHONE_NUMBER}
                </a>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-[#FAF6F0]/80 hover:text-[#C9A84C] transition-colors">
                  <Mail className="w-5 h-5 text-[#C9A84C]" /> {EMAIL}
                </a>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-green-400 hover:text-green-300 transition-colors">
                  <MessageCircle className="w-5 h-5" /> WhatsApp
                </a>
                <div className="flex items-start gap-3 text-[#FAF6F0]/80">
                  <MapPin className="w-5 h-5 text-[#C9A84C] mt-0.5" /> Grand Polo Club & Resort, Near Al Maktoum Int&apos;l Airport, Dubai, UAE
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="glass-card rounded-xl overflow-hidden">
              <iframe
                title="Grand Polo Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14430.5!2d55.1!3d24.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sGrand+Polo+Club+Dubai!5e0!3m2!1sen!2sae!4v1"
                width="100%"
                height="250"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Golden Visa Badge */}
            <div className="glass-card rounded-xl p-6 text-center gold-border">
              <p className="font-heading text-lg text-[#C9A84C] mb-2">Golden Visa Eligible</p>
              <p className="text-[#8B8678] text-sm">All properties at Grand Polo qualify for the UAE 10-Year Golden Visa with family sponsorship</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
