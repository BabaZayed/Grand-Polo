import { MetadataRoute } from "next";
import { projects } from "@/lib/data";
import { blogPosts } from "@/lib/blog-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://thegrandpolo.com";
  const staticPages = ["", "/projects", "/masterplan", "/gallery", "/about", "/contact", "/payment-plan", "/faq", "/blog", "/privacy", "/terms", "/disclaimer"];
  const projectPages = projects.map((p) => `/projects/${p.slug}`);
  const blogPages = blogPosts.map((b) => `/blog/${b.slug}`);
  return [...staticPages, ...projectPages, ...blogPages].map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: page === "" ? "daily" as const : "weekly" as const,
    priority: page === "" ? 1 : page.startsWith("/projects/") ? 0.9 : 0.7,
  }));
}
