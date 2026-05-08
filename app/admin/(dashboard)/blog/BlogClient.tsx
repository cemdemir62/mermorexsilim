"use client";

import { useState } from "react";
import { Plus, Trash2, Edit3, Save, ArrowLeft, Globe, FileText, Sparkles } from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { saveBlogPost, deleteBlogPost } from "@/lib/actions";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string | null;
  published: boolean;
  seoTitle?: string | null;
  seoDescription?: string | null;
}

export default function BlogClient({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({
    title: "",
    slug: "",
    content: "",
    published: false,
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image,
    ],
    immediatelyRender: false,
    content: currentPost.content,
    onUpdate: ({ editor }) => {
      setCurrentPost((prev) => ({ ...prev, content: editor.getHTML() }));
    },
  });

  const handleEdit = (post: BlogPost) => {
    setCurrentPost(post);
    editor?.commands.setContent(post.content);
    setIsEditing(true);
  };

  const handleNew = () => {
    setCurrentPost({ title: "", slug: "", content: "", published: false });
    editor?.commands.setContent("");
    setIsEditing(true);
  };

  const handleSave = async () => {
    const result = await saveBlogPost(currentPost);
    if (result.success) {
      window.location.reload();
    } else {
      alert(result.error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu yazıyı silmek istediğinize emin misiniz?")) return;
    const result = await deleteBlogPost(id);
    if (result.success) {
      setPosts(posts.filter(p => p.id !== id));
    }
  };

  const handleAIWizard = async () => {
    if (!currentPost.title) {
      alert("Lütfen önce bir başlık girin.");
      return;
    }
    
    // Simüle edilmiş AI işlemi
    const mockDescription = `${currentPost.title} hakkında profesyonel mermer silim ve bakım rehberi. Uzman ekibimizden ipuçları ve uygulama detayları.`;
    const mockContent = `<h2>${currentPost.title} Hakkında Genel Bilgi</h2><p>Mermer yüzeylerin korunması ve estetiğinin sürdürülmesi için doğru tekniklerin kullanılması esastır...</p><h3>Uygulama Adımları</h3><ul><li>Hazırlık ve Temizlik</li><li>Kaba Silim</li><li>Hassas Parlatma</li><li>Kristalize Cila</li></ul>`;
    
    setCurrentPost(prev => ({
      ...prev,
      seoTitle: `${currentPost.title} | Mermorex Silim`,
      seoDescription: mockDescription
    }));
    
    if (!currentPost.content || currentPost.content === "<p></p>") {
      editor?.commands.setContent(mockContent);
    }
    
    alert("AI Sihirbazı başlığa göre SEO bilgilerini ve taslak içeriği hazırladı!");
  };

  if (isEditing) {
    return (
      <div className="space-y-6 animate-fade-in pb-20">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setIsEditing(false)}
            className="flex items-center space-x-2 text-gray-500 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Geri Dön</span>
          </button>
          
          <button 
            onClick={handleAIWizard}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-purple-500/20 hover:scale-[1.05] transition-all"
          >
            <Sparkles size={16} />
            <span>AI Sihirbazı</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <input 
              type="text" 
              placeholder="Yazı Başlığı"
              className="w-full text-4xl font-bold border-none outline-none bg-transparent placeholder-gray-300"
              value={currentPost.title}
              onChange={e => setCurrentPost({...currentPost, title: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, "-")})}
            />
            
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm min-h-[500px]">
              <div className="p-4 border-b border-gray-100 flex flex-wrap gap-2">
                <button onClick={() => editor?.chain().focus().toggleBold().run()} className={`p-2 rounded hover:bg-gray-100 ${editor?.isActive('bold') ? 'bg-gray-100' : ''}`}>B</button>
                <button onClick={() => editor?.chain().focus().toggleItalic().run()} className={`p-2 rounded hover:bg-gray-100 ${editor?.isActive('italic') ? 'bg-gray-100' : ''}`}>I</button>
                <button onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} className={`p-2 rounded hover:bg-gray-100 ${editor?.isActive('heading', { level: 2 }) ? 'bg-gray-100' : ''}`}>H2</button>
                <button onClick={() => editor?.chain().focus().toggleBulletList().run()} className={`p-2 rounded hover:bg-gray-100 ${editor?.isActive('bulletList') ? 'bg-gray-100' : ''}`}>List</button>
              </div>
              <EditorContent editor={editor} className="p-8 prose prose-slate max-w-none focus:outline-none min-h-[400px]" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <h3 className="font-bold text-gray-800 flex items-center"><Save size={18} className="mr-2" /> Yayınlama</h3>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm font-medium">Yayınlansın mı?</span>
                <input 
                  type="checkbox" 
                  checked={currentPost.published}
                  onChange={e => setCurrentPost({...currentPost, published: e.target.checked})}
                  className="w-5 h-5 accent-[#b8860b]"
                />
              </div>
              <button 
                onClick={handleSave}
                className="w-full py-4 bg-[#b8860b] text-white rounded-xl font-bold shadow-lg shadow-[#b8860b]/20 hover:scale-[1.02] transition-all"
              >
                Kaydet ve Kapat
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
              <h3 className="font-bold text-gray-800 flex items-center"><Globe size={18} className="mr-2" /> SEO Ayarları</h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">SEO Başlığı</label>
                  <input 
                    type="text" 
                    className="w-full p-3 bg-gray-50 rounded-xl border-none text-sm text-gray-700"
                    value={currentPost.seoTitle || ""}
                    onChange={e => setCurrentPost({...currentPost, seoTitle: e.target.value})}
                    placeholder="Örn: Mermer Bakım Rehberi | Mermorex"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">SEO Açıklaması</label>
                  <textarea 
                    className="w-full p-3 bg-gray-50 rounded-xl border-none text-sm text-gray-700 resize-none h-24"
                    value={currentPost.seoDescription || ""}
                    onChange={e => setCurrentPost({...currentPost, seoDescription: e.target.value})}
                    placeholder="Arama sonuçlarında görünecek açıklama..."
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">URL Yolu (Slug)</label>
                  <input 
                    type="text" 
                    className="w-full p-3 bg-gray-50 rounded-xl border-none text-xs text-gray-400"
                    value={currentPost.slug}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button 
        onClick={handleNew}
        className="flex items-center space-x-2 bg-[#b8860b] text-white px-6 py-3 rounded-xl hover:bg-[#a67a0a] transition-all shadow-md"
      >
        <Plus size={20} />
        <span>Yeni Yazı Oluştur</span>
      </button>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Başlık</th>
              <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Durum</th>
              <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-8 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg text-gray-400">
                      <FileText size={20} />
                    </div>
                    <span className="font-bold text-gray-800">{post.title}</span>
                  </div>
                </td>
                <td className="px-8 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    post.published ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                  }`}>
                    {post.published ? "YAYINDA" : "TASLAK"}
                  </span>
                </td>
                <td className="px-8 py-4 text-right">
                  <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleEdit(post)}
                      className="p-2 text-gray-400 hover:text-[#b8860b]"
                      title="Düzenle"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(post.id)}
                      className="p-2 text-gray-400 hover:text-red-500"
                      title="Sil"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 italic">Henüz yazı bulunmuyor.</p>
          </div>
        )}
      </div>
    </div>
  );
}
