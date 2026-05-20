"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, ExternalLink, Send, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PHONE_NUMBER, WHATSAPP_LINK, EMAIL, projects } from "@/lib/data";
import { trackLead } from "@/lib/meta-pixel";
import Link from "next/link";

export default function SiteFooter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, formType: "newsletter" }),
      });
      trackLead({ formType: "newsletter", propertyInterest: "Newsletter" });
      setIsSuccess(true);
      setEmail("");
      setTimeout(() => setIsSuccess(false), 3000);
    } catch {
      // Error handled silently
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#050810] border-t border-[#C9A84C]/10">
      {/* Gold divider */}
      <div className="gold-divider opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex flex-col mb-4">
              <span className="font-heading text-2xl font-bold tracking-[0.2em] text-[#C9A84C]">GRAND POLO</span>
              <span className="text-[10px] tracking-[0.3em] text-[#8B8678]">CLUB &amp; RESORT</span>
            </Link>
            <p className="text-[#8B8678] text-sm leading-relaxed mb-4 max-w-md">
              Grand Polo Club & Resort by Emaar Properties — Dubai&apos;s premier equestrian community featuring 3 polo fields, a luxury clubhouse, private stables, and 6,661 residences.
            </p>
            <p className="text-[#8B8678] text-xs">
              Also explore:{" "}
              <a href="https://oasisemaar.com" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] hover:underline">
                The Oasis by Emaar
              </a>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-[#C9A84C] text-sm tracking-wide mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "Properties", "Masterplan", "Gallery", "About", "Contact", "FAQ", "Blog"].map((link) => (
                <li key={link}>
                  <Link href={link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "-")}`} className="text-[#8B8678] text-sm hover:text-[#C9A84C] transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Properties */}
          <div>
            <h4 className="font-heading text-[#C9A84C] text-sm tracking-wide mb-4">Properties</h4>
            <ul className="space-y-2">
              {projects.filter((p) => p.status !== "Launching Soon").map((p) => (
                <li key={p.id}>
                  <Link href={`/projects/${p.slug}`} className="text-[#8B8678] text-sm hover:text-[#C9A84C] transition-colors">
                    {p.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/projects" className="text-[#C9A84C] text-sm hover:underline">View All →</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-[#C9A84C] text-sm tracking-wide mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-2 text-[#8B8678] text-sm hover:text-[#C9A84C] transition-colors">
                  <Phone className="w-4 h-4" /> {PHONE_NUMBER}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 text-[#8B8678] text-sm hover:text-[#C9A84C] transition-colors">
                  <Mail className="w-4 h-4" /> {EMAIL}
                </a>
              </li>
              <li>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-400 text-sm hover:text-green-300 transition-colors">
                  WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-2 text-[#8B8678] text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" /> Grand Polo Club & Resort, Dubai, UAE
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-[#C9A84C]/10">
              <h5 className="text-[#8B8678] text-xs tracking-wide mb-2">Trusted Resources</h5>
              {[
                { name: "Emaar Properties", url: "https://www.emaar.com" },
                { name: "Dubai Land Dept", url: "https://www.dubailand.gov.ae" },
                { name: "RERA Dubai", url: "https://www.rpdubai.ae" },
              ].map((r) => (
                <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#8B8678] text-xs hover:text-[#C9A84C] transition-colors mb-1">
                  <ExternalLink className="w-3 h-3" /> {r.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-[#C9A84C]/15">
          <div className="max-w-md mx-auto text-center">
            <h4 className="font-heading text-[#C9A84C] text-sm tracking-wide mb-2">Stay Updated</h4>
            <p className="text-[#8B8678] text-xs mb-3">Get exclusive Grand Polo launch updates and investment insights.</p>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#0C1220] border-[#C9A84C]/20 text-[#FAF6F0] placeholder:text-[#8B8678] text-sm flex-1"
              />
              <Button type="submit" disabled={isSubmitting} className="gold-gradient text-[#070B14] font-semibold text-sm px-4 hover:opacity-90">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : isSuccess ? <CheckCircle className="w-4 h-4" /> : <Send className="w-4 h-4" />}
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-[#C9A84C]/10 text-center">
          <p className="text-[#8B8678] text-xs">
            © {new Date().getFullYear()} Grand Polo Club & Resort. All rights reserved. |{" "}
            <Link href="/privacy" className="hover:text-[#C9A84C]">Privacy</Link> |{" "}
            <Link href="/terms" className="hover:text-[#C9A84C]">Terms</Link> |{" "}
            <Link href="/disclaimer" className="hover:text-[#C9A84C]">Disclaimer</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
