"use client";

import { useLanguage } from "@/lib/LanguageContext";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import ContactForm from "@/components/public/ContactForm";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";

const iconMap: any = {
  Gem: <CheckCircle2 size={48} className="text-[#b8860b]" />,
  Sparkles: <CheckCircle2 size={48} className="text-[#b8860b]" />,
  Shield: <CheckCircle2 size={48} className="text-[#b8860b]" />,
  Building2: <CheckCircle2 size={48} className="text-[#b8860b]" />,
};

export default function ServiceDetailClient({ service }: { service: any }) {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 bg-[#0f0e17] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[#b8860b]/5 opacity-50"></div>
        <div className="container mx-auto px-6 relative z-10 text-left">
          <div className="max-w-3xl">
            <Link href="/hizmetler" className="text-[#b8860b] text-sm font-bold uppercase tracking-widest mb-10 flex items-center hover:translate-x-[-8px] transition-transform">
              <ArrowLeft size={16} className="mr-2" /> {t("nav.services")}
            </Link>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              {t(`services.items.${service.translationKey}.title`)}
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
              {t(`services.items.${service.translationKey}.desc`)}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8 text-left">
              <h2 className="text-4xl font-bold text-gray-900">{t("services.readMore")}</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t(`services.items.${service.translationKey}.fullDesc`)}
              </p>
              <div className="space-y-4">
                {(t("services.features") as unknown as string[]).map((item, i) => (
                  <div key={i} className="flex items-center space-x-3 text-gray-800 font-medium">
                    <CheckCircle2 className="text-[#b8860b]" size={20} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl bg-gray-100">
                <img 
                  src={service.image || ""} 
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />
      <Footer />
    </main>
  );
}
