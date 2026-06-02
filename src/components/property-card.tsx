"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/lib/data";
import { formatPrice } from "@/lib/data";
import { ArrowRight, BedDouble, Maximize } from "lucide-react";
import { motion } from "framer-motion";

interface PropertyCardProps {
  property: Project;
  index?: number;
}

export default function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const isLaunching = property.status === "Launching Soon";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/projects/${property.slug}`} className="group block">
        <div className="rounded-xl overflow-hidden border border-[#D4AF37]/15 bg-[#3D2510]/50 hover:border-[#D4AF37]/40 transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3),0_0_20px_rgba(212,175,55,0.08)]">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={property.imageUrl}
              alt={property.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2A1506] via-transparent to-transparent" />
            <div className="absolute top-4 left-4">
              {isLaunching ? (
                <Badge className="bg-[#B89B6E] text-[#FFFAF3] border-0 text-xs">Coming Soon</Badge>
              ) : (
                <Badge className="gold-gradient text-[#2A1506] border-0 text-xs font-bold">Available</Badge>
              )}
            </div>
            {!isLaunching && (
              <div className="absolute bottom-4 left-4">
                <p className="text-[#D4AF37] font-heading text-2xl font-bold">{formatPrice(property.startingPrice)}</p>
                <p className="text-[#FFFAF3]/60 text-xs">Starting Price</p>
              </div>
            )}
          </div>
          <div className="p-5 lg:p-6">
            <h3 className="font-heading text-xl lg:text-2xl font-bold text-[#FFFAF3] mb-1 group-hover:text-[#D4AF37] transition-colors">
              {property.name}
            </h3>
            <p className="text-[#D4AF37]/80 text-sm font-medium mb-3">{property.tagline}</p>
            {!isLaunching && (
              <div className="flex items-center gap-4 text-[#FFFAF3]/60 text-sm mb-4">
                <span className="flex items-center gap-1">
                  <BedDouble className="w-4 h-4 text-[#D4AF37]" />
                  {property.bedrooms} Bed
                </span>
                <span className="flex items-center gap-1">
                  <Maximize className="w-4 h-4 text-[#D4AF37]" />
                  {property.areaRange}
                </span>
              </div>
            )}
            {isLaunching && (
              <p className="text-[#B89B6E] text-sm line-clamp-2 mb-4">{property.description}</p>
            )}
            <div className="flex items-center text-[#D4AF37] text-sm font-medium group-hover:gap-3 transition-all">
              {isLaunching ? "Register Interest" : "View Details"}
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
