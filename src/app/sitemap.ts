import { MetadataRoute } from "next";
import { projects } from "@/lib/data";
import { blogPosts } from "@/lib/blog-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.thegrandpolo.com";

  const staticPages: { path: string; changeFrequency: "daily" | "weekly" | "monthly" | "yearly"; priority: number }[] = [
    { path: "", changeFrequency: "daily", priority: 1 },
    { path: "/projects", changeFrequency: "weekly", priority: 0.9 },
    { path: "/masterplan", changeFrequency: "monthly", priority: 0.7 },
    { path: "/gallery", changeFrequency: "monthly", priority: 0.7 },
    { path: "/about", changeFrequency: "monthly", priority: 0.6 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
    { path: "/payment-plan", changeFrequency: "monthly", priority: 0.8 },
    { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  ];

  // Only include "Available" properties in sitemap — "Launching Soon" pages are noindex
  const availableProjects = projects.filter((p) => p.status !== "Launching Soon");

  const projectPages = availableProjects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const blogPages = blogPosts.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: new Date(b.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const staticEntries = staticPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  return [...staticEntries, ...projectPages, ...blogPages];
}
