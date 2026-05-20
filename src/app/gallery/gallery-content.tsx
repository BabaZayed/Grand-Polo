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
      <section className="py-10 lg:py-12 bg-[#0C1220] border-b border-[#C9A84C]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "gold-gradient text-[#070B14]"
                    : "glass-card text-[#8B8678] hover:text-[#C9A84C] hover:border-[#C9A84C]/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Image Grid */}
      <section className="py-12 lg:py-16 bg-[#0C1220]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#8B8678] text-sm mb-6">
            Showing {filtered.length} image{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "All" && ` in ${activeCategory}`}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filtered.map((img) => (
              <button
                key={img.id}
                onClick={() => setSelectedImage(img)}
                className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer border-0 p-0 bg-transparent"
              >
                <Image
                  src={img.imageUrl}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-[#070B14]/0 group-hover:bg-[#070B14]/40 transition-colors flex items-end">
                  <div className="p-3 w-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-[#FAF6F0] text-xs font-medium">{img.alt}</p>
                    <p className="text-[#C9A84C] text-[10px]">{img.category}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#8B8678]">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl w-[95vw] bg-[#0C1220] border-[#C9A84C]/20 p-0 overflow-hidden">
          <DialogTitle className="sr-only">
            {selectedImage?.alt || "Gallery image"}
          </DialogTitle>
          {selectedImage && (
            <div className="relative">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-[#070B14]/80 flex items-center justify-center text-[#FAF6F0] hover:text-[#C9A84C] transition-colors"
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
              <div className="p-4 bg-[#070B14]">
                <p className="text-[#FAF6F0] font-medium text-sm">{selectedImage.alt}</p>
                <p className="text-[#C9A84C] text-xs mt-1">{selectedImage.category}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
