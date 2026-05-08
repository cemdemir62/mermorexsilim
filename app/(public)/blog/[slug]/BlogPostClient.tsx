"use client";

import { useLanguage } from "@/lib/LanguageContext";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { Calendar, User, Share2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BlogPostClient({ post }: { post: any }) {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Article Header */}
      <section className="pt-40 pb-20 bg-[#0f0e17] text-white">
        <div className="container mx-auto px-6 max-w-4xl text-left">
          <Link href="/blog" className="text-[#b8860b] text-sm font-bold uppercase tracking-widest mb-10 flex items-center hover:translate-x-[-8px] transition-transform">
            <ArrowLeft size={16} className="mr-2" /> {t("nav.blog")}
          </Link>
          <div className="flex items-center space-x-6 text-xs text-gray-500 font-bold uppercase tracking-widest mb-8">
            <span className="bg-[#b8860b] text-white px-3 py-1 rounded-full">{post.category || "Guide"}</span>
            <span className="flex items-center"><Calendar size={14} className="mr-2" /> {new Date(post.createdAt).toLocaleDateString()}</span>
            <span className="flex items-center"><User size={14} className="mr-2" /> Admin</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div 
            className="prose prose-xl prose-slate max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:leading-relaxed prose-p:text-gray-600 prose-a:text-[#b8860b] prose-strong:text-gray-900 text-left"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <div className="mt-20 pt-10 border-t border-gray-100 flex items-center justify-between">
            <div className="flex space-x-4">
              <button className="p-3 rounded-full bg-gray-50 text-gray-400 hover:bg-[#b8860b] hover:text-white transition-all">
                <Share2 size={20} />
              </button>
            </div>
            <Link href="/blog" className="text-sm font-bold text-[#2c3e50] hover:text-[#b8860b] transition-colors uppercase tracking-widest">
              {t("blog.readMore")}
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
