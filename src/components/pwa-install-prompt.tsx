"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fbqTrackCustom } from "@/lib/meta-pixel";

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!localStorage.getItem("gp-pwa-dismissed")) {
        setTimeout(() => setShow(true), 3000);
      }
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = () => {
    if (!deferredPrompt) return;
    (deferredPrompt as unknown as { prompt: () => void }).prompt();
    fbqTrackCustom("PWA_Install");
    localStorage.setItem("gp-pwa-installed", "true");
    setShow(false);
  };

  const handleDismiss = () => {
    localStorage.setItem("gp-pwa-dismissed", "true");
    setDismissed(true);
    setShow(false);
  };

  if (dismissed || !show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-20 right-4 z-30 max-w-xs"
        >
          <div className="bg-[#0C1220]/95 backdrop-blur-xl border border-[#C9A84C]/20 rounded-xl p-4 shadow-2xl">
            <button onClick={handleDismiss} aria-label="Dismiss install prompt" className="absolute top-2 right-2 w-11 h-11 flex items-center justify-center text-[#8B8678] hover:text-[#FAF6F0]">
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3 mb-3">
              <Smartphone className="w-5 h-5 text-[#C9A84C]" />
              <p className="text-[#FAF6F0] text-sm font-medium">Install Grand Polo</p>
            </div>
            <p className="text-[#8B8678] text-xs mb-3">Quick access to properties and updates</p>
            <div className="flex gap-2">
              <Button onClick={handleInstall} className="gold-gradient text-[#070B14] font-semibold text-xs px-4 py-1.5 rounded-md hover:opacity-90">
                Install
              </Button>
              <Button onClick={handleDismiss} variant="outline" className="border-[#C9A84C]/20 text-[#8B8678] text-xs px-4 py-1.5 rounded-md hover:bg-white/5">
                Dismiss
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
