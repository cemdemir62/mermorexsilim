"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

const ContactForm = () => {
  const { t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const formSchema = z.object({
    name: z.string().min(2, t("contact.validation.name")),
    phone: z.string().min(10, t("contact.validation.phone")),
    service: z.string(),
    message: z.string().min(10, t("contact.validation.message")),
  });

  type FormValues = z.infer<typeof formSchema>;

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service: t("contact.options.silim")
    }
  });

  const onSubmit = async (data: FormValues) => {
    setStatus("loading");
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#b8860b]/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 text-left"
          >
            <h4 className="text-[#b8860b] font-bold uppercase tracking-widest mb-4">{t("nav.contact")}</h4>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">{t("contact.title")}</h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              {t("contact.subtitle")}
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#b8860b]/10 rounded-full flex items-center justify-center text-[#b8860b]">
                  <CheckCircle size={24} />
                </div>
                <span className="text-lg font-medium text-gray-800">{t("contact.features.clean")}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#b8860b]/10 rounded-full flex items-center justify-center text-[#b8860b]">
                  <CheckCircle size={24} />
                </div>
                <span className="text-lg font-medium text-gray-800">{t("contact.features.tech")}</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 w-full"
          >
            <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-50">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{t("contact.name")}</label>
                    <input 
                      {...register("name")}
                      placeholder={t("contact.name")}
                      className={`w-full px-5 py-4 rounded-xl border transition-all outline-none ${errors.name ? "border-red-500 bg-red-50" : "border-gray-300 bg-white focus:ring-4 focus:ring-[#b8860b]/10 focus:border-[#b8860b]"}`} 
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500 font-medium">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{t("contact.phone")}</label>
                    <input 
                      {...register("phone")}
                      placeholder={t("contact.phone")}
                      className={`w-full px-5 py-4 rounded-xl border transition-all outline-none ${errors.phone ? "border-red-500 bg-red-50" : "border-gray-300 bg-white focus:ring-4 focus:ring-[#b8860b]/10 focus:border-[#b8860b]"}`} 
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-500 font-medium">{errors.phone.message}</p>}
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{t("contact.service")}</label>
                  <select 
                    {...register("service")}
                    className="w-full px-5 py-4 rounded-xl border border-gray-300 bg-white focus:ring-4 focus:ring-[#b8860b]/10 focus:border-[#b8860b] outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value={t("contact.options.silim")}>{t("contact.options.silim")}</option>
                    <option value={t("contact.options.granit")}>{t("contact.options.granit")}</option>
                    <option value={t("contact.options.beton")}>{t("contact.options.beton")}</option>
                    <option value={t("contact.options.other")}>{t("contact.options.other")}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{t("contact.message")}</label>
                  <textarea 
                    {...register("message")}
                    placeholder={t("contact.message")}
                    rows={4} 
                    className={`w-full px-5 py-4 rounded-xl border transition-all outline-none resize-none ${errors.message ? "border-red-500 bg-red-50" : "border-gray-300 bg-white focus:ring-4 focus:ring-[#b8860b]/10 focus:border-[#b8860b]"}`}
                  ></textarea>
                  {errors.message && <p className="mt-1 text-xs text-red-500 font-medium">{errors.message.message}</p>}
                </div>

                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-50 text-green-700 p-5 rounded-2xl flex items-center space-x-3 font-medium"
                    >
                      <CheckCircle size={24} />
                      <span>{t("contact.success")}</span>
                    </motion.div>
                  ) : status === "error" ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-red-50 text-red-700 p-5 rounded-2xl flex items-center space-x-3 font-medium"
                    >
                      <AlertCircle size={24} />
                      <span>{t("contact.error")}</span>
                    </motion.div>
                  ) : (
                    <button 
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full btn-primary flex items-center justify-center space-x-3 py-5 rounded-2xl shadow-xl shadow-[#b8860b]/20 active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                      {status === "loading" ? (
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <span className="text-lg">{t("contact.send")}</span>
                          <Send size={20} />
                        </>
                      )}
                    </button>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
