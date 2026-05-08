"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image with Zoom Animation */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/hero.png"
          alt="Premium Mermer Silim"
          fill
          className="object-cover brightness-[0.35]"
          priority
        />
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-white">
        <div className="max-w-4xl">
          <motion.h4 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#b8860b] font-bold tracking-widest uppercase mb-4"
          >
            {t("hero.tagline")}
          </motion.h4>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-8xl font-bold mb-8 leading-[1.1]"
          >
            {t("hero.title")} <br />
            <span className="text-[#b8860b]">{t("hero.highlight")}</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-2xl"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Link href="#contact" className="btn-primary text-center py-5 px-12 text-lg shadow-2xl shadow-[#b8860b]/20">
              {t("hero.cta")}
            </Link>
            <Link href="/galeri" className="btn-outline border-white/30 text-white hover:bg-white hover:text-black text-center py-5 px-12 text-lg backdrop-blur-sm">
              {t("hero.gallery")}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">{t("hero.scroll")}</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
