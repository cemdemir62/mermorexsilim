import prisma from "@/lib/prisma";
import SettingsClient from "./SettingsClient";

export default async function SettingsPage() {
  const settings = await prisma.setting.findMany();
  
  // Convert settings array to object
  const settingsMap: Record<string, string> = {};
  settings.forEach(s => {
    settingsMap[s.key] = s.value;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Genel Ayarlar</h2>
      </div>
      
      <SettingsClient initialSettings={settingsMap} />
    </div>
  );
}
