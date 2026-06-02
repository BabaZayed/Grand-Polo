import type { Metadata } from "next";
import { SITE_URL } from "@/lib/data";

export const metadata: Metadata = {
  title: "Brochures & Floor Plans — Download PDF | All Projects + Masterplan",
  description:
    "Download official brochures, floor plans, and masterplan for Grand Polo Club & Resort. All 13 clusters including Chevalia Estate, Chevalia Estate 2, Chevalia Fields, Equestra, Equitera, Montura, Selvara, and more. Watermarked PDFs with contact details.",
  openGraph: {
    title: "Brochures & Floor Plans — Grand Polo Club & Resort",
    description:
      "Download official brochures, floor plans, and masterplan for all Grand Polo Club & Resort properties. Watermarked PDFs with contact details.",
    images: [{ url: "/images/hero/hero-dark.webp", width: 1200, height: 630, alt: "Grand Polo Club & Resort — Brochures & Floor Plans" }],
    url: `${SITE_URL}/brochures`,
    type: "website",
  },
  alternates: { canonical: `${SITE_URL}/brochures` },
};

export default function BrochuresLayout({ children }: { children: React.ReactNode }) {
  return children;
}
