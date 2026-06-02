"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trackLead, getFbp, getFbc } from "@/lib/meta-pixel";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setError("");
    try {
      // Generate eventId for Meta deduplication
      const eventId = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const fbp = getFbp();
      const fbc = getFbc();

      // Track client-side Lead event with same eventId
      trackLead({ formType: "newsletter", eventId });

      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, formType: "newsletter", eventId, fbp, fbc }),
      });
      setIsSuccess(true);
      setEmail("");
      setTimeout(() => setIsSuccess(false), 4000);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-[#3D2510] border-y border-[#D4AF37]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-3"
          >
            Stay Updated
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-2xl sm:text-3xl md:text-4xl text-[#FFFAF3] mb-3"
          >
            Get Exclusive <span className="gold-text">Updates</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-[#B89B6E] text-sm mb-6"
          >
            Be the first to receive Grand Polo launch updates, investment insights, and priority access notifications.
          </motion.p>
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <Input
              id="newsletter-email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-[#2A1506] border-[#D4AF37]/20 text-[#FFFAF3] placeholder:text-[#B89B6E]/50 text-base sm:text-sm flex-1 focus:border-[#D4AF37]/50"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="gold-gradient text-[#2A1506] font-semibold text-sm px-6 hover:opacity-90 transition-opacity gold-shimmer-hover"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : isSuccess ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="w-4 h-4" /> Subscribe
                </span>
              )}
            </Button>
          </motion.form>
          {isSuccess && (
            <p className="text-green-400 text-sm mt-3">Thank you for subscribing!</p>
          )}
          {error && (
            <p className="text-red-400 text-sm mt-3">{error}</p>
          )}
        </div>
      </div>
    </section>
  );
}
