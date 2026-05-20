"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Trash2, CheckCircle2, XCircle } from "lucide-react";
import { addGalleryItem, deleteGalleryItem } from "@/lib/actions";
import Image from "next/image";

interface GalleryItem {
  id: string;
  title: string | null;
  category: string | null;
  imageUrl: string;
  isBeforeAfter: boolean;
}

export default function GalleryClient({ initialItems }: { initialItems: GalleryItem[] }) {
  const [items, setItems] = useState(initialItems);
  const [selectedCategory, setSelectedCategory] = useState("MERMER");
  const [isBeforeAfter, setIsBeforeAfter] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    setUploading(true);
    setMessage(null);

    for (const file of acceptedFiles) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("title", file.name.split(".")[0]);
      formData.append("category", selectedCategory);
      formData.append("isBeforeAfter", isBeforeAfter ? "true" : "false");

      const result = await addGalleryItem(formData);
      if (result.error) {
        setMessage({ type: "error", text: result.error });
      } else {
        setMessage({ type: "success", text: "Resim başarıyla yüklendi" });
      }
    }

    // Refresh items
    window.location.reload(); 
    setUploading(false);
  }, [selectedCategory, isBeforeAfter]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm("Bu resmi silmek istediğinize emin misiniz?")) return;

    const result = await deleteGalleryItem(id, imageUrl);
    if (result.success) {
      setItems(items.filter((item) => item.id !== id));
      setMessage({ type: "success", text: "Resim silindi" });
    } else {
      setMessage({ type: "error", text: result.error || "Hata oluştu" });
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Controls */}
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 text-left">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Kategori</label>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#b8860b] outline-none"
            >
              <option value="MERMER">Mermer</option>
              <option value="GRANIT">Granit</option>
              <option value="CINI">Çini</option>
              <option value="MOZAIK">Mozaik</option>
              <option value="KARO">Karo</option>
              <option value="BETON">Beton</option>
              <option value="PALEDYEN_TRAVERTEN">Paledyen/Traverten</option>
            </select>
          </div>
          <div className="flex items-end pb-1">
            <label className="flex items-center space-x-3 cursor-pointer group">
              <div 
                onClick={() => setIsBeforeAfter(!isBeforeAfter)}
                className={`w-12 h-6 rounded-full transition-all relative ${isBeforeAfter ? "bg-[#b8860b]" : "bg-gray-200"}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isBeforeAfter ? "left-7" : "left-1"}`}></div>
              </div>
              <span className="text-sm font-bold text-gray-700">Önce / Sonra Çalışması</span>
            </label>
          </div>
        </div>

        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer ${
            isDragActive ? "border-[#b8860b] bg-[#b8860b]/5" : "border-gray-300 hover:border-[#b8860b] bg-gray-50"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center">
            <Upload className={`w-12 h-12 mb-4 ${isDragActive ? "text-[#b8860b]" : "text-gray-400"}`} />
            <p className="text-lg font-medium text-gray-700">
              {isDragActive ? "Dosyaları buraya bırakın" : "Resimleri sürükleyip bırakın veya tıklayın"}
            </p>
            <p className="text-sm text-gray-500 mt-2">PNG, JPG veya WebP formatında çoklu yükleme yapabilirsiniz</p>
            {uploading && <p className="mt-4 text-[#b8860b] animate-pulse font-bold">Resimler Hazırlanıyor ve Yükleniyor...</p>}
          </div>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-xl flex items-center space-x-3 ${
          message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
        }`}>
          {message.type === "success" ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md">
            <div className="aspect-square relative">
              <Image 
                src={item.imageUrl} 
                alt={item.title || "Galeri Resmi"} 
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                <button 
                  onClick={() => handleDelete(item.id, item.imageUrl)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  title="Sil"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="p-3">
              <p className="text-sm font-medium truncate text-gray-700">{item.title || "Adsız Resim"}</p>
              <p className="text-xs text-gray-400 mt-1">{item.category || "Genel"}</p>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && !uploading && (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <p className="text-gray-400 italic">Henüz resim eklenmemiş.</p>
        </div>
      )}
    </div>
  );
}
