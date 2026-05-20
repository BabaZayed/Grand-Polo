"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { galleryImages } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const categories = ["All", "Exterior", "Interior", "Amenities", "Equestrian", "Clubhouse", "Master Plan"];

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  const goNext = () => setSelectedIndex((prev) => (prev !== null ? (prev + 1) % filtered.length : null));
  const goPrev = () => setSelectedIndex((prev) => (prev !== null ? (prev - 1 + filtered.length) % filtered.length : null));

  return (
    <section className="py-16 lg:py-24 bg-[#070B14] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase font-medium">Visual Journey</span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF6F0] mt-3 mb-4">
            The <span className="gold-text">Gallery</span>
          </h2>
          <div className="gold-divider max-w-xs mx-auto mb-4" />
        </motion.div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(cat)}
              className={
                activeCategory === cat
                  ? "gold-gradient text-[#070B14] font-bold"
                  : "border-[#C9A84C]/20 text-[#8B8678] hover:text-[#C9A84C] hover:border-[#C9A84C]/40"
              }
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={`cursor-pointer rounded-lg overflow-hidden group ${index % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
                onClick={() => openLightbox(index)}
              >
                <div className={`relative ${index % 5 === 0 ? "aspect-square" : "aspect-[4/3]"}`}>
                  <Image
                    src={image.imageUrl}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-[#070B14]/0 group-hover:bg-[#070B14]/30 transition-colors duration-300" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox */}
        <Dialog open={selectedIndex !== null} onOpenChange={() => closeLightbox()}>
          <DialogContent className="max-w-5xl bg-[#070B14] border-[#C9A84C]/20 p-0 overflow-hidden">
            <DialogTitle className="sr-only">Gallery Image</DialogTitle>
            {selectedIndex !== null && filtered[selectedIndex] && (
              <div className="relative aspect-video">
                <Image
                  src={filtered[selectedIndex].imageUrl}
                  alt={filtered[selectedIndex].alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
                <button onClick={closeLightbox} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#070B14]/80 flex items-center justify-center text-[#FAF6F0] hover:text-[#C9A84C] transition-colors">
                  <X className="w-5 h-5" />
                </button>
                <button onClick={goPrev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#070B14]/80 flex items-center justify-center text-[#FAF6F0] hover:text-[#C9A84C] transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={goNext} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#070B14]/80 flex items-center justify-center text-[#FAF6F0] hover:text-[#C9A84C] transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[#FAF6F0]/60 text-sm">
                  {selectedIndex + 1} / {filtered.length}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
