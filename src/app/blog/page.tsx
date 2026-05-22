import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import WhatsAppButton from "@/components/whatsapp-button";
import { blogPosts } from "@/lib/blog-data";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { SITE_URL } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog — Insights & Analysis",
  description:
    "Expert insights on Grand Polo Club & Resort, Dubai real estate investment, equestrian communities, and property market analysis.",
  openGraph: {
    title: "Blog — Grand Polo Club & Resort",
    description: "Insights & analysis on Dubai equestrian real estate and Grand Polo investment.",
    url: `${SITE_URL}/blog`,
    type: "website",
    images: [{ url: "/images/hero/chevalia-estate-2-hero.jpg", width: 1200, height: 630, alt: "Grand Polo Club & Resort" }],
  },
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default function BlogPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-16 lg:pt-20">
        {/* Hero */}
        <section className="relative py-16 lg:py-24 bg-[#2A1506] overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(212,175,55,0.3) 1px, transparent 0)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium">
              Knowledge Centre
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FFFAF3] mt-3 mb-4">
              Insights & <span className="gold-text">Analysis</span>
            </h1>
            <div className="gold-divider max-w-xs mb-4" />
            <p className="text-[#8B6B47] max-w-2xl">
              Expert insights on Grand Polo Club & Resort, Dubai real estate investment, and equestrian community living. In-depth guides, market analysis, and community comparisons.
            </p>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-16 lg:py-20 bg-[#5D3A1A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {blogPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                  <article className="rounded-xl overflow-hidden h-full flex flex-col border border-[#D4AF37]/15 bg-[#3D2510]/50 hover:border-[#D4AF37]/30 transition-all">
                    <div className="p-6 flex-1 flex flex-col">
                      <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30 text-xs w-fit mb-3">
                        {post.category}
                      </Badge>
                      <h3 className="font-heading text-lg font-bold text-[#FFFAF3] mb-3 group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-[#8B6B47] text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-[#8B6B47] mt-auto">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>
                        <span className="flex items-center gap-1 text-[#D4AF37] font-medium group-hover:gap-2 transition-all">
                          Read More <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
}
