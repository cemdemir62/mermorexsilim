"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Phone, Moon, Sun, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useLanguage } from "@/lib/LanguageContext";

const Navbar = () => {
  const { locale, setLocale, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    // Theme initialization
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else if (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const navLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.services"), href: "/hizmetler" },
    { name: t("nav.gallery"), href: "/galeri" },
    { name: t("nav.blog"), href: "/blog" },
  ];

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-white/95 backdrop-blur-xl shadow-2xl py-4" : "bg-transparent py-8"
      }`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-[#b8860b]">
            MERMOREX<span className={`transition-colors duration-500 ${scrolled ? "text-[#2c3e50]" : "text-white"}`}>SİLİM</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-10">
            <Link href="/" className={`text-sm font-bold uppercase tracking-widest transition-colors ${scrolled ? "text-gray-900 hover:text-[#b8860b]" : "text-white hover:text-[#b8860b]"}`}>{t("nav.home")}</Link>
            
            {/* Services Mega Menu */}
            <div className="relative group">
              <Link 
                href="/hizmetler" 
                className={`text-sm font-bold uppercase tracking-widest transition-colors flex items-center ${
                  scrolled ? "text-gray-900 hover:text-[#b8860b]" : "text-white hover:text-[#b8860b]"
                }`}
              >
                {t("nav.services")}
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </Link>
              
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-[100]">
                <div className="bg-white rounded-[2rem] shadow-2xl p-10 border border-gray-100 flex gap-12 min-w-[600px]">
                  <div className="space-y-6">
                    <h5 className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.2em]">Doğal Taş</h5>
                    <div className="flex flex-col space-y-4">
                      <Link href="/hizmetler/mermer-silim-parlatma" className="text-gray-900 hover:text-[#b8860b] text-sm font-bold transition-colors">Mermer Silim</Link>
                      <Link href="/hizmetler/granit" className="text-gray-900 hover:text-[#b8860b] text-sm font-bold transition-colors">Granit Silim</Link>
                      <Link href="/hizmetler/paledyen-traverten" className="text-gray-900 hover:text-[#b8860b] text-sm font-bold transition-colors">Paledyen & Traverten</Link>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h5 className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.2em]">Seramik & Yapay</h5>
                    <div className="flex flex-col space-y-4">
                      <Link href="/hizmetler/cini" className="text-gray-900 hover:text-[#b8860b] text-sm font-bold transition-colors">Çini Temizleme</Link>
                      <Link href="/hizmetler/mozaik" className="text-gray-900 hover:text-[#b8860b] text-sm font-bold transition-colors">Mozaik Restorasyon</Link>
                      <Link href="/hizmetler/karo" className="text-gray-900 hover:text-[#b8860b] text-sm font-bold transition-colors">Karo & Seramik</Link>
                    </div>
                  </div>
                  <div className="space-y-6 border-l pl-12">
                    <h5 className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.2em]">Zemin</h5>
                    <div className="flex flex-col space-y-4">
                      <Link href="/hizmetler/beton-cilali" className="text-gray-900 hover:text-[#b8860b] text-sm font-bold transition-colors">Cilalı Beton</Link>
                      <Link href="/hizmetler/beton-cilasiz" className="text-gray-900 hover:text-[#b8860b] text-sm font-bold transition-colors">Cilasız (Mat) Beton</Link>
                      <Link href="/hizmetler/ticari-alan-restorasyonu" className="text-gray-900 hover:text-[#b8860b] text-sm font-bold transition-colors">Epoksi Kaplama</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/galeri" className={`text-sm font-bold uppercase tracking-widest transition-colors ${scrolled ? "text-gray-900 hover:text-[#b8860b]" : "text-white hover:text-[#b8860b]"}`}>{t("nav.gallery")}</Link>
            <Link href="/blog" className={`text-sm font-bold uppercase tracking-widest transition-colors ${scrolled ? "text-gray-900 hover:text-[#b8860b]" : "text-white hover:text-[#b8860b]"}`}>{t("nav.blog")}</Link>
            
            {/* Language Switcher */}
            <div className={`flex items-center space-x-2 border-r pr-8 mr-8 ${scrolled ? "border-gray-200" : "border-white/20"}`}>
              <button 
                onClick={() => setLocale("tr")}
                className={`text-xs font-bold transition-all ${locale === "tr" ? "text-[#b8860b]" : (scrolled ? "text-gray-400 hover:text-gray-900" : "text-white/50 hover:text-white")}`}
              >
                TR
              </button>
              <span className={scrolled ? "text-gray-200" : "text-white/10"}>/</span>
              <button 
                onClick={() => setLocale("en")}
                className={`text-xs font-bold transition-all ${locale === "en" ? "text-[#b8860b]" : (scrolled ? "text-gray-400 hover:text-gray-900" : "text-white/50 hover:text-white")}`}
              >
                EN
              </button>
            </div>
            
            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors ${scrolled ? "text-gray-900 hover:bg-gray-100" : "text-white hover:bg-white/10"}`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link
              href="/#contact"
              className="bg-[#b8860b] text-white px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-[#a67a0a] transition-all shadow-lg shadow-[#b8860b]/20 active:scale-95"
            >
              {t("nav.contact")}
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className={`md:hidden p-2 rounded-full transition-colors ${
              scrolled ? "bg-gray-100 text-[#2c3e50]" : "bg-white/10 text-white"
            }`} 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Premium Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden bg-white pt-32 px-10"
          >
            <div className="flex flex-col space-y-8">
              {/* Home */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <Link href="/" onClick={() => setIsOpen(false)} className="text-4xl font-bold text-[#2c3e50] flex items-center justify-between group">
                  {t("nav.home")}
                  <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity text-[#b8860b]" />
                </Link>
              </motion.div>

              {/* Services Mobile */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                <div className="space-y-4">
                  <h3 className="text-4xl font-bold text-[#2c3e50]">{t("nav.services")}</h3>
                  <div className="grid grid-cols-1 gap-3 pl-4">
                    <Link href="/hizmetler/mermer-silim-parlatma" onClick={() => setIsOpen(false)} className="text-xl font-bold text-gray-400 hover:text-[#b8860b]">Mermer Silim</Link>
                    <Link href="/hizmetler/granit" onClick={() => setIsOpen(false)} className="text-xl font-bold text-gray-400 hover:text-[#b8860b]">Granit Silim</Link>
                    <Link href="/hizmetler/cini" onClick={() => setIsOpen(false)} className="text-xl font-bold text-gray-400 hover:text-[#b8860b]">Çini Temizleme</Link>
                    <Link href="/hizmetler/beton-cilali" onClick={() => setIsOpen(false)} className="text-xl font-bold text-gray-400 hover:text-[#b8860b]">Cilalı Beton</Link>
                    <Link href="/hizmetler/beton-cilasiz" onClick={() => setIsOpen(false)} className="text-xl font-bold text-gray-400 hover:text-[#b8860b]">Cilasız (Mat) Beton</Link>
                  </div>
                </div>
              </motion.div>

              {/* Gallery */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <Link href="/galeri" onClick={() => setIsOpen(false)} className="text-4xl font-bold text-[#2c3e50] flex items-center justify-between group">
                  {t("nav.gallery")}
                  <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity text-[#b8860b]" />
                </Link>
              </motion.div>

              {/* Blog */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <Link href="/blog" onClick={() => setIsOpen(false)} className="text-4xl font-bold text-[#2c3e50] flex items-center justify-between group">
                  {t("nav.blog")}
                  <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity text-[#b8860b]" />
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-10"
              >
                <Link 
                  href="#contact" 
                  className="btn-primary block text-center py-5 text-xl" 
                  onClick={() => setIsOpen(false)}
                >
                  {t("nav.contact")}
                </Link>
              </motion.div>
            </div>
            
            <div className="absolute bottom-12 left-10 right-10 flex justify-between text-sm text-gray-400 font-bold uppercase tracking-widest">
              <span>Mermorex Silim</span>
              <span>2024</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
