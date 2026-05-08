import prisma from "@/lib/prisma";
import RequestsClient from "./RequestsClient";

export default async function RequestsPage() {
  const requests = await prisma.contactRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Talep Yönetimi</h1>
        <p className="text-gray-500 mt-2">Gelen müşteri taleplerini aşama aşama yönetin.</p>
      </div>
      
      <RequestsClient initialRequests={requests} />
    </div>
  );
}
