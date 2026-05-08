import { 
  MessageSquare, 
  Image as ImageIcon, 
  FileText, 
  TrendingUp,
  Clock,
  User
} from "lucide-react";
import prisma from "@/lib/prisma";
import DashboardCharts from "./DashboardCharts";

const StatCard = ({ title, value, icon, color }: any) => (
  <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between">
    <div>
      <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">{title}</p>
      <h3 className="text-4xl font-bold text-gray-900">{value}</h3>
    </div>
    <div className={`p-5 rounded-2xl ${color} bg-opacity-10 text-xl`}>
      {icon}
    </div>
  </div>
);

export default async function DashboardPage() {
  const [requestsCount, galleryCount, blogCount, recentRequests, logs] = await Promise.all([
    prisma.contactRequest.count(),
    prisma.galleryItem.count(),
    prisma.blogPost.count(),
    prisma.contactRequest.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
    prisma.activityLog.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Bekleyen Talepler" 
          value={requestsCount} 
          icon={<MessageSquare className="text-blue-600" size={24} />} 
          color="bg-blue-600" 
        />
        <StatCard 
          title="Galeri Fotoğrafları" 
          value={galleryCount} 
          icon={<ImageIcon className="text-purple-600" size={24} />} 
          color="bg-purple-600" 
        />
        <StatCard 
          title="Blog Yazıları" 
          value={blogCount} 
          icon={<FileText className="text-amber-600" size={24} />} 
          color="bg-amber-600" 
        />
        <StatCard 
          title="Toplam Ziyaret" 
          value="1,284" 
          icon={<TrendingUp className="text-green-600" size={24} />} 
          color="bg-green-600" 
        />
      </div>

      {/* Charts Section */}
      <DashboardCharts />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Requests */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <MessageSquare size={20} className="mr-2 text-[#b8860b]" /> 
            Son Talepler
          </h3>
          <div className="space-y-4">
            {recentRequests.length > 0 ? recentRequests.map((req) => (
              <div key={req.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{req.name}</p>
                    <p className="text-xs text-gray-500">{req.service}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">YENİ</span>
              </div>
            )) : (
              <p className="text-gray-400 text-sm italic py-4">Henüz yeni talep bulunmuyor.</p>
            )}
          </div>
        </div>

        {/* Activity Log */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <Clock size={20} className="mr-2 text-[#b8860b]" /> 
            Sistem Hareketleri
          </h3>
          <div className="space-y-6">
            {logs.length > 0 ? logs.map((log) => (
              <div key={log.id} className="flex space-x-4">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-[#b8860b] mt-2"></div>
                  <div className="absolute top-4 left-1 w-[1px] h-full bg-gray-100"></div>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{log.action}</p>
                  <p className="text-xs text-gray-500 mt-1">{log.user} • {new Date(log.createdAt).toLocaleTimeString()}</p>
                </div>
              </div>
            )) : (
              <p className="text-gray-400 text-sm italic py-4">Sistem hareketi kaydedilmemiş.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
