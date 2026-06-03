"use client";

import { useState } from "react";
import { FileText, LayoutGrid } from "lucide-react";
import type { Project, UnitType, FloorPlanImage } from "@/lib/data";
import { formatPrice } from "@/lib/data";
import FloorPlanUnitCard from "@/components/floorplan-unit-card";
import FloorPlanDetailModal from "@/components/floorplan-detail-modal";

interface FloorPlanSectionProps {
  property: Project;
  units: UnitType[];
}

export default function FloorPlanSection({ property, units }: FloorPlanSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUnitIndex, setSelectedUnitIndex] = useState(0);

  const handleView = (unitIndex: number) => {
    setSelectedUnitIndex(unitIndex);
    setModalOpen(true);
  };

  // Filter images for a given unit type index
  const getUnitImages = (index: number): FloorPlanImage[] => {
    return property.floorPlanImages.filter((img) => img.unitTypeIndex === index);
  };

  // Shared images (unitTypeIndex === -1 or undefined)
  const sharedImages = property.floorPlanImages.filter(
    (img) => img.unitTypeIndex === -1 || img.unitTypeIndex === undefined
  );

  if (units.length === 0 && property.floorPlanImages.length === 0) return null;

  return (
    <>
      <section className="py-16 lg:py-20 bg-[#3D2510] border-t border-[#D4AF37]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#FFFAF3] mb-2">Floor Plans</h2>
              <p className="text-[#B89B6E]">
                {units.length} configuration{units.length > 1 ? "s" : ""} available in {property.name}. Click &ldquo;View&rdquo; to see full floor plan details.
              </p>
            </div>
            <a
              href={`/api/download?type=floorplan&file=${property.slug}-floorplan.pdf`}
              className="flex items-center gap-2 px-5 py-2.5 gold-gradient text-[#2A1506] font-bold text-sm rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              <LayoutGrid className="w-4 h-4" /> Download Floor Plan PDF
            </a>
          </div>

          {/* Unified Grid of FloorPlanUnitCards */}
          {units.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {units.map((unit, i) => (
                <FloorPlanUnitCard
                  key={i}
                  unit={unit}
                  images={getUnitImages(i)}
                  sharedImages={sharedImages}
                  projectName={property.name}
                  slug={property.slug}
                  onView={() => handleView(i)}
                />
              ))}
            </div>
          ) : (
            /* Fallback: if no unit types but there are floor plan images, show them */
            property.floorPlanImages.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <FloorPlanUnitCard
                  unit={{
                    type: property.name,
                    bedrooms: parseInt(property.bedrooms) || 0,
                    units: property.facts.totalUnits,
                    avgBUA: parseInt(property.areaRange.replace(/[^0-9]/g, "")) || 0,
                    avgPlot: parseInt(property.plotArea?.replace(/[^0-9]/g, "") || "0") || 0,
                    startingPrice: property.startingPrice,
                  }}
                  images={property.floorPlanImages}
                  sharedImages={[]}
                  projectName={property.name}
                  slug={property.slug}
                  onView={() => handleView(0)}
                />
              </div>
            )
          )}

          {/* Summary Table */}
          {units.length > 0 && (
            <div className="rounded-xl overflow-hidden border border-[#D4AF37]/15 bg-[#2A1506]/50">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <caption className="sr-only">Unit types available at {property.name}</caption>
                  <thead>
                    <tr className="border-b border-[#D4AF37]/10 bg-[#2A1506]">
                      <th className="text-left p-4 text-[#D4AF37] text-sm font-medium">Type</th>
                      <th className="text-left p-4 text-[#D4AF37] text-sm font-medium">Beds</th>
                      <th className="text-left p-4 text-[#D4AF37] text-sm font-medium">Units</th>
                      <th className="text-left p-4 text-[#D4AF37] text-sm font-medium">Avg BUA (sqft)</th>
                      <th className="text-left p-4 text-[#D4AF37] text-sm font-medium">Avg Plot (sqft)</th>
                      <th className="text-left p-4 text-[#D4AF37] text-sm font-medium">Starting Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {units.map((unit, i) => (
                      <tr key={i} className="border-b border-[#D4AF37]/5 last:border-0">
                        <td className="p-4 text-[#FFFAF3] text-sm font-medium">{unit.type}</td>
                        <td className="p-4 text-[#FFFAF3] text-sm font-medium">
                          <span className="px-2 py-0.5 rounded text-xs font-bold gold-gradient text-[#2A1506]">{unit.bedrooms}</span>
                        </td>
                        <td className="p-4 text-[#FFFAF3]/80 text-sm">{unit.units}</td>
                        <td className="p-4 text-[#FFFAF3]/80 text-sm">{unit.avgBUA.toLocaleString()}</td>
                        <td className="p-4 text-[#FFFAF3]/80 text-sm">{unit.avgPlot.toLocaleString()}</td>
                        <td className="p-4 text-[#D4AF37] text-sm font-bold">{formatPrice(unit.startingPrice)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Detail Modal */}
      {units.length > 0 && (
        <FloorPlanDetailModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          unit={units[selectedUnitIndex]}
          images={getUnitImages(selectedUnitIndex)}
          sharedImages={sharedImages}
          projectName={property.name}
          slug={property.slug}
          clusterTag={property.clusterTag}
        />
      )}
    </>
  );
}
