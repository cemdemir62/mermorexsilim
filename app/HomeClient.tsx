"use client";

import Navbar from "@/components/public/Navbar";
import Hero from "@/components/public/Hero";
import Services from "@/components/public/Services";
import FAQ from "@/components/public/FAQ";
import ContactForm from "@/components/public/ContactForm";
import Footer from "@/components/public/Footer";
import BeforeAfterSlider from "@/components/public/BeforeAfterSlider";
import { useLanguage } from "@/lib/LanguageContext";

export default function HomeClient() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      
      {/* Featured Interactive Comparison */}
      <section className="py-24 bg-[#0f0e17] text-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-fade-in text-left">
              <h4 className="text-[#b8860b] font-bold uppercase tracking-widest">{t("comparison.title")}</h4>
              <h2 className="text-4xl md:text-6xl font-bold leading-tight">{t("comparison.subtitle")}</h2>
              <p className="text-gray-400 text-xl leading-relaxed">
                {t("comparison.desc")}
              </p>
              <div className="flex space-x-12 pt-4">
                <div className="flex flex-col">
                  <span className="text-4xl font-bold text-[#b8860b]">100%</span>
                  <span className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-1">{t("comparison.satisfaction")}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-bold text-[#b8860b]">500+</span>
                  <span className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-1">{t("comparison.projects")}</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <BeforeAfterSlider 
                beforeImage="/images/slider-before.png" 
                afterImage="/images/slider-after.png" 
                beforeLabel={t("comparison.before")}
                afterLabel={t("comparison.after")}
              />
            </div>
          </div>
        </div>
      </section>

      <FAQ />
      <ContactForm />
      <Footer />
    </main>
  );
}
