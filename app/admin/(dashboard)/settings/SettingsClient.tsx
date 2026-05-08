"use client";

import { useState } from "react";
import { Save, Info, Globe, Shield, Phone, Mail, MapPin } from "lucide-react";
import { updateSetting } from "@/lib/actions";

export default function SettingsClient({ initialSettings }: { initialSettings: Record<string, string> }) {
  const [settings, setSettings] = useState(initialSettings);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSave = async (key: string) => {
    setSaving(true);
    const result = await updateSetting(key, settings[key] || "");
    if (result.success) {
      setMessage({ type: "success", text: "Ayarlar kaydedildi" });
    } else {
      setMessage({ type: "error", text: result.error || "Hata oluştu" });
    }
    setSaving(false);
    setTimeout(() => setMessage(null), 3000);
  };

  const sections = [
    {
      title: "İletişim Bilgileri",
      icon: <Phone size={20} />,
      keys: [
        { key: "phone", label: "Telefon Numarası", icon: <Phone size={16} /> },
        { key: "email", label: "E-posta Adresi", icon: <Mail size={16} /> },
        { key: "address", label: "Adres", icon: <MapPin size={16} /> },
      ]
    },
    {
      title: "SEO ve Meta Bilgileri",
      icon: <Globe size={20} />,
      keys: [
        { key: "siteTitle", label: "Site Başlığı", icon: <Info size={16} /> },
        { key: "metaDescription", label: "Meta Açıklama", icon: <Info size={16} /> },
        { key: "analyticsId", label: "Google Analytics ID", icon: <Globe size={16} /> },
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {message && (
        <div className={`p-4 rounded-xl sticky top-0 z-10 shadow-lg ${
          message.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}>
          {message.text}
        </div>
      )}

      {sections.map((section, idx) => (
        <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="bg-gray-50 px-8 py-4 border-b border-gray-100 flex items-center space-x-3 text-gray-700">
            {section.icon}
            <h3 className="font-bold">{section.title}</h3>
          </div>
          <div className="p-8 space-y-6">
            {section.keys.map((item) => (
              <div key={item.key} className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    {item.label}
                  </label>
                  <button 
                    onClick={() => handleSave(item.key)}
                    disabled={saving}
                    className="text-xs font-bold text-[#b8860b] hover:text-[#a67a0a] flex items-center uppercase tracking-tighter"
                  >
                    <Save size={14} className="mr-1" />
                    {saving ? "Kaydediliyor..." : "Kaydet"}
                  </button>
                </div>
                <input 
                  type="text" 
                  className="w-full p-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-[#b8860b]/10 focus:border-[#b8860b] outline-none text-gray-700 bg-white shadow-sm"
                  value={settings[item.key] || ""}
                  onChange={e => setSettings({...settings, [item.key]: e.target.value})}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
