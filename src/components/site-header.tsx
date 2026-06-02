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
  { href: "/brochures", label: "Brochures" },
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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#2A1506]/95 backdrop-blur-xl shadow-lg border-b border-[#D4AF37]/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex flex-col">
              <span className="font-heading text-xl sm:text-2xl font-bold tracking-[0.2em] text-[#D4AF37]">
                GRAND POLO
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.3em] text-[#B89B6E] -mt-1">
                CLUB &amp; RESORT
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-sans px-4 py-2 text-sm tracking-wide transition-all duration-300 rounded-md relative group ${
                    pathname === link.href
                      ? "text-[#D4AF37]"
                      : "text-[#FFFAF3]/70 hover:text-[#D4AF37]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-[#D4AF37] transition-all duration-300 ${
                      pathname === link.href ? "w-3/4" : "w-0 group-hover:w-3/4"
                    }`}
                  />
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="hidden sm:flex items-center gap-2 text-[#FFFAF3]/70 hover:text-[#D4AF37] text-sm transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden md:inline">{PHONE_NUMBER}</span>
              </a>
              <Link href="/contact">
                <Button className="gold-gradient text-[#2A1506] font-semibold text-sm px-5 py-2 rounded-md hover:opacity-90 transition-opacity flex gold-shimmer-hover">
                  Book Viewing
                </Button>
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-[#FFFAF3] hover:text-[#D4AF37] transition-colors"
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        {/* Gold divider line on scroll */}
        {scrolled && <div className="gold-divider opacity-30" />}
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-[#2A1506]/80" onClick={() => setMobileOpen(false)} />
            <div className="absolute top-0 right-0 bottom-0 w-[280px] bg-[#2A1506] shadow-2xl" id="mobile-menu" role="dialog" aria-label="Navigation menu">
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <span className="font-heading text-lg font-bold tracking-[0.15em] text-[#D4AF37]">GRAND POLO</span>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-2 text-[#FFFAF3]/70 hover:text-[#D4AF37] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`px-4 py-3 rounded-md transition-colors text-base min-h-[44px] flex items-center border-l-2 ${
                          pathname === link.href
                            ? "text-[#D4AF37] bg-[#D4AF37]/5 border-[#D4AF37]"
                            : "text-[#FFFAF3]/70 hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 border-transparent"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
                <div className="mt-8 pt-6 border-t border-[#D4AF37]/15">
                  <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-2 text-[#FFFAF3]/70 hover:text-[#D4AF37] text-sm mb-3 transition-colors">
                    <Phone className="w-4 h-4" /> {PHONE_NUMBER}
                  </a>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-400 mb-4 text-sm">
                    WhatsApp
                  </a>
                  <Link href="/contact" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full gold-gradient text-[#2A1506] font-semibold py-3 rounded-md gold-shimmer-hover">
                      Book Viewing
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
