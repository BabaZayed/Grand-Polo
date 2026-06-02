"use client";

import { useState } from "react";
import Image from "next/image";
import { galleryImages } from "@/lib/data";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

const categories = ["All", "Exterior", "Interior", "Amenities", "Equestrian", "Clubhouse", "Master Plan"] as const;

export default function GalleryContent() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[number] | null>(null);

  const filtered =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <>
      {/* Category Filter Tabs */}
      <section className="py-10 lg:py-12 bg-[#3D2510] border-b border-[#D4AF37]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                aria-label={`Filter by ${cat}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "gold-gradient text-[#2A1506]"
                    : "border border-[#D4AF37]/20 text-[#B89B6E] hover:text-[#D4AF37] hover:border-[#D4AF37]/40 bg-[#3D2510]/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Image Grid */}
      <section className="py-12 lg:py-16 bg-[#5D3A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#B89B6E] text-sm mb-6">
            Showing {filtered.length} image{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "All" && ` in ${activeCategory}`}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filtered.map((img) => (
              <button
                key={img.id}
                onClick={() => setSelectedImage(img)}
                aria-label={`View ${img.alt}`}
                className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer border border-[#D4AF37]/10 hover:border-[#D4AF37]/40 transition-all duration-300 p-0 bg-transparent"
              >
                <Image
                  src={img.imageUrl}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-[#2A1506]/0 group-hover:bg-[#2A1506]/40 transition-colors flex items-end">
                  <div className="p-3 w-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-[#FFFAF3] text-xs font-medium">{img.alt}</p>
                    <p className="text-[#D4AF37] text-[10px]">{img.category}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#B89B6E]">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl w-[95vw] bg-[#3D2510] border-[#D4AF37]/20 p-0 overflow-hidden">
          <DialogTitle className="sr-only">
            {selectedImage?.alt || "Gallery image"}
          </DialogTitle>
          {selectedImage && (
            <div className="relative">
              <button
                onClick={() => setSelectedImage(null)}
                aria-label="Close image viewer"
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-[#2A1506]/80 flex items-center justify-center text-[#FFFAF3] hover:text-[#D4AF37] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="relative aspect-[16/10]">
                <Image
                  src={selectedImage.imageUrl}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  sizes="95vw"
                />
              </div>
              <div className="p-4 bg-[#2A1506]">
                <p className="text-[#FFFAF3] font-medium text-sm">{selectedImage.alt}</p>
                <p className="text-[#D4AF37] text-xs mt-1">{selectedImage.category}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
