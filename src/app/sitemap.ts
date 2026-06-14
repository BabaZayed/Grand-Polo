import { MetadataRoute } from "next";
import { projects } from "@/lib/data";
import { blogPosts } from "@/lib/blog-data";

const LOCALES = ["", "/ar", "/zh", "/ru", "/fr", "/de"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.thegrandpolo.com";

  const staticPages: { path: string; changeFrequency: "daily" | "weekly" | "monthly" | "yearly"; priority: number; lastmod: string }[] = [
    { path: "", changeFrequency: "daily", priority: 1, lastmod: "2026-06-14" },
    { path: "/projects", changeFrequency: "weekly", priority: 0.9, lastmod: "2026-06-14" },
    { path: "/floor-plans", changeFrequency: "weekly", priority: 0.9, lastmod: "2026-06-14" },
    { path: "/inventory", changeFrequency: "weekly", priority: 0.9, lastmod: "2026-06-14" },
    { path: "/masterplan", changeFrequency: "monthly", priority: 0.7, lastmod: "2025-04-15" },
    { path: "/gallery", changeFrequency: "monthly", priority: 0.7, lastmod: "2025-04-15" },
    { path: "/about", changeFrequency: "monthly", priority: 0.6, lastmod: "2026-06-14" },
    { path: "/contact", changeFrequency: "monthly", priority: 0.6, lastmod: "2026-06-14" },
    { path: "/brochures", changeFrequency: "monthly", priority: 0.8, lastmod: "2026-06-14" },
    { path: "/payment-plan", changeFrequency: "monthly", priority: 0.8, lastmod: "2026-06-14" },
    { path: "/faq", changeFrequency: "monthly", priority: 0.7, lastmod: "2026-06-14" },
    { path: "/blog", changeFrequency: "weekly", priority: 0.7, lastmod: "2026-06-14" },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3, lastmod: "2026-06-14" },
    { path: "/terms", changeFrequency: "yearly", priority: 0.3, lastmod: "2026-06-14" },
    { path: "/disclaimer", changeFrequency: "yearly", priority: 0.3, lastmod: "2026-06-14" },
  ];

  const staticEntries: MetadataRoute.Sitemap = [];
  
  for (const page of staticPages) {
    for (const locale of LOCALES) {
      staticEntries.push({
        url: `${baseUrl}${locale}${page.path}`,
        lastModified: new Date(page.lastmod),
        changeFrequency: page.changeFrequency,
        priority: locale === "" ? page.priority : page.priority * 0.85, // slight reduction for alternates
      });
    }
  }

  const projectEntries = projects.flatMap((p) =>
    LOCALES.map((locale) => ({
      url: `${baseUrl}${locale}/projects/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: locale === "" ? 0.9 : 0.75,
    }))
  );

  const blogEntries = blogPosts.flatMap((b) =>
    LOCALES.map((locale) => ({
      url: `${baseUrl}${locale}/blog/${b.slug}`,
      lastModified: new Date(b.date),
      changeFrequency: "monthly" as const,
      priority: locale === "" ? 0.7 : 0.55,
    }))
  );

  return [...staticEntries, ...projectEntries, ...blogEntries];
}
