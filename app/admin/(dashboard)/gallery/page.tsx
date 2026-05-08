import prisma from "@/lib/prisma";
import GalleryClient from "./GalleryClient";

export default async function GalleryPage() {
  const items = await prisma.galleryItem.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Galeri Yönetimi</h2>
      </div>
      
      <GalleryClient initialItems={items} />
    </div>
  );
}
