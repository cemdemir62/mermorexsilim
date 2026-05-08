"use client";

import { useState } from "react";
import { Plus, Trash2, Star, User, Building } from "lucide-react";
import { addTestimonial, deleteTestimonial } from "@/lib/actions";

interface Testimonial {
  id: string;
  name: string;
  company: string | null;
  text: string;
  rating: number;
  active: boolean;
}

export default function TestimonialsClient({ initialItems }: { initialItems: Testimonial[] }) {
  const [items, setItems] = useState(initialItems);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    text: "",
    rating: 5,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await addTestimonial(formData);
    if (result.success) {
      window.location.reload();
    } else {
      alert(result.error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu yorumu silmek istediğinize emin misiniz?")) return;
    const result = await deleteTestimonial(id);
    if (result.success) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <button 
        onClick={() => setShowForm(!showForm)}
        className="flex items-center space-x-2 bg-[#b8860b] text-white px-6 py-3 rounded-xl hover:bg-[#a67a0a] transition-all shadow-md"
      >
        <Plus size={20} />
        <span>Yeni Yorum Ekle</span>
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Müşteri Adı</label>
              <input 
                type="text" 
                required
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-[#b8860b]/10 focus:border-[#b8860b] outline-none"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Şirket / Ünvan</label>
              <input 
                type="text" 
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-[#b8860b]/10 focus:border-[#b8860b] outline-none"
                value={formData.company}
                onChange={e => setFormData({...formData, company: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Yorum Metni</label>
            <textarea 
              required
              rows={4}
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-[#b8860b]/10 focus:border-[#b8860b] outline-none"
              value={formData.text}
              onChange={e => setFormData({...formData, text: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Puan (1-5)</label>
            <div className="flex space-x-2">
              {[1,2,3,4,5].map(star => (
                <button 
                  key={star}
                  type="button"
                  onClick={() => setFormData({...formData, rating: star})}
                  className={`p-2 rounded-lg transition-colors ${formData.rating >= star ? "text-[#b8860b]" : "text-gray-300"}`}
                >
                  <Star fill={formData.rating >= star ? "currentColor" : "none"} />
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button 
              type="button"
              onClick={() => setShowForm(false)}
              className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              İptal
            </button>
            <button 
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#b8860b] text-white hover:bg-[#a67a0a]"
            >
              Kaydet
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all relative group">
            <button 
              onClick={() => handleDelete(item.id)}
              className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
            >
              <Trash2 size={18} />
            </button>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-[#b8860b]/10 rounded-full flex items-center justify-center text-[#b8860b]">
                <User size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{item.name}</h4>
                <div className="flex items-center text-xs text-gray-400">
                  <Building size={12} className="mr-1" />
                  <span>{item.company || "Bireysel Müşteri"}</span>
                </div>
              </div>
            </div>
            <div className="flex mb-3">
              {[1,2,3,4,5].map(star => (
                <Star key={star} size={14} className={item.rating >= star ? "text-[#b8860b]" : "text-gray-200"} fill={item.rating >= star ? "currentColor" : "none"} />
              ))}
            </div>
            <p className="text-gray-600 text-sm italic leading-relaxed">
              "{item.text}"
            </p>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <p className="text-gray-400 italic">Henüz yorum eklenmemiş.</p>
        </div>
      )}
    </div>
  );
}
