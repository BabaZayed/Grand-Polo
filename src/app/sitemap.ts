import { MetadataRoute } from "next";
import { projects } from "@/lib/data";
import { blogPosts } from "@/lib/blog-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.thegrandpolo.com";

  const staticPages: { path: string; lastModified: string; changeFrequency: "daily" | "weekly" | "monthly"; priority: number }[] = [
    { path: "", lastModified: "2025-05-01", changeFrequency: "daily", priority: 1 },
    { path: "/projects", lastModified: "2025-05-01", changeFrequency: "weekly", priority: 0.9 },
    { path: "/masterplan", lastModified: "2025-04-15", changeFrequency: "monthly", priority: 0.7 },
    { path: "/gallery", lastModified: "2025-04-15", changeFrequency: "monthly", priority: 0.7 },
    { path: "/about", lastModified: "2025-03-01", changeFrequency: "monthly", priority: 0.6 },
    { path: "/contact", lastModified: "2025-03-01", changeFrequency: "monthly", priority: 0.6 },
    { path: "/payment-plan", lastModified: "2025-04-01", changeFrequency: "monthly", priority: 0.8 },
    { path: "/faq", lastModified: "2025-04-01", changeFrequency: "monthly", priority: 0.7 },
    { path: "/blog", lastModified: "2025-03-15", changeFrequency: "weekly", priority: 0.7 },
    { path: "/privacy", lastModified: "2025-02-01", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms", lastModified: "2025-02-01", changeFrequency: "yearly", priority: 0.3 },
    { path: "/disclaimer", lastModified: "2025-02-01", changeFrequency: "yearly", priority: 0.3 },
  ];

  const projectPages = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: p.status === "Launching Soon" ? new Date() : new Date("2025-05-01"),
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
    lastModified: new Date(page.lastModified),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  return [...staticEntries, ...projectPages, ...blogPages];
}
