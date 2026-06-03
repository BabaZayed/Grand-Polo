"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Download, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import type { FloorPlanImage } from "@/lib/data";

interface FloorPlanGalleryProps {
  images: FloorPlanImage[];
  projectName: string;
  slug: string;
}

export default function FloorPlanGallery({ images, projectName, slug }: FloorPlanGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) return null;

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

  const goNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <>
      {/* Floor Plan Image Thumbnails */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {images.map((img, index) => (
          <div
            key={index}
            className="group relative rounded-xl overflow-hidden border border-[#D4AF37]/15 bg-[#2A1506]/80 hover:border-[#D4AF37]/40 cursor-pointer transition-all hover:shadow-lg hover:shadow-[#D4AF37]/5"
            onClick={() => openLightbox(index)}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A1506]/80 via-transparent to-transparent" />
              {/* Zoom icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 rounded-full bg-[#2A1506]/80 border border-[#D4AF37]/40 flex items-center justify-center backdrop-blur-sm">
                  <ZoomIn className="w-5 h-5 text-[#D4AF37]" />
                </div>
              </div>
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-[#FFFAF3] text-sm font-medium">{img.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeLightbox}
          onKeyDown={(e) => {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowRight") goNext();
            if (e.key === "ArrowLeft") goPrev();
          }}
          tabIndex={0}
          role="dialog"
          aria-label={`${projectName} floor plan viewer`}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#2A1506]/90 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 z-10 w-10 h-10 rounded-full bg-[#2A1506]/90 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 z-10 w-10 h-10 rounded-full bg-[#2A1506]/90 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          <div className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full max-w-4xl aspect-[4/3]">
              <Image
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>
            <div className="mt-4 flex items-center justify-between w-full max-w-4xl bg-[#2A1506]/90 rounded-xl px-5 py-3 border border-[#D4AF37]/20">
              <div>
                <p className="text-[#FFFAF3] text-sm font-medium">{images[currentIndex].label}</p>
                <p className="text-[#B89B6E] text-xs">{projectName} Floor Plan</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[#B89B6E] text-xs">{currentIndex + 1} / {images.length}</span>
                <a
                  href={`/api/download-floorplan-image?file=${encodeURIComponent(images[currentIndex].src)}`}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg gold-gradient text-[#2A1506] font-bold text-xs hover:opacity-90 transition-opacity"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
