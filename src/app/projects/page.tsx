import { Metadata } from "next";
import ProjectsPageClient from "./projects-client";

export const metadata: Metadata = {
  title: "Properties — Luxury Equestrian Villas",
  description: "Explore Grand Polo Club & Resort luxury villas by Emaar. Chevalia Estate, Chevalia Estate 2, Chevalia Fields, and more. 4-5 bedroom villas from AED 7.34M. Golden Visa eligible.",
  openGraph: { title: "Grand Polo Properties — Luxury Equestrian Villas", description: "Explore luxury villas at Grand Polo Club & Resort by Emaar. From AED 7.34M.", url: "https://thegrandpolo.com/projects" },
  alternates: { canonical: "https://thegrandpolo.com/projects" },
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
