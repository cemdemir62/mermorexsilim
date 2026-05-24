"use client";

import { useState } from "react";
import { Save, Search, RefreshCw, AlertCircle, Languages, LayoutGrid, FileText, PhoneCall, Sparkles } from "lucide-react";
import { updateSetting } from "@/lib/actions";
import { translations } from "@/lib/translations";

export default function ContentClient({ initialSettings }: { initialSettings: Record<string, string> }) {
  const [settings, setSettings] = useState(initialSettings);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [activeLang, setActiveLang] = useState<"tr" | "en">("tr");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSave = async (dbKey: string) => {
    setSavingKey(dbKey);
    const result = await updateSetting(dbKey, settings[dbKey] || "");
    if (result.success) {
      setMessage({ type: "success", text: `"${dbKey}" anahtarı başarıyla güncellendi!` });
    } else {
      setMessage({ type: "error", text: result.error || "Güncelleme sırasında hata oluştu" });
    }
    setSavingKey(null);
    setTimeout(() => setMessage(null), 3000);
  };

  const categories = [
    { id: "all", name: "Tüm Metinler", icon: <LayoutGrid size={18} /> },
    { id: "hero", name: "Hero & Giriş", icon: <Sparkles size={18} /> },
    { id: "services", name: "Hizmetler", icon: <FileText size={18} /> },
    { id: "contact", name: "İletişim & Footer", icon: <PhoneCall size={18} /> },
  ];

  // List of all keys we want to allow editing for, with friendly labels and descriptions
  const editableKeys = [
    // Hero & Giriş
    { key: "hero.tagline", label: "Üst Başlık (Tagline)", category: "hero", isTextArea: false },
    { key: "hero.title", label: "Ana Başlık", category: "hero", isTextArea: false },
    { key: "hero.highlight", label: "Vurgulanan Kelime", category: "hero", isTextArea: false },
    { key: "hero.subtitle", label: "Alt Başlık / Tanıtım Metni", category: "hero", isTextArea: true },
    { key: "hero.cta", label: "Teklif Al Butonu Metni", category: "hero", isTextArea: false },
    { key: "hero.gallery", label: "Galeri Butonu Metni", category: "hero", isTextArea: false },
    
    // Hizmetler Başlıklar
    { key: "services.title", label: "Hizmetler Bölüm Başlığı", category: "services", isTextArea: false },
    { key: "services.subtitle", label: "Hizmetler Üst Başlığı", category: "services", isTextArea: false },
    
    // Hizmet Kartları
    { key: "services.items.silim.title", label: "Mermer Silim Kart Başlığı", category: "services", isTextArea: false },
    { key: "services.items.silim.desc", label: "Mermer Silim Kısa Açıklaması", category: "services", isTextArea: true },
    { key: "services.items.silim.fullDesc", label: "Mermer Silim Detaylı Açıklaması", category: "services", isTextArea: true },
    
    { key: "services.items.cila.title", label: "Kristalize Cila Kart Başlığı", category: "services", isTextArea: false },
    { key: "services.items.cila.desc", label: "Kristalize Cila Kısa Açıklaması", category: "services", isTextArea: true },
    
    { key: "services.items.granit.title", label: "Granit Silim Kart Başlığı", category: "services", isTextArea: false },
    { key: "services.items.granit.desc", label: "Granit Silim Kısa Açıklaması", category: "services", isTextArea: true },
    
    { key: "services.items.cini.title", label: "Çini Temizleme Kart Başlığı", category: "services", isTextArea: false },
    { key: "services.items.cini.desc", label: "Çini Temizleme Kısa Açıklaması", category: "services", isTextArea: true },
    
    { key: "services.items.mozaik.title", label: "Mozaik Restorasyon Kart Başlığı", category: "services", isTextArea: false },
    { key: "services.items.mozaik.desc", label: "Mozaik Restorasyon Kısa Açıklaması", category: "services", isTextArea: true },
    
    { key: "services.items.karo.title", label: "Karo & Seramik Kart Başlığı", category: "services", isTextArea: false },
    { key: "services.items.karo.desc", label: "Karo & Seramik Kısa Açıklaması", category: "services", isTextArea: true },
    
    { key: "services.items.betonCilali.title", label: "Cilalı Beton Silim Kart Başlığı", category: "services", isTextArea: false },
    { key: "services.items.betonCilali.desc", label: "Cilalı Beton Silim Kısa Açıklaması", category: "services", isTextArea: true },
    { key: "services.items.betonCilali.fullDesc", label: "Cilalı Beton Silim Detaylı Açıklaması", category: "services", isTextArea: true },
    
    { key: "services.items.betonCilasiz.title", label: "Cilasız (Mat) Beton Silim Kart Başlığı", category: "services", isTextArea: false },
    { key: "services.items.betonCilasiz.desc", label: "Cilasız (Mat) Beton Silim Kısa Açıklaması", category: "services", isTextArea: true },
    { key: "services.items.betonCilasiz.fullDesc", label: "Cilasız (Mat) Beton Silim Detaylı Açıklaması", category: "services", isTextArea: true },
    
    { key: "services.items.paledyen.title", label: "Paledyen & Traverten Kart Başlığı", category: "services", isTextArea: false },
    { key: "services.items.paledyen.desc", label: "Paledyen & Traverten Kısa Açıklaması", category: "services", isTextArea: true },

    // İletişim & Footer
    { key: "contact.title", label: "Teklif İsteyin Başlığı", category: "contact", isTextArea: false },
    { key: "contact.subtitle", label: "Teklif İsteyin Alt Başlığı", category: "contact", isTextArea: true },
    { key: "footer.contactInfo", label: "Footer İletişim Başlığı", category: "contact", isTextArea: false },
    { key: "footer.addressText", label: "Footer Adres Metni", category: "contact", isTextArea: true },
    { key: "footer.workingHoursText", label: "Footer Çalışma Saatleri", category: "contact", isTextArea: false },
  ];

  // Get the default static value from translations.ts for visual comparison
  const getDefaultValue = (key: string, lang: "tr" | "en") => {
    const keys = key.split(".");
    let value: any = translations[lang];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || "";
  };

  // Filter keys based on search and category
  const filteredKeys = editableKeys.filter(item => {
    const dbKey = `${activeLang}.${item.key}`;
    const currentValue = settings[dbKey] || getDefaultValue(item.key, activeLang);
    const matchesSearch = item.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          currentValue.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Dynamic Alerts */}
      {message && (
        <div className={`p-4 rounded-xl fixed top-6 right-6 z-50 shadow-2xl transition-all duration-300 transform translate-y-0 ${
          message.type === "success" ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
        }`}>
          <div className="flex items-center space-x-2">
            <AlertCircle size={20} />
            <span className="font-semibold text-sm">{message.text}</span>
          </div>
        </div>
      )}

      {/* Main Filter & Action Bar */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Language Tabs */}
        <div className="flex bg-gray-100 p-1.5 rounded-2xl w-full md:w-auto">
          <button
            onClick={() => setActiveLang("tr")}
            className={`flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all w-full md:w-auto ${
              activeLang === "tr" 
                ? "bg-white text-gray-900 shadow-sm" 
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <Languages size={16} className="text-[#b8860b]" />
            <span>Türkçe (TR)</span>
          </button>
          <button
            onClick={() => setActiveLang("en")}
            className={`flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all w-full md:w-auto ${
              activeLang === "en" 
                ? "bg-white text-gray-900 shadow-sm" 
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <Languages size={16} className="text-[#b8860b]" />
            <span>English (EN)</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Metin veya başlık ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-[#b8860b]/10 focus:border-[#b8860b] transition-all text-sm bg-gray-50/50"
          />
        </div>
      </div>

      {/* Category Tabs & Items Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar categories */}
        <div className="space-y-2 lg:col-span-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`w-full flex items-center space-x-3 px-5 py-4 rounded-2xl font-bold text-sm transition-all text-left ${
                activeCategory === cat.id
                  ? "bg-[#b8860b]/10 text-[#b8860b] border border-[#b8860b]/20"
                  : "bg-white text-gray-600 border border-gray-100 hover:bg-gray-50"
              }`}
            >
              {cat.icon}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Editing Inputs List */}
        <div className="lg:col-span-3 space-y-6">
          {filteredKeys.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-3xl border border-gray-100 text-gray-400">
              <AlertCircle size={40} className="mx-auto mb-4 opacity-50" />
              <p className="font-medium text-sm">Aradığınız kriterlere uygun metin bulunamadı.</p>
            </div>
          ) : (
            filteredKeys.map((item) => {
              const dbKey = `${activeLang}.${item.key}`;
              const defaultValue = getDefaultValue(item.key, activeLang);
              const currentValue = settings[dbKey] !== undefined ? settings[dbKey] : defaultValue;
              const isModified = settings[dbKey] !== undefined && settings[dbKey] !== defaultValue;

              return (
                <div 
                  key={item.key} 
                  className={`bg-white p-6 md:p-8 rounded-3xl border transition-all duration-300 shadow-sm ${
                    isModified ? "border-amber-200 bg-amber-50/10" : "border-gray-100"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h4 className="font-bold text-gray-900 text-base">{item.label}</h4>
                      <code className="text-xs text-gray-400 font-mono block mt-0.5">{dbKey}</code>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {isModified && (
                        <button
                          onClick={() => {
                            const newSettings = { ...settings };
                            delete newSettings[dbKey];
                            setSettings(newSettings);
                            updateSetting(dbKey, ""); // passing empty clears it
                          }}
                          className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center space-x-1 uppercase"
                        >
                          <RefreshCw size={12} />
                          <span>Sıfırla</span>
                        </button>
                      )}
                      
                      <button
                        onClick={() => handleSave(dbKey)}
                        disabled={savingKey === dbKey}
                        className={`text-xs font-black uppercase tracking-wider px-4 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${
                          savingKey === dbKey 
                            ? "bg-gray-100 text-gray-400"
                            : isModified
                              ? "bg-amber-500 hover:bg-amber-600 text-white"
                              : "bg-[#b8860b] hover:bg-[#a67a0a] text-white"
                        }`}
                      >
                        <Save size={14} />
                        <span>{savingKey === dbKey ? "Kaydediliyor..." : "Kaydet"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Input Element */}
                  <div className="space-y-3">
                    {item.isTextArea ? (
                      <textarea
                        value={currentValue}
                        rows={3}
                        onChange={(e) => setSettings({ ...settings, [dbKey]: e.target.value })}
                        className="w-full px-5 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-[#b8860b]/10 focus:border-[#b8860b] text-sm text-gray-700 font-medium resize-none bg-gray-50/20"
                      />
                    ) : (
                      <input
                        type="text"
                        value={currentValue}
                        onChange={(e) => setSettings({ ...settings, [dbKey]: e.target.value })}
                        className="w-full px-5 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-[#b8860b]/10 focus:border-[#b8860b] text-sm text-gray-700 font-bold bg-gray-50/20"
                      />
                    )}
                    
                    {/* Visual default helper if modified */}
                    {isModified && (
                      <div className="text-xs text-gray-400 bg-gray-50 p-3 rounded-xl flex items-start space-x-2">
                        <AlertCircle size={14} className="shrink-0 mt-0.5" />
                        <span>
                          <strong>Varsayılan:</strong> {defaultValue}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
