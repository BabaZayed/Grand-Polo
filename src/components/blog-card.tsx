"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { BlogPost } from "@/lib/blog-data";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/blog/${post.slug}`} className="group block">
        <article className="glass-card-hover rounded-xl overflow-hidden">
          {/* Image placeholder */}
          <div className="relative aspect-[16/9] overflow-hidden bg-[#121A2E]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1B4D3E]/20 to-[#0C1220]" />
            <Badge className="absolute top-4 left-4 bg-[#C9A84C]/20 text-[#C9A84C] border-[#C9A84C]/30 text-xs">
              {post.category}
            </Badge>
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-center gap-3 text-[#8B8678] text-xs mb-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
            </div>

            <h3 className="font-heading text-lg font-bold text-[#FAF6F0] mb-2 group-hover:text-[#C9A84C] transition-colors line-clamp-2">
              {post.title}
            </h3>

            <p className="text-[#8B8678] text-sm line-clamp-2 mb-3">{post.excerpt}</p>

            <div className="flex items-center text-[#C9A84C] text-sm font-medium">
              Read Article
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
