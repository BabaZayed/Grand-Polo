"use client";

import { useState } from "react";
import Image from "next/image";
import { Download, Maximize } from "lucide-react";
import MasterplanImageModal from "@/components/masterplan-image-modal";

const masterplanImages = [
  { src: "/images/floorplans/masterplan-fp-2.webp", alt: "Grand Polo Masterplan — Community Layout Overview" },
  { src: "/images/floorplans/masterplan-fp-3.webp", alt: "Grand Polo Masterplan — Cluster Detail View" },
  { src: "/images/floorplans/masterplan-fp-4.webp", alt: "Grand Polo Masterplan — Amenities Map" },
  { src: "/images/floorplans/masterplan-fp-5.webp", alt: "Grand Polo Masterplan — Green Core Detail" },
  { src: "/images/floorplans/masterplan-fp-6.webp", alt: "Grand Polo Masterplan — Connectivity Map" },
];

export default function MasterplanImageSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const primaryImage = masterplanImages[0];

  return (
    <>
      <section className="py-16 lg:py-20 bg-[#2A1506]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium">Community Layout</span>
          <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#FFFAF3] mt-2 mb-4">Master Plan Overview</h2>
          <div className="gold-divider max-w-xs mb-6" />
          <p className="text-[#B89B6E] max-w-3xl mb-8 leading-relaxed">
            Explore the community layout of Grand Polo Club & Resort — a visionary masterplan with 22 residential clusters, 3 polo fields, and world-class amenities, all connected through landscaped corridors and walking paths.
          </p>

          {/* Master Plan Image Display */}
          <div className="rounded-xl overflow-hidden border border-[#D4AF37]/20 bg-[#3D2510]/50">
            {/* Image */}
            <div
              className="relative w-full aspect-[3/2] bg-white cursor-pointer group"
              onClick={() => setModalOpen(true)}
            >
              <Image
                src={primaryImage.src}
                alt={primaryImage.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#2A1506]/20">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2A1506]/80 border border-[#D4AF37]/40 backdrop-blur-sm">
                  <Maximize className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-[#D4AF37] text-sm font-medium">View Full Size</span>
                </div>
              </div>
              {/* Image count badge */}
              {masterplanImages.length > 1 && (
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded text-xs font-bold bg-[#2A1506]/90 border border-[#D4AF37]/30 text-[#D4AF37]">
                  {masterplanImages.length} views
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-4 border-t border-[#D4AF37]/10 bg-[#2A1506]/80">
              <div className="flex-1">
                <p className="text-[#FFFAF3] text-sm font-medium">{primaryImage.alt}</p>
                <p className="text-[#B89B6E] text-xs">{masterplanImages.length} layout views available</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => setModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 text-sm font-medium transition-colors"
                >
                  <Maximize className="w-4 h-4" /> View Full Size
                </button>
                <a
                  href="/api/download?type=floorplan&file=grand-polo-masterplan-floorplan.pdf"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg gold-gradient text-[#2A1506] font-bold text-sm hover:opacity-90 transition-opacity"
                >
                  <Download className="w-4 h-4" /> Download Community Layout
                </a>
              </div>
            </div>
          </div>

          {/* Thumbnail Strip */}
          {masterplanImages.length > 1 && (
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
              {masterplanImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setModalOpen(true)}
                  className="relative w-24 h-16 rounded-lg overflow-hidden border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all shrink-0"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="96px"
                    className="object-contain bg-white/90"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Masterplan Image Modal */}
      <MasterplanImageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        images={masterplanImages}
      />
    </>
  );
}
