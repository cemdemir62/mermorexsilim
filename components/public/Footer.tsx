"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Camera, MessageCircle, Clock } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { useLanguage } from "@/lib/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#0f0e17] text-white pt-24 pb-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="space-y-8">
          <Link href="/" className="text-3xl font-bold tracking-tighter text-[#b8860b]">
            MERMOREX<span className="text-white">SİLİM</span>
          </Link>
          <p className="text-gray-400 leading-relaxed text-sm">
            {t("hero.subtitle")}
          </p>
          <div className="flex space-x-6">
            <Link 
              href="https://www.instagram.com/mermorexsilim?igsh=MXh1YTNtaHN3emJ5bw%3D%3D&utm_source=qr" 
              target="_blank"
              className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#b8860b] hover:text-white transition-all duration-300"
            >
              <Camera size={20} />
            </Link>
            <Link 
              href="https://www.facebook.com/share/1CSeth2CrR/?mibextid=wwXIfr" 
              target="_blank"
              className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#b8860b] hover:text-white transition-all duration-300"
            >
              <MessageCircle size={20} />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold mb-8 uppercase tracking-widest text-[#b8860b]">{t("footer.quickLinks")}</h4>
          <ul className="space-y-4 text-gray-400 font-medium">
            <li><Link href="/" className="hover:text-white transition-colors">{t("nav.home")}</Link></li>
            <li><Link href="/galeri" className="hover:text-white transition-colors">{t("nav.gallery")}</Link></li>
            <li><Link href="/blog" className="hover:text-white transition-colors">{t("nav.blog")}</Link></li>
            <li><Link href="#contact" className="hover:text-white transition-colors">{t("nav.contact")}</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-lg font-bold mb-8 uppercase tracking-widest text-[#b8860b]">{t("nav.services")}</h4>
          <ul className="space-y-4 text-gray-400 font-medium">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link href={`/hizmetler/${s.slug}`} className="hover:text-white transition-colors">
                  {t(`services.items.${s.translationKey}.title`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-bold mb-8 uppercase tracking-widest text-[#b8860b]">{t("footer.contactInfo")}</h4>
          <ul className="space-y-6 text-gray-400 font-medium">
            <li className="flex items-start space-x-4">
              <Phone size={20} className="text-[#b8860b] mt-1 shrink-0" />
              <div>
                <p className="text-xs text-gray-500 uppercase mb-1">{t("footer.callUs")}</p>
                <a href="tel:05359293522" className="text-white hover:text-[#b8860b] transition-colors">{t("footer.phone")}</a>
              </div>
            </li>
            <li className="flex items-start space-x-4">
              <Mail size={20} className="text-[#b8860b] mt-1 shrink-0" />
              <div>
                <p className="text-xs text-gray-500 uppercase mb-1">{t("footer.email")}</p>
                <a href="mailto:Mesut.kusek56@gmail.com" className="text-white hover:text-[#b8860b] transition-colors">{t("footer.emailAddress")}</a>
              </div>
            </li>
            <li className="flex items-start space-x-4">
              <MapPin size={20} className="text-[#b8860b] mt-1 shrink-0" />
              <div>
                <p className="text-xs text-gray-500 uppercase mb-1">{t("footer.address")}</p>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Esenkent+Mahallesi+Kurtuluş+Caddesi+No:2+Ümraniye+İstanbul" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white text-xs leading-relaxed hover:text-[#b8860b] transition-colors"
                >
                  {t("footer.addressText")}
                </a>
              </div>
            </li>
            <li className="flex items-start space-x-4">
              <Clock size={20} className="text-[#b8860b] mt-1 shrink-0" />
              <div>
                <p className="text-xs text-gray-500 uppercase mb-1">{t("footer.workingHours")}</p>
                <span className="text-white">{t("footer.workingHoursText")}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs gap-4">
        <p>&copy; {new Date().getFullYear()} Mermorex Silim. {t("footer.rights")}</p>
      </div>
    </footer>
  );
};

export default Footer;
