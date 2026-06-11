import { Metadata } from "next";
import prisma from "@/lib/prisma";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Zemin Bakım ve Silim Bloğu | Mermorex Silim",
  description: "Mermer bakımı, beton silim teknolojileri, cila uygulama teknikleri ve doğal taş temizliği hakkında faydalı bilgiler ve rehberler.",
  keywords: "mermer bakım rehberi, doğal taş temizliği, zemin silim ipuçları, mermorex silim blog",
};

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return <BlogClient posts={posts} />;
}
