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
      formData.append("category", "Genel");
      formData.append("isBeforeAfter", "false");

      const result = await addGalleryItem(formData);
      if (result.error) {
        setMessage({ type: "error", text: result.error });
      } else {
        setMessage({ type: "success", text: "Resim başarıyla yüklendi" });
      }
    }

    // Refresh items (In a real app, you might want to fetch from API or return new item from action)
    window.location.reload(); 
    setUploading(false);
  }, []);

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
      {/* Upload Zone */}
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer ${
          isDragActive ? "border-[#b8860b] bg-[#b8860b]/5" : "border-gray-300 hover:border-[#b8860b] bg-white"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center">
          <Upload className={`w-12 h-12 mb-4 ${isDragActive ? "text-[#b8860b]" : "text-gray-400"}`} />
          <p className="text-lg font-medium text-gray-700">
            {isDragActive ? "Dosyaları buraya bırakın" : "Resimleri sürükleyip bırakın veya tıklayın"}
          </p>
          <p className="text-sm text-gray-500 mt-2">PNG, JPG veya WebP formatında çoklu yükleme yapabilirsiniz</p>
          {uploading && <p className="mt-4 text-[#b8860b] animate-pulse">Yükleniyor...</p>}
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
              <img 
                src={item.imageUrl} 
                alt={item.title || "Galeri Resmi"} 
                className="w-full h-full object-cover"
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
