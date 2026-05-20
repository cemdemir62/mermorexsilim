"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { Camera, Filter } from "lucide-react";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import Image from "next/image";

export default function GalleryClient({ items }: { items: any[] }) {
  const { t } = useLanguage();
  const [filter, setFilter] = useState("all");

  const filters = [
    { label: t("gallery.all"), value: "all" },
    { label: "Mermer", value: "MERMER" },
    { label: "Granit", value: "GRANIT" },
    { label: "Çini", value: "CINI" },
    { label: "Mozaik", value: "MOZAIK" },
    { label: "Karo", value: "KARO" },
    { label: "Beton", value: "BETON" },
    { label: "Paledyen/Traverten", value: "PALEDYEN_TRAVERTEN" },
  ];

  const filteredItems = filter === "all" 
    ? items 
    : items.filter(item => item.category === filter);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero */}
      <section className="relative pt-40 pb-20 bg-[#0f0e17] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[#b8860b]/5"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h4 className="text-[#b8860b] font-bold uppercase tracking-[0.3em] mb-4">{t("gallery.title")}</h4>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">{t("gallery.subtitle")}</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-12 border-b sticky top-20 bg-white z-30">
        <div className="container mx-auto px-6">
          <div className="flex items-center space-x-6 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
            <div className="flex items-center space-x-2 text-[#b8860b] font-bold uppercase tracking-widest text-xs pr-4 border-r">
              <Filter size={16} />
              <span>Filtrele</span>
            </div>
            <div className="flex space-x-2 shrink-0">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                    filter === f.value 
                    ? "bg-[#b8860b] text-white shadow-lg shadow-[#b8860b]/20" 
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <div key={item.id} className="group relative rounded-[2.5rem] overflow-hidden shadow-xl bg-gray-100 aspect-square">
                  <Image 
                    src={item.imageUrl} 
                    alt={item.title || ""} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 text-left">
                    <p className="text-[#b8860b] text-xs font-bold uppercase tracking-widest mb-2">{item.category || "Restoration"}</p>
                    <h3 className="text-white text-xl font-bold">{item.title || "Marble Application"}</h3>
                    {item.isBeforeAfter && (
                      <span className="absolute top-6 right-6 bg-[#b8860b] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
                        {t("gallery.before")} / {t("gallery.after")}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-40 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
              <Camera size={48} className="mx-auto text-gray-300 mb-6" />
              <p className="text-gray-400 italic text-xl">{t("gallery.empty")}</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
