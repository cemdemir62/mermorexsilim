import prisma from "@/lib/prisma";
import GalleryClient from "./GalleryClient";

export default async function GalleryPage() {
  const items = await prisma.galleryItem.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <GalleryClient items={items} />;
}
