"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, Download, ChevronLeft, ChevronRight, BedDouble, Maximize, LandPlot, Tag, Users, MapPin, FileText } from "lucide-react";
import type { UnitType, FloorPlanImage } from "@/lib/data";
import { formatPrice } from "@/lib/data";

interface FloorPlanDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  unit: UnitType;
  images: FloorPlanImage[];
  sharedImages: FloorPlanImage[];
  projectName: string;
  slug: string;
  clusterTag: string;
}

export default function FloorPlanDetailModal({
  isOpen,
  onClose,
  unit,
  images,
  sharedImages,
  projectName,
  slug,
  clusterTag,
}: FloorPlanDetailModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Combine unit-specific images + shared images for the full view
  const allImages = [...images, ...sharedImages];

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
  }, [allImages.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  }, [allImages.length]);

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

  if (!isOpen || allImages.length === 0) return null;

  const currentImage = allImages[currentIndex];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-label={`${unit.type} — ${projectName} floor plan viewer`}
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
      {allImages.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#2A1506]/90 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {allImages.length > 1 && (
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
        className="relative max-w-[95vw] max-h-[92vh] flex flex-col lg:flex-row gap-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Area */}
        <div className="flex-1 flex flex-col items-center min-w-0">
          <div className="relative w-full max-w-4xl aspect-[3/2] bg-white rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none overflow-hidden">
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              sizes="95vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Image Info Bar */}
          <div className="w-full max-w-4xl bg-[#2A1506]/95 rounded-b-lg lg:rounded-br-none px-4 py-3 border border-[#D4AF37]/20 border-t-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#FFFAF3] text-sm font-medium">{currentImage.label}</p>
                <p className="text-[#B89B6E] text-xs">{projectName} — {unit.type}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#B89B6E] text-xs">{currentIndex + 1} / {allImages.length}</span>
                <a
                  href={`/api/download-floorplan-image?file=${encodeURIComponent(currentImage.src)}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gold-gradient text-[#2A1506] font-bold text-xs hover:opacity-90 transition-opacity"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Details Sidebar */}
        <div className="w-full lg:w-[320px] bg-[#2A1506] rounded-b-lg lg:rounded-r-lg lg:rounded-bl-none border-l-0 lg:border-l border-t lg:border-t-0 border-[#D4AF37]/20 p-5 lg:p-6 overflow-y-auto max-h-[40vh] lg:max-h-none">
          {/* Unit Type Header */}
          <div className="mb-4">
            <span className="px-3 py-1 rounded text-xs font-bold gold-gradient text-[#2A1506] inline-block mb-2">
              {unit.bedrooms} BED
            </span>
            <h2 className="font-heading text-xl font-bold text-[#FFFAF3]">{unit.type}</h2>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#D4AF37]/15 mb-4" />

          {/* Specs */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#3D2510]/50 border border-[#D4AF37]/10 flex items-center justify-center shrink-0">
                <BedDouble className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-[#B89B6E] text-[10px]">Bedrooms</p>
                <p className="text-[#FFFAF3] text-sm font-bold">{unit.bedrooms}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#3D2510]/50 border border-[#D4AF37]/10 flex items-center justify-center shrink-0">
                <Maximize className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-[#B89B6E] text-[10px]">BUA</p>
                <p className="text-[#FFFAF3] text-sm font-bold">{unit.avgBUA.toLocaleString()} sqft</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#3D2510]/50 border border-[#D4AF37]/10 flex items-center justify-center shrink-0">
                <LandPlot className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-[#B89B6E] text-[10px]">Plot Area</p>
                <p className="text-[#FFFAF3] text-sm font-bold">{unit.avgPlot.toLocaleString()} sqft</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#3D2510]/50 border border-[#D4AF37]/10 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-[#B89B6E] text-[10px]">Units Available</p>
                <p className="text-[#FFFAF3] text-sm font-bold">{unit.units}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#3D2510]/50 border border-[#D4AF37]/10 flex items-center justify-center shrink-0">
                <Tag className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-[#B89B6E] text-[10px]">Starting From</p>
                <p className="text-[#D4AF37] text-lg font-bold">{formatPrice(unit.startingPrice)}</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#D4AF37]/15 mb-4" />

          {/* Project & Cluster Info */}
          <div className="space-y-2 mb-5">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span className="text-[#B89B6E]">{projectName}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold gold-gradient text-[#2A1506]">{clusterTag}</span>
              <span className="text-[#B89B6E] text-xs">{images.length} specific + {sharedImages.length} shared plans</span>
            </div>
          </div>

          {/* Download Buttons */}
          <div className="space-y-2">
            <a
              href={`/api/download-floorplan-image?file=${encodeURIComponent(currentImage.src)}`}
              className="flex items-center justify-center gap-2 w-full h-10 rounded-lg gold-gradient text-[#2A1506] font-bold text-sm hover:opacity-90 transition-opacity"
            >
              <Download className="w-4 h-4" /> Download Floor Plan
            </a>
            <a
              href={`/api/download?type=floorplan&file=${slug}-floorplan.pdf`}
              className="flex items-center justify-center gap-2 w-full h-10 rounded-lg border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 text-sm font-medium transition-colors"
            >
              <FileText className="w-4 h-4" /> Download Floor Plan PDF
            </a>
          </div>

          {/* Image Thumbnails */}
          {allImages.length > 1 && (
            <div className="mt-4 pt-4 border-t border-[#D4AF37]/10">
              <p className="text-[#B89B6E] text-[10px] mb-2 uppercase tracking-wider">All Floor Plans</p>
              <div className="grid grid-cols-4 gap-1.5 max-h-40 overflow-y-auto">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative aspect-[3/2] rounded overflow-hidden border transition-all ${
                      idx === currentIndex
                        ? "border-[#D4AF37] ring-1 ring-[#D4AF37]/50"
                        : "border-[#D4AF37]/10 hover:border-[#D4AF37]/30"
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.label}
                      fill
                      sizes="80px"
                      className="object-contain bg-white/90"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
