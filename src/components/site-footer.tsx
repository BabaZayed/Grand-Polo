"use client";

import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import { PHONE_NUMBER, WHATSAPP_LINK, EMAIL, projects } from "@/lib/data";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-[#2A1506] border-t border-[#D4AF37]/10">
      {/* Gold divider */}
      <div className="gold-divider opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex flex-col mb-4">
              <span className="font-heading text-2xl font-bold tracking-[0.2em] text-[#D4AF37]">GRAND POLO</span>
              <span className="text-[10px] tracking-[0.3em] text-[#B89B6E]">CLUB &amp; RESORT</span>
            </Link>
            <p className="text-[#B89B6E] text-sm leading-relaxed mb-4 max-w-md">
              Grand Polo Club & Resort by Emaar Properties — Dubai&apos;s premier equestrian community featuring 3 polo fields, a luxury clubhouse, private stables, and 6,661 residences.
            </p>
            <div className="mt-3 space-y-1">
              <p className="text-[#B89B6E] text-xs font-semibold tracking-wide mb-1">Explore More Properties</p>
              <a href="https://www.oasisemaar.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#D4AF37] text-sm hover:underline">
                <ExternalLink className="w-3 h-3" /> The Oasis by Emaar — oasisemaar.com
              </a>
              <p className="text-[#B89B6E] text-[10px] mt-2">
                Also accessible at:{" "}
                <a href="https://theoasisemaar.com" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37]/70 hover:text-[#D4AF37] hover:underline">
                  theoasisemaar.com
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-[#D4AF37] text-sm tracking-wide mb-4">Quick Links</h4>
            <div className="gold-divider max-w-[60px] mb-4" />
            <ul className="space-y-2">
              {["Home", "Properties", "Masterplan", "Gallery", "About", "Contact", "FAQ", "Blog"].map((link) => (
                <li key={link}>
                  <Link href={link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "-")}`} className="text-[#B89B6E] text-sm hover:text-[#D4AF37] transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Properties */}
          <div>
            <h4 className="font-heading text-[#D4AF37] text-sm tracking-wide mb-4">Properties</h4>
            <div className="gold-divider max-w-[60px] mb-4" />
            <ul className="space-y-2">
              {projects.filter((p) => p.status !== "Launching Soon").map((p) => (
                <li key={p.id}>
                  <Link href={`/projects/${p.slug}`} className="text-[#B89B6E] text-sm hover:text-[#D4AF37] transition-colors">
                    {p.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/projects" className="text-[#D4AF37] text-sm hover:underline">View All →</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-[#D4AF37] text-sm tracking-wide mb-4">Contact</h4>
            <div className="gold-divider max-w-[60px] mb-4" />
            <ul className="space-y-3">
              <li>
                <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-2 text-[#B89B6E] text-sm hover:text-[#D4AF37] transition-colors">
                  <Phone className="w-4 h-4" /> {PHONE_NUMBER}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 text-[#B89B6E] text-sm hover:text-[#D4AF37] transition-colors">
                  <Mail className="w-4 h-4" /> {EMAIL}
                </a>
              </li>
              <li>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-400 text-sm hover:text-green-300 transition-colors">
                  WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-2 text-[#B89B6E] text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" /> Grand Polo Club & Resort, Dubai, UAE
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-[#D4AF37]/10">
              <h5 className="text-[#B89B6E] text-xs tracking-wide mb-2">Trusted Resources</h5>
              {[
                { name: "Emaar Properties", url: "https://www.emaar.com" },
                { name: "Dubai Land Dept", url: "https://www.dubailand.gov.ae" },
                { name: "RERA Dubai", url: "https://www.rpdubai.ae" },
              ].map((r) => (
                <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#B89B6E] text-xs hover:text-[#D4AF37] transition-colors mb-1">
                  <ExternalLink className="w-3 h-3" /> {r.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-[#D4AF37]/10 text-center">
          <p className="text-[#B89B6E] text-xs">
            © {new Date().getFullYear()} Grand Polo Club & Resort. All rights reserved. |{" "}
            <Link href="/privacy" className="hover:text-[#D4AF37]">Privacy</Link> |{" "}
            <Link href="/terms" className="hover:text-[#D4AF37]">Terms</Link> |{" "}
            <Link href="/disclaimer" className="hover:text-[#D4AF37]">Disclaimer</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
