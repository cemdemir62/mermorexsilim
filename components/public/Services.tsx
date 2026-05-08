"use client";

import { SERVICES } from "@/lib/constants";
import { Gem, Shield, Sparkles, Building2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const iconMap: any = {
  Gem: <Gem className="w-12 h-12 text-[#b8860b]" />,
  Sparkles: <Sparkles className="w-12 h-12 text-[#b8860b]" />,
  Shield: <Shield className="w-12 h-12 text-[#b8860b]" />,
  Building2: <Building2 className="w-12 h-12 text-[#b8860b]" />,
};

import { useLanguage } from "@/lib/LanguageContext";

const Services = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-[#fcfcfc] overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h4 className="text-[#b8860b] font-bold uppercase tracking-widest mb-2">{t("services.subtitle")}</h4>
          <h2 className="text-4xl md:text-5xl font-bold">{t("services.title")}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link 
                href={`/hizmetler/${service.slug}`}
                className="block group bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full relative overflow-hidden hover:-translate-y-2"
              >
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                  <ArrowRight className="text-[#b8860b]" />
                </div>
                
                <div className="mb-8 transform group-hover:scale-110 transition-transform duration-500 origin-left">
                  {iconMap[service.iconName]}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-[#b8860b] transition-colors">
                  {t(`services.items.${service.translationKey}.title`)}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {t(`services.items.${service.translationKey}.desc`)}
                </p>
                <div className="mt-8 text-[#b8860b] font-bold text-xs uppercase tracking-widest flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  {t("services.readMore")}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
