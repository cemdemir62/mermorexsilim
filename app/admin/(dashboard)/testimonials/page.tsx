import prisma from "@/lib/prisma";
import TestimonialsClient from "./TestimonialsClient";

export default async function TestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Müşteri Yorumları</h2>
      </div>
      
      <TestimonialsClient initialItems={testimonials} />
    </div>
  );
}
