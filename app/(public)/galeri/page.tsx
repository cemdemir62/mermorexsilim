import { Metadata } from "next";
import prisma from "@/lib/prisma";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Uygulama Portfolyomuz ve Galeri | Mermorex Silim",
  description: "Mermer, beton, granit, çini ve diğer zemin silim ve parlatma projelerimizin önce/sonra fotoğrafları ve çalışma galerisi.",
  keywords: "mermer silim görselleri, parlatma galerisi, zemin restorasyon fotoğrafları, mermorex silim portfolyo",
};

export default async function GalleryPage() {
  const items = await prisma.galleryItem.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <GalleryClient items={items} />;
}
