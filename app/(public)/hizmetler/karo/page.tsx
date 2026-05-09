import { Metadata } from "next";
import MaterialServicePage from "@/components/public/MaterialServicePage";

export const metadata: Metadata = {
  title: "Karo & Seramik Zemin Bakımı | Mermorex Silim",
  description: "Porselen ve seramik karo zeminler için derin temizleme, fuga beyazlatma ve kaymaz kaplama hizmetleri.",
  keywords: "karo temizleme, seramik zemin bakımı, fuga beyazlatma, porselen karo parlatma, anti-slip kaplama",
};

export default function KaroPage() {
  return (
    <MaterialServicePage
      slug="karo"
      title="Karo & Seramik"
      image="/images/gallery-1.png"
      materialImage="/images/service-1.png"
      materialInfo={{
        hardness: "Mohs 5-8 (Sert)",
        porosity: "Düşük (Sırlı)",
        usage: "İç Mekan Zemin, Mutfak",
        maintenance: "Yıllık Temizlik"
      }}
      processes={[
        {
          title: "Kireç & Sabun Artığı Temizleme",
          desc: "Özel asit bazlı temizleyici ile zemin yüzey kireç birikimi giderilir.",
          time: "1-2 saat",
          method: "Kimyasal Yıkama"
        },
        {
          title: "Fuga Beyazlatma",
          desc: "Fuga hatları özel fuga temizleyici ile parlatılır. İsteğe bağlı renk eşleştirmeli boya uygulanır.",
          time: "2-3 saat",
          method: "Buharlı Temizlik / Boyama"
        },
        {
          title: "Karo Parlatma",
          desc: "Diamond pad ile mat karoların parlaklığı artırılır. Mikro çizikler yok edilir.",
          time: "3-6 saat",
          method: "Yüksek Devirli Parlatma"
        },
        {
          title: "Anti-Slip Kaplama",
          desc: "Islak zemin güvenliği için şeffaf kaymaz kaplama uygulanır. Havuz kenarları için idealdir.",
          time: "1-2 saat",
          method: "Poliüretan Kaplama"
        }
      ]}
      faqs={[
        {
          q: "Kaymaz kaplama görünümü bozar mı?",
          a: "Hayır, tamamen şeffaftır ve zeminin dokusunu veya rengini değiştirmez. Sadece sürtünme katsayısını artırır."
        },
        {
          q: "Fugalar tekrar kararır mı?",
          a: "Uyguladığımız koruyucu sealer sayesinde fugalar kire ve suya karşı dirençli hale gelir, kararma süresi 4-5 kat uzar."
        }
      ]}
    />
  );
}
