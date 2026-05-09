import { Metadata } from "next";
import MaterialServicePage from "@/components/public/MaterialServicePage";

export const metadata: Metadata = {
  title: "Çini Temizleme & Fuga Yenileme | Mermorex Silim",
  description: "Eski ve yeni çinilerde profesyonel temizleme, fuga yenileme ve sır restorasyon hizmetleri. Ücretsiz keşif.",
  keywords: "çini temizleme, fuga yenileme, çini restorasyon, banyo çini bakımı, mutfak çini temizleme",
};

export default function CiniPage() {
  return (
    <MaterialServicePage
      slug="cini"
      title="Çini"
      image="/images/blog-2.png"
      materialImage="/images/gallery-3.png"
      materialInfo={{
        hardness: "Kategori B (Hassas)",
        porosity: "Orta / Yüksek",
        usage: "Duvar, Dekoratif Zemin",
        maintenance: "1-2 Yılda Bir"
      }}
      processes={[
        {
          title: "Fuga & Yüzey Analizi",
          desc: "Çatlak, renk bozulması ve fuga durumu belgelenir. Hasarlı bölgeler tespit edilir.",
          time: "20-40 dk",
          method: "Gözlemsel Analiz"
        },
        {
          title: "Kimyasal Derin Temizleme",
          desc: "Kireç, sabun artığı ve pas lekeleri özel çözücüyle temizlenir. Sır tabakasına zarar verilmez.",
          time: "1-2 saat",
          method: "Aside dayanıklı temizleyici"
        },
        {
          title: "Fuga Yenileme",
          desc: "Bozulan fugalar kazınır, renk eşleştirilerek yeniden doldurulur. Yüzey bütünlüğü sağlanır.",
          time: "Mekana göre",
          method: "Fuga Dolgu"
        },
        {
          title: "Sır Koruma Kaplaması",
          desc: "Çini yüzeyine nano kaplama uygulanır. Leke direnci ve parlaklık artırılır.",
          time: "2-3 saat",
          method: "Nano Sealer"
        }
      ]}
      faqs={[
        {
          q: "Eski çiniler restore edilebilir mi?",
          a: "Evet, yüzeydeki sır tabakası tamamen yok olmamışsa derinlemesine temizlik ve koruma ile eski ihtişamına dönebilir."
        },
        {
          q: "Temizlik sonrası renkler canlanır mı?",
          a: "Kesinlikle. Yüzeydeki kireç ve kir tabakası kalktığında çininin orijinal renkleri ortaya çıkar."
        }
      ]}
    />
  );
}
