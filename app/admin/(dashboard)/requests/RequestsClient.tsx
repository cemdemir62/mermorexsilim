"use client";

import { useState } from "react";
import { updateRequestStatus } from "@/lib/actions";
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Phone, 
  MessageSquare,
  MoreVertical,
  Calendar
} from "lucide-react";

const statuses = [
  { id: "NEW", label: "Yeni", color: "bg-blue-50 text-blue-600", icon: <Clock size={16} /> },
  { id: "CONTACTED", label: "İletişime Geçildi", color: "bg-amber-50 text-amber-600", icon: <Phone size={16} /> },
  { id: "COMPLETED", label: "Tamamlandı", color: "bg-green-50 text-green-600", icon: <CheckCircle2 size={16} /> },
  { id: "REJECTED", label: "İptal", color: "bg-red-50 text-red-600", icon: <XCircle size={16} /> },
];

export default function RequestsClient({ initialRequests }: { initialRequests: any[] }) {
  const [requests, setRequests] = useState(initialRequests);
  const [loading, setLoading] = useState<string | null>(null);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setLoading(id);
    const res = await updateRequestStatus(id, newStatus);
    if (res.success) {
      setRequests(requests.map(r => r.id === id ? { ...r, status: newStatus } : r));
    }
    setLoading(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-fade-in">
      {statuses.map((status) => (
        <div key={status.id} className="flex flex-col h-full min-h-[500px]">
          <div className="flex items-center justify-between mb-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center space-x-2">
              <div className={`p-2 rounded-lg ${status.color}`}>
                {status.icon}
              </div>
              <h3 className="font-bold text-gray-900">{status.label}</h3>
            </div>
            <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
              {requests.filter(r => r.status === status.id).length}
            </span>
          </div>

          <div className="space-y-4 flex-1">
            {requests.filter(r => r.status === status.id).map((req) => (
              <div 
                key={req.id} 
                className={`bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group ${loading === req.id ? "opacity-50 pointer-events-none" : ""}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{req.name}</h4>
                    <div className="flex flex-wrap gap-1">
                      <span className="text-[10px] font-black uppercase tracking-tighter bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">
                        {req.service}
                      </span>
                    </div>
                  </div>
                  <button className="text-gray-300 hover:text-gray-600">
                    <MoreVertical size={18} />
                  </button>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-xs text-gray-500">
                    <Phone size={14} className="mr-2" /> {req.phone}
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar size={14} className="mr-2" /> {new Date(req.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2 mb-6 bg-gray-50 p-3 rounded-xl">
                  {req.message}
                </p>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-50">
                  {statuses.filter(s => s.id !== status.id).map((s) => (
                    <button
                      key={s.id}
                      onClick={() => handleStatusChange(req.id, s.id)}
                      className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border border-gray-100 hover:border-gray-200 transition-all ${s.color.split(' ')[1]} bg-white hover:bg-gray-50`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
