# Floor Plan Section Redesign — Work Record

## Summary
Comprehensive redesign of the Grand Polo Club & Resort floor plan section components with 8 major changes, all verified with a successful production build.

## Changes Made

### 1. data.ts — WebP Image Paths
- Updated ALL `floorPlanImages` entries across all 13 projects to use `.webp` extension instead of `.jpg`
- Used sed to batch-replace all floorplan image references
- Verified no `.jpg` references remain in floorplan paths

### 2. FloorPlanUnitCard — Redesigned
- Unified box layout with left (thumbnail) and right (details) side-by-side on desktop, stacked on mobile
- Left side: clickable floor plan image thumbnail with hover overlay (Eye icon), image count badge
- Right side: unit type name, gold "X BED" badge, 2x2 specs grid (BUA, Plot Area, Units, Starting Price), View + Download action buttons
- Design: rounded-xl, border gold/15, bg #2A1506/80, hover border gold/30

### 3. FloorPlanDetailModal — Redesigned
- Full floor plan image on white background with navigation arrows
- Details sidebar with: unit type name, "X BED" badge, specs (Bedrooms, BUA, Plot Area, Units, Starting Price), project name, cluster tag
- Two download buttons: "Download Floor Plan" (watermarked image) and "Download Floor Plan PDF"
- Image thumbnails for navigation between multiple floor plan views
- Keyboard support (Escape, arrows)

### 4. FloorPlanSection — Updated
- Uses redesigned FloorPlanUnitCard and FloorPlanDetailModal
- Grid layout: 2 columns on desktop (lg:grid-cols-2), 1 on mobile
- Summary table preserved at bottom

### 5. Brochures Page — Ampersand Typography
- Wrapped ampersand in `<span className="font-heading">&</span>` for Playfair Display styling

### 6. Masterplan Page — Image Integration
- Added MasterplanImageSection component between stats grid and Green Core section
- Large image display of master plan community layout
- "Download Community Layout" button linking to PDF download
- "View Full Size" button opening lightbox modal
- Thumbnail strip for navigation

### 7. MasterplanImageModal — New Component
- Full-screen overlay with backdrop blur
- Large image display with navigation arrows
- Close button and keyboard support (Escape, arrows)
- Download button for current image
- Thumbnail navigation between masterplan images (masterplan-fp-2 through masterplan-fp-6)

### 8. Download API — WebP Path Support
- Updated `isAllowedFloorplanImage` to accept `.webp` extension
- When `.webp` path requested, tries `.jpg` file first (actual file on disk for watermarking)
- Falls back to `.webp` file if `.jpg` not found (sharp handles both)
- Watermarked output always JPEG for maximum compatibility
- Download filename derived from original path, always ending in `-watermarked.jpg`

## Build Verification
- `npx next build` completed successfully with no errors
- All 39 pages generated correctly
