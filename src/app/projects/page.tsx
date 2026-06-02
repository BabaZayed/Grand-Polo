import { Metadata } from "next";
import ProjectsPageClient from "./projects-client";
import { SITE_URL } from "@/lib/data";

export const metadata: Metadata = {
  title: "Properties — All 13 Luxury Equestrian Clusters",
  description: "Explore all 13 luxury villa clusters at Grand Polo Club & Resort by Emaar. Chevalia Estate, Chevalia Estate 2, Chevalia Fields, Equestra, Equitera, Montura, Selvara and more. 4-5 bedroom villas from AED 7.34M. Golden Visa eligible.",
  openGraph: {
    title: "Grand Polo Properties — All 13 Luxury Equestrian Clusters",
    description: "Explore all 13 luxury villa clusters at Grand Polo Club & Resort by Emaar. From AED 7.34M.",
    url: `${SITE_URL}/projects`,
    images: [{ url: "/images/hero/hero-dark.webp", width: 1200, height: 630, alt: "Grand Polo Properties — Luxury Equestrian Villas" }]
  },
  alternates: { canonical: `${SITE_URL}/projects` },
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
