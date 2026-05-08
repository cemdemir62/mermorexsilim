"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

const FAQ = () => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = t("faq.items") as unknown as { q: string, a: string }[];

  return (
    <section className="py-24 bg-[#fcfcfc]">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h4 className="text-[#b8860b] font-bold uppercase tracking-widest mb-4">{t("faq.title")}</h4>
          <h2 className="text-4xl md:text-5xl font-bold">{t("faq.subtitle")}</h2>
        </div>

        <div className="space-y-4">
          {Array.isArray(faqs) && faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <button 
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full p-6 text-left flex justify-between items-center group transition-colors"
              >
                <span className={`text-lg font-bold transition-colors ${activeIndex === index ? "text-[#b8860b]" : "text-gray-900"}`}>
                  {faq.q}
                </span>
                <div className={`p-2 rounded-full transition-all ${activeIndex === index ? "bg-[#b8860b] text-white" : "bg-gray-50 text-gray-400 group-hover:bg-gray-100"}`}>
                  {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-50">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
