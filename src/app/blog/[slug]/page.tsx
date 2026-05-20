import type { Metadata } from "next";
import { blogPosts } from "@/lib/blog-data";
import { SITE_URL } from "@/lib/data";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import WhatsAppButton from "@/components/whatsapp-button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Article Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `${SITE_URL}/blog/${slug}`,
    },
    alternates: { canonical: `/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <>
        <SiteHeader />
        <main className="min-h-screen flex items-center justify-center bg-[#5D3A1A] pt-20">
          <div className="text-center px-4">
            <h1 className="font-heading text-4xl text-[#D4AF37] mb-4">Article Not Found</h1>
            <Link href="/blog" className="text-[#8B6B47] hover:text-[#D4AF37] transition-colors">
              Back to Blog
            </Link>
          </div>
        </main>
        <SiteFooter />
        <WhatsAppButton />
      </>
    );
  }

  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "Grand Polo Club & Resort" },
    publisher: {
      "@type": "Organization",
      name: "Grand Polo Club & Resort",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.svg` },
    },
    url: `${SITE_URL}/blog/${post.slug}`,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    keywords: post.tags.join(", "),
  };

  const shareUrl = `${SITE_URL}/blog/${post.slug}`;
  const shareText = post.title;

  function renderContent(content: string) {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("# "))
        return <h1 key={i} className="font-heading text-3xl font-bold text-[#FFFAF3] mt-10 mb-4">{line.replace("# ", "")}</h1>;
      if (line.startsWith("## "))
        return <h2 key={i} className="font-heading text-2xl font-bold text-[#FFFAF3] mt-10 mb-4">{line.replace("## ", "")}</h2>;
      if (line.startsWith("### "))
        return <h3 key={i} className="font-heading text-xl font-bold text-[#FFFAF3] mt-8 mb-3">{line.replace("### ", "")}</h3>;
      if (line.startsWith("- "))
        return <li key={i} className="text-[#8B6B47] ml-6 list-disc mb-1">{line.replace("- ", "")}</li>;
      if (line.trim() === "") return <div key={i} className="h-2" />;
      return <p key={i} className="text-[#8B6B47] leading-relaxed mb-4">{line}</p>;
    });
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <SiteHeader />
      <main className="pt-16 lg:pt-20">
        <section className="relative py-16 lg:py-20 bg-[#2A1506]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <Link href="/blog" className="inline-flex items-center text-[#8B6B47] hover:text-[#D4AF37] text-sm mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Blog
            </Link>
            <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30 text-xs mb-4">{post.category}</Badge>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFFAF3] mb-4 leading-tight">{post.title}</h1>
            <div className="flex items-center gap-4 text-[#8B6B47] text-sm">
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{post.readTime}</span>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-[#5D3A1A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <article className="prose-invert max-w-none">{renderContent(post.content)}</article>
            <div className="mt-12 pt-8 border-t border-[#D4AF37]/10">
              <h3 className="text-[#FFFAF3] font-heading text-lg font-bold mb-4">Share This Article</h3>
              <div className="flex gap-3">
                <a href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg border border-[#D4AF37]/15 bg-[#3D2510]/50 text-[#D4AF37] text-sm hover:border-[#D4AF37]/30 transition-all">WhatsApp</a>
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg border border-[#D4AF37]/15 bg-[#3D2510]/50 text-[#D4AF37] text-sm hover:border-[#D4AF37]/30 transition-all">Twitter</a>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg border border-[#D4AF37]/15 bg-[#3D2510]/50 text-[#D4AF37] text-sm hover:border-[#D4AF37]/30 transition-all">LinkedIn</a>
              </div>
            </div>
          </div>
        </section>

        {relatedPosts.length > 0 && (
          <section className="py-16 lg:py-20 bg-[#2A1506]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
              <h2 className="font-heading text-2xl font-bold text-[#FFFAF3] mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((related) => (
                  <Link key={related.slug} href={`/blog/${related.slug}`} className="group">
                    <div className="rounded-xl p-6 border border-[#D4AF37]/15 bg-[#3D2510]/50 hover:border-[#D4AF37]/30 transition-all">
                      <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30 text-xs mb-3">{related.category}</Badge>
                      <h3 className="font-heading text-lg font-bold text-[#FFFAF3] mb-2 group-hover:text-[#D4AF37] transition-colors line-clamp-2">{related.title}</h3>
                      <p className="text-[#8B6B47] text-sm line-clamp-2">{related.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-16 lg:py-20 bg-[#5D3A1A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#FFFAF3] mb-4">Interested in Grand Polo?</h2>
            <p className="text-[#8B6B47] max-w-xl mx-auto mb-8">Discover the equestrian luxury lifestyle at Grand Polo Club & Resort. Speak with our consultants to explore available properties.</p>
            <Link href="/contact" className="inline-flex items-center justify-center h-12 px-8 gold-gradient text-[#2A1506] font-bold text-sm rounded-lg hover:opacity-90 transition-opacity">Contact Us Today</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
}
