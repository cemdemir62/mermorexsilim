"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import Image from "next/image";

export default function BlogClient({ posts }: { posts: any[] }) {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#fcfcfc]">
      <Navbar />
      
      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-[#0f0e17] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#b8860b]/10 to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h4 className="text-[#b8860b] font-bold uppercase tracking-[0.3em] mb-4">{t("blog.title")}</h4>
          <h1 className="text-5xl md:text-7xl font-bold mb-8">{t("blog.subtitle")}</h1>
          <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Blog List */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {posts.map((post) => (
                <article key={post.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-2xl hover:shadow-[#b8860b]/5 transition-all duration-500 group flex flex-col h-full">
                  <div className="aspect-[16/10] bg-gray-100 overflow-hidden relative">
                    <Image 
                      src={post.coverImage || "/images/blog-placeholder.png"} 
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    <span className="absolute top-6 left-6 bg-white/90 backdrop-blur-md text-[#2c3e50] text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-sm">
                      {post.category || "Guide"}
                    </span>
                  </div>
                  <div className="p-10 flex flex-col flex-1">
                    <div className="flex items-center space-x-4 text-xs text-gray-400 mb-6 font-bold uppercase tracking-tighter">
                      <span className="flex items-center"><Calendar size={14} className="mr-2" /> {new Date(post.createdAt).toLocaleDateString()}</span>
                      <span className="flex items-center"><User size={14} className="mr-2" /> Admin</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-6 text-gray-900 group-hover:text-[#b8860b] transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <div className="mt-auto pt-6 border-t border-gray-50">
                      <Link 
                        href={`/blog/${post.slug}`} 
                        className="text-[#b8860b] font-bold text-sm uppercase tracking-widest flex items-center group-hover:translate-x-2 transition-transform"
                      >
                        {t("blog.readMore")} <ArrowRight size={18} className="ml-2" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-40 bg-white rounded-[3rem] shadow-sm border border-gray-100">
              <BookOpen size={48} className="mx-auto text-gray-200 mb-6" />
              <p className="text-gray-400 italic text-xl font-medium">{t("blog.empty")}</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
