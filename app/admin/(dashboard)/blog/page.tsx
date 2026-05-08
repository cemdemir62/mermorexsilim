import prisma from "@/lib/prisma";
import BlogClient from "./BlogClient";

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Blog Yönetimi</h2>
      </div>
      
      <BlogClient initialPosts={posts} />
    </div>
  );
}
