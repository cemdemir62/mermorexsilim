import { Metadata } from "next";
import { SERVICES } from "@/lib/constants";
import { notFound } from "next/navigation";
import ServiceDetailClient from "./ServiceDetailClient";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find(s => s.slug === slug);

  if (!service) {
    return {
      title: "Hizmet Bulunamadı | Mermorex Silim",
    };
  }

  return {
    title: `${service.title} Silim ve Parlatma | Mermorex Silim`,
    description: service.fullDescription || `${service.title} zemin temizliği, silimi, parlatma ve koruyucu bakım uygulamaları.`,
    keywords: `${service.title.toLowerCase()} silim, ${service.title.toLowerCase()} parlatma, zemin bakımı, mermorex silim`,
  };
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const service = SERVICES.find(s => s.slug === slug);

  if (!service) notFound();

  return <ServiceDetailClient service={service} />;
}
