"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Download } from "lucide-react";

interface MasterplanImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: { src: string; alt: string }[];
}

export default function MasterplanImageModal({
  isOpen,
  onClose,
  images,
}: MasterplanImageModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard support
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, goNext, goPrev]);

  // Reset index when modal opens
  useEffect(() => {
    if (isOpen) setCurrentIndex(0);
  }, [isOpen]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-label="Master plan image viewer"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#2A1506]/90 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-colors"
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#2A1506]/90 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#2A1506]/90 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {/* Main Content */}
      <div
        className="relative max-w-[90vw] max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative w-full max-w-5xl aspect-[3/2] bg-white rounded-lg overflow-hidden">
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            sizes="90vw"
            className="object-contain"
            priority
          />
        </div>

        {/* Info Bar */}
        <div className="w-full max-w-5xl bg-[#2A1506]/95 rounded-b-lg px-4 py-3 mt-0 border border-[#D4AF37]/20 border-t-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#FFFAF3] text-sm font-medium">{currentImage.alt}</p>
              {images.length > 1 && (
                <p className="text-[#B89B6E] text-xs">{currentIndex + 1} / {images.length}</p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <a
                href={`/api/download-floorplan-image?file=${encodeURIComponent(currentImage.src)}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gold-gradient text-[#2A1506] font-bold text-xs hover:opacity-90 transition-opacity"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </a>
            </div>
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-3 justify-center">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-16 h-10 rounded overflow-hidden border transition-all ${
                  idx === currentIndex
                    ? "border-[#D4AF37] ring-1 ring-[#D4AF37]/50"
                    : "border-[#D4AF37]/10 hover:border-[#D4AF37]/30"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="64px"
                  className="object-contain bg-white/90"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
