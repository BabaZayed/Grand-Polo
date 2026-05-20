"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PHONE_NUMBER, WHATSAPP_LINK } from "@/lib/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Properties" },
  { href: "/masterplan", label: "Masterplan" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#070B14]/95 backdrop-blur-xl shadow-lg border-b border-[#C9A84C]/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex flex-col">
              <span className="font-heading text-xl sm:text-2xl font-bold tracking-[0.2em] text-[#C9A84C]">
                GRAND POLO
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.3em] text-[#8B8678] -mt-1">
                CLUB &amp; RESORT
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-sans px-4 py-2 text-sm tracking-wide transition-colors duration-300 rounded-md ${
                    pathname === link.href
                      ? "text-[#C9A84C]"
                      : "text-[#FAF6F0]/70 hover:text-[#C9A84C]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="hidden sm:flex items-center gap-2 text-[#FAF6F0]/70 hover:text-[#C9A84C] text-sm transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden md:inline">{PHONE_NUMBER}</span>
              </a>
              <Link href="/contact">
                <Button className="gold-gradient text-[#070B14] font-semibold text-sm px-5 py-2 rounded-md hover:opacity-90 transition-opacity hidden sm:flex">
                  Enquire Now
                </Button>
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-[#FAF6F0] hover:text-[#C9A84C] transition-colors"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        {/* Gold divider line */}
        {scrolled && <div className="gold-divider opacity-30" />}
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
            <div className="absolute top-16 left-0 right-0 bg-[#070B14] border-t border-[#C9A84C]/20 shadow-2xl max-h-[80vh] overflow-y-auto">
              <nav className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 rounded-md transition-colors text-base min-h-[44px] flex items-center ${
                      pathname === link.href
                        ? "text-[#C9A84C] bg-[#C9A84C]/5"
                        : "text-[#FAF6F0]/70 hover:text-[#C9A84C] hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4 pt-4 border-t border-[#C9A84C]/15 px-4">
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-400 mb-4">
                    WhatsApp: {PHONE_NUMBER}
                  </a>
                  <Link href="/contact" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full gold-gradient text-[#070B14] font-semibold py-3 rounded-md">
                      Enquire Now
                    </Button>
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
