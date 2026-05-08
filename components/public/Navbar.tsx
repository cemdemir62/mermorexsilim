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
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                  scrolled ? "text-gray-900 hover:text-[#b8860b]" : "text-white hover:text-[#b8860b]"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
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
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className="text-4xl font-bold text-[#2c3e50] flex items-center justify-between group"
                  >
                    {link.name}
                    <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity text-[#b8860b]" />
                  </Link>
                </motion.div>
              ))}
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
