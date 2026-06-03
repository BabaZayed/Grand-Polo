"use client";

import Image from "next/image";
import { BedDouble, Maximize, LandPlot, Tag, Users, Download, Eye } from "lucide-react";
import type { UnitType, FloorPlanImage } from "@/lib/data";
import { formatPrice } from "@/lib/data";

interface FloorPlanUnitCardProps {
  unit: UnitType;
  images: FloorPlanImage[];
  sharedImages: FloorPlanImage[];
  projectName: string;
  slug: string;
  onView: () => void;
}

export default function FloorPlanUnitCard({
  unit,
  images,
  sharedImages,
  projectName: _projectName,
  slug: _slug,
  onView,
}: FloorPlanUnitCardProps) {
  // Use specific images if available, otherwise fall back to shared images
  const displayImages = images.length > 0 ? images : sharedImages;
  const primaryImage = displayImages[0];
  // Derive the JPG fallback from the WebP src
  const jpgFallback = primaryImage?.src.replace(/\.webp$/, ".jpg");

  return (
    <div className="rounded-xl border border-[#D4AF37]/15 bg-[#2A1506]/80 overflow-hidden hover:border-[#D4AF37]/30 transition-all duration-300 group">
      <div className="flex flex-col sm:flex-row">
        {/* Left — Floor Plan Thumbnail */}
        <div
          className="relative w-full sm:w-52 lg:w-60 shrink-0 cursor-pointer overflow-hidden"
          onClick={onView}
        >
          {primaryImage ? (
            <div className="relative aspect-[3/2] bg-white/95">
              <Image
                src={primaryImage.src}
                alt={primaryImage.alt}
                fill
                sizes="(max-width: 640px) 100vw, 240px"
                className="object-contain p-1"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#2A1506]/30">
                <div className="w-10 h-10 rounded-full bg-[#2A1506]/80 border border-[#D4AF37]/40 flex items-center justify-center backdrop-blur-sm">
                  <Eye className="w-4 h-4 text-[#D4AF37]" />
                </div>
              </div>
              {/* Image count badge */}
              {displayImages.length > 1 && (
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-[#2A1506]/90 border border-[#D4AF37]/30 text-[#D4AF37]">
                  {displayImages.length} plans
                </div>
              )}
            </div>
          ) : (
            <div className="relative aspect-[3/2] sm:aspect-auto sm:h-full bg-[#3D2510]/50 flex items-center justify-center min-h-[140px]">
              <BedDouble className="w-8 h-8 text-[#D4AF37]/30" />
            </div>
          )}
        </div>

        {/* Right — Unit Details */}
        <div className="flex-1 p-4 lg:p-5 flex flex-col min-w-0">
          {/* Header: Type name + Badge */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="font-heading text-lg font-bold text-[#FFFAF3] group-hover:text-[#D4AF37] transition-colors leading-tight">
              {unit.type}
            </h3>
            <span className="px-3 py-1 rounded text-xs font-bold gold-gradient text-[#2A1506] shrink-0">
              {unit.bedrooms} BED
            </span>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="rounded-lg p-2.5 bg-[#3D2510]/50 border border-[#D4AF37]/10">
              <div className="flex items-center gap-1.5 mb-1">
                <Maximize className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-[#B89B6E] text-[10px]">BUA</span>
              </div>
              <p className="text-[#FFFAF3] text-sm font-bold">{unit.avgBUA.toLocaleString()} sqft</p>
            </div>
            <div className="rounded-lg p-2.5 bg-[#3D2510]/50 border border-[#D4AF37]/10">
              <div className="flex items-center gap-1.5 mb-1">
                <LandPlot className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-[#B89B6E] text-[10px]">Plot Area</span>
              </div>
              <p className="text-[#FFFAF3] text-sm font-bold">{unit.avgPlot.toLocaleString()} sqft</p>
            </div>
            <div className="rounded-lg p-2.5 bg-[#3D2510]/50 border border-[#D4AF37]/10">
              <div className="flex items-center gap-1.5 mb-1">
                <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-[#B89B6E] text-[10px]">Units</span>
              </div>
              <p className="text-[#FFFAF3] text-sm font-bold">{unit.units}</p>
            </div>
            <div className="rounded-lg p-2.5 bg-[#3D2510]/50 border border-[#D4AF37]/10">
              <div className="flex items-center gap-1.5 mb-1">
                <Tag className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-[#B89B6E] text-[10px]">Starting</span>
              </div>
              <p className="text-[#D4AF37] text-sm font-bold">{formatPrice(unit.startingPrice)}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-auto">
            <button
              onClick={onView}
              className="flex-1 flex items-center justify-center gap-2 h-10 rounded-lg border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 text-sm font-medium transition-colors"
            >
              <Eye className="w-4 h-4" /> View
            </button>
            {primaryImage && (
              <a
                href={`/api/download-floorplan-image?file=${encodeURIComponent(primaryImage.src)}`}
                onClick={(e) => e.stopPropagation()}
                className="flex-1 flex items-center justify-center gap-2 h-10 rounded-lg gold-gradient text-[#2A1506] font-bold text-sm hover:opacity-90 transition-opacity"
              >
                <Download className="w-4 h-4" /> Download
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
