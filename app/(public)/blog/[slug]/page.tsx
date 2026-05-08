import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post || !post.published) notFound();

  return <BlogPostClient post={post} />;
}
