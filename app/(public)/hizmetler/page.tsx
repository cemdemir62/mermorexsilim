import { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Zemin Silim ve Restorasyon Hizmetleri | Mermorex Silim",
  description: "Mermer silim, granit kristalizasyon, çini temizleme, beton parlatma, mozaik restorasyonu ve karo bakımı. Mermorex uzmanlığı ile profesyonel çözümler.",
  keywords: "zemin restorasyon, mermer parlatma hizmeti, endüstriyel beton silim, çini fuga yenileme, mermorex silim",
};

export default function Page() {
  return <ServicesClient />;
}
