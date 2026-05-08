import { SERVICES } from "@/lib/constants";
import { notFound } from "next/navigation";
import ServiceDetailClient from "./ServiceDetailClient";

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const service = SERVICES.find(s => s.slug === slug);

  if (!service) notFound();

  return <ServiceDetailClient service={service} />;
}
