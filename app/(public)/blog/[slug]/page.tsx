import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post) {
    return {
      title: "Blog Yazısı Bulunamadı | Mermorex Silim",
    };
  }

  return {
    title: `${post.title} | Mermorex Silim Blog`,
    description: post.seoDescription || `${post.title} hakkında detaylı bilgi, rehber ve zemin bakım ipuçları.`,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post || !post.published) notFound();

  return <BlogPostClient post={post} />;
}
