"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Image as ImageIcon, 
  FileText, 
  Star, 
  Settings, 
  LogOut,
  Globe
} from "lucide-react";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Talepler", href: "/admin/requests", icon: <MessageSquare size={20} /> },
    { name: "Site İçeriği", href: "/admin/content", icon: <Globe size={20} /> },
    { name: "Galeri", href: "/admin/gallery", icon: <ImageIcon size={20} /> },
    { name: "Blog", href: "/admin/blog", icon: <FileText size={20} /> },
    { name: "Yorumlar", href: "/admin/testimonials", icon: <Star size={20} /> },
    { name: "Ayarlar", href: "/admin/settings", icon: <Settings size={20} /> },
  ];

  return (
    <aside className="w-64 bg-[#0f0e17] text-white flex flex-col h-screen fixed left-0 top-0 z-40 border-r border-white/5">
      <div className="p-8">
        <Link href="/" className="text-xl font-bold tracking-tighter text-[#b8860b]">
          MERMOREX<span className="text-white">ADMIN</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
              pathname === item.href 
                ? "bg-[#b8860b] text-white shadow-lg shadow-[#b8860b]/20" 
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="p-6 border-t border-white/5">
        <button 
          onClick={() => signOut()}
          className="flex items-center space-x-3 px-4 py-3 w-full text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium">Çıkış Yap</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
