import prisma from "@/lib/prisma";
import ContentClient from "./ContentClient";

export default async function ContentPage() {
  const settings = await prisma.setting.findMany();
  
  // Convert settings array to object
  const settingsMap: Record<string, string> = {};
  settings.forEach(s => {
    settingsMap[s.key] = s.value;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-gray-900">Site İçerik Editörü</h2>
          <p className="text-gray-500 text-sm mt-1">Sitenizdeki tüm metinleri, başlıkları ve açıklamaları dinamik olarak güncelleyin.</p>
        </div>
      </div>
      
      <ContentClient initialSettings={settingsMap} />
    </div>
  );
}
