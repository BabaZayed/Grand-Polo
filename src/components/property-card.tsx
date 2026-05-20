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
        <div className="glass-card-hover rounded-xl overflow-hidden luxury-shadow">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={property.imageUrl}
              alt={property.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-transparent" />

            {/* Status badge */}
            <div className="absolute top-4 left-4">
              {isLaunching ? (
                <Badge className="bg-[#1B4D3E] text-[#FAF6F0] border-[#2D6A4F]/30 text-xs">Coming Soon</Badge>
              ) : (
                <Badge className="gold-gradient text-[#070B14] border-0 text-xs font-bold">Available</Badge>
              )}
            </div>

            {/* Price overlay */}
            {!isLaunching && (
              <div className="absolute bottom-4 left-4">
                <p className="text-[#C9A84C] font-heading text-2xl font-bold">{formatPrice(property.startingPrice)}</p>
                <p className="text-[#FAF6F0]/60 text-xs">Starting Price</p>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5 lg:p-6">
            <h3 className="font-heading text-xl lg:text-2xl font-bold text-[#FAF6F0] mb-1 group-hover:text-[#C9A84C] transition-colors">
              {property.name}
            </h3>
            <p className="text-[#C9A84C]/80 text-sm font-medium mb-3">{property.tagline}</p>
            {!isLaunching && (
              <div className="flex items-center gap-4 text-[#FAF6F0]/60 text-sm mb-4">
                <span className="flex items-center gap-1">
                  <BedDouble className="w-4 h-4 text-[#C9A84C]" />
                  {property.bedrooms} Bed
                </span>
                <span className="flex items-center gap-1">
                  <Maximize className="w-4 h-4 text-[#C9A84C]" />
                  {property.areaRange}
                </span>
              </div>
            )}
            {isLaunching && (
              <p className="text-[#8B8678] text-sm line-clamp-2 mb-4">{property.description}</p>
            )}
            <div className="flex items-center text-[#C9A84C] text-sm font-medium group-hover:gap-3 transition-all">
              {isLaunching ? "Register Interest" : "View Details"}
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
