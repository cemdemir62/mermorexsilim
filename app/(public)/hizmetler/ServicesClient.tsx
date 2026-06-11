"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { SERVICES } from "@/lib/constants";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import Link from "next/link";
import { Gem, Shield, Sparkles, Building2, ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";

const iconMap: any = {
  Gem: <Gem size={40} className="text-[#b8860b]" />,
  Sparkles: <Sparkles size={40} className="text-[#b8860b]" />,
  Shield: <Shield size={40} className="text-[#b8860b]" />,
  Building2: <Building2 size={40} className="text-[#b8860b]" />,
};

export default function ServicesClient() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero */}
      <section className="relative pt-40 pb-20 bg-[#0f0e17] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#b8860b]/5 to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h4 className="text-[#b8860b] font-bold uppercase tracking-[0.3em] mb-4">{t("services.subtitle")}</h4>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">{t("services.title")}</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="space-y-12">
            {SERVICES.map((service, index) => (
              <div 
                key={service.slug} 
                className={`flex flex-col lg:flex-row items-center gap-16 p-8 md:p-16 rounded-[3rem] border border-gray-50 shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(184,134,11,0.05)] transition-all duration-500 bg-white ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="lg:w-1/2 space-y-8">
                  <div className="flex items-center space-x-4 text-left">
                    <div className="p-4 bg-[#b8860b]/10 rounded-2xl shrink-0">
                      {iconMap[service.iconName]}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t(`services.items.${service.translationKey}.title`)}</h2>
                  </div>
                  <p className="text-xl text-gray-600 leading-relaxed text-left">
                    {t(`services.items.${service.translationKey}.fullDesc`)}
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    {(t("services.features") as unknown as string[]).map((item, i) => (
                      <li key={i} className="flex items-center space-x-3 text-gray-700 font-medium">
                        <CheckCircle2 size={18} className="text-[#b8860b]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-6 flex justify-start">
                    <Link 
                      href={`/hizmetler/${service.slug}`} 
                      className="inline-flex items-center space-x-3 bg-[#b8860b] text-white px-10 py-5 rounded-2xl font-bold hover:bg-[#a67a0a] transition-all shadow-xl shadow-[#b8860b]/20"
                    >
                      <span>{t("services.readMore")}</span>
                      <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>
                <div className="lg:w-1/2 w-full">
                  <div className="relative aspect-video bg-gray-100 rounded-[2rem] overflow-hidden shadow-2xl group">
                    <Image 
                      src={service.image || ""} 
                      alt={service.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
