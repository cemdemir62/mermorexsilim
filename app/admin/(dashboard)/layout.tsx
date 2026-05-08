import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#f9f9f9]">
      <Sidebar />
      <main className="flex-1 ml-64 p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Yönetim Paneli</h1>
            <p className="text-gray-500">Mermorex Silim İçerik ve Talep Yönetimi</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="font-bold text-gray-900 text-sm">Admin Kullanıcı</p>
              <p className="text-xs text-[#b8860b]">Süper Admin</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#b8860b] flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
