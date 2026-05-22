import { Metadata } from "next";
import ProjectsPageClient from "./projects-client";
import { SITE_URL } from "@/lib/data";

export const metadata: Metadata = {
  title: "Properties — Luxury Equestrian Villas",
  description: "Explore Grand Polo Club & Resort luxury villas by Emaar. Chevalia Estate, Chevalia Estate 2, Chevalia Fields, and more. 4-5 bedroom villas from AED 7.34M. Golden Visa eligible.",
  openGraph: {
    title: "Grand Polo Properties — Luxury Equestrian Villas",
    description: "Explore luxury villas at Grand Polo Club & Resort by Emaar. From AED 7.34M.",
    url: `${SITE_URL}/projects`,
    images: [{ url: "/images/hero/chevalia-estate-2-hero.jpg", width: 1200, height: 630, alt: "Grand Polo Club & Resort" }],
  },
  alternates: { canonical: `${SITE_URL}/projects` },
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
