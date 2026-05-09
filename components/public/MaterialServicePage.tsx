"use client";

import { useLanguage } from "@/lib/LanguageContext";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import ContactForm from "@/components/public/ContactForm";
import { CheckCircle2, ArrowRight, Shield, Zap, Clock, Info } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface ProcessStep {
  title: string;
  desc: string;
  time: string;
  method: string;
}

interface MaterialInfo {
  hardness: string;
  porosity: string;
  usage: string;
  maintenance: string;
}

interface FAQItem {
  q: string;
  a: string;
}

interface MaterialServicePageProps {
  slug: string;
  title: string;
  materialInfo: MaterialInfo;
  processes: ProcessStep[];
  faqs: FAQItem[];
  image: string;
  materialImage: string;
}

export default function MaterialServicePage({ 
  slug, 
  title, 
  materialInfo, 
  processes, 
  faqs, 
  image,
  materialImage 
}: MaterialServicePageProps) {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 bg-[#0f0e17] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src={image} alt={title} className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e17] via-[#0f0e17]/80 to-transparent"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <nav className="flex items-center space-x-2 text-sm font-medium text-gray-400 mb-8">
              <Link href="/" className="hover:text-white transition-colors">{t("nav.home")}</Link>
              <span>/</span>
              <Link href="/hizmetler" className="hover:text-white transition-colors">{t("nav.services")}</Link>
              <span>/</span>
              <span className="text-[#b8860b]">{title}</span>
            </nav>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {title} <span className="text-[#b8860b]">Silim & Bakım</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
              20 yıllık tecrübemizle {title.toLowerCase()} yüzeylerinizi ilk günkü parlaklığına ve dayanıklılığına kavuşturuyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Material Description */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="inline-flex items-center space-x-3 px-4 py-2 bg-[#b8860b]/10 rounded-full text-[#b8860b] font-bold text-sm uppercase tracking-widest">
                <Info size={16} />
                <span>Malzeme Karakteristiği</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900">{title} Nedir?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Sertlik Derecesi</h4>
                  <p className="text-lg font-bold text-gray-900">{materialInfo.hardness}</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Gözenek Yapısı</h4>
                  <p className="text-lg font-bold text-gray-900">{materialInfo.porosity}</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Kullanım Alanları</h4>
                  <p className="text-lg font-bold text-gray-900">{materialInfo.usage}</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Bakım Sıklığı</h4>
                  <p className="text-lg font-bold text-gray-900">{materialInfo.maintenance}</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                <img src={materialImage} alt={title} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hidden md:block">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#b8860b] rounded-2xl flex items-center justify-center text-white">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900">Mermorex Garantisi</h5>
                    <p className="text-sm text-gray-500">Tüm işlemlerimiz garantilidir.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-24 bg-[#0f0e17] text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h4 className="text-[#b8860b] font-bold uppercase tracking-widest mb-4">Uygulama Süreci</h4>
            <h2 className="text-4xl md:text-5xl font-bold">Adım Adım Profesyonel Çözüm</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {processes.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-10 bg-white/5 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all duration-500"
              >
                <div className="flex justify-between items-start mb-8">
                  <span className="text-6xl font-black text-white/5 group-hover:text-[#b8860b]/20 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="p-3 bg-[#b8860b]/20 rounded-xl text-[#b8860b]">
                    <Zap size={24} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-8">{step.desc}</p>
                <div className="flex flex-wrap gap-4 mt-auto">
                  <div className="flex items-center space-x-2 px-4 py-2 bg-white/5 rounded-lg text-xs font-bold">
                    <Clock size={14} className="text-[#b8860b]" />
                    <span>{step.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 bg-white/5 rounded-lg text-xs font-bold">
                    <CheckCircle2 size={14} className="text-[#b8860b]" />
                    <span>{step.method}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Sıkça Sorulan Sorular</h2>
            <p className="text-gray-500">{title} hizmetimiz hakkında merak edilenler.</p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h4 className="text-xl font-bold text-gray-900 mb-4">{faq.q}</h4>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactForm />
      <Footer />
    </main>
  );
}
