import { Metadata } from "next";
import MaterialServicePage from "@/components/public/MaterialServicePage";

export const metadata: Metadata = {
  title: "Paledyen & Traverten Silim | Mermorex Silim",
  description: "Gözenekli doğal taş yüzeyler için dolgu, silim, kristalizasyon ve uzun ömürlü koruma hizmetleri.",
  keywords: "traverten silim, paledyen silim, traverten dolgu, doğal taş restorasyon, traverten parlatma",
};

export default function PaledyenPage() {
  return (
    <MaterialServicePage
      slug="paledyen-traverten"
      title="Paledyen & Traverten"
      image="/images/gallery-3.png"
      materialImage="/images/service-3.png"
      materialInfo={{
        hardness: "Mohs 3-4 (Yumuşak)",
        porosity: "Yüksek",
        usage: "Zemin, Teras, Bahçe",
        maintenance: "1-2 Yılda Bir"
      }}
      processes={[
        {
          title: "Gözenek Analizi & Ön Temizlik",
          desc: "Gözenek yapısı incelenir; kir ve nem birikimi tespit edilir. Hafif asidik ön yıkama yapılır.",
          time: "1 saat",
          method: "Kimyasal Analiz"
        },
        {
          title: "Gözenek Dolgusu",
          desc: "Doldurma macunu veya özel travertine dolgusu ile büyük gözenekler kapatılır. Renk eşleştirmesi yapılır.",
          time: "2-4 saat",
          method: "Travertine Fill"
        },
        {
          title: "Silim & Parlatma",
          desc: "50-100-200-400 grit disk sırasıyla uygulanır. Kuru silim tercih edilerek taş korunur.",
          time: "4-6 saat",
          method: "Elmas Disk Silim"
        },
        {
          title: "Kristalizasyon & Koruma",
          desc: "Taş uyumlu kristalizatör ve nüfuz edici sealer ile yüzey sertleştirilir ve neme karşı korunur.",
          time: "2 saat",
          method: "Kristalizatör + Penetrating Sealer"
        }
      ]}
      faqs={[
        {
          q: "Traverten delikleri tekrar açılır mı?",
          a: "Dolgularımız taşın ömrüyle eşdeğerdir; ancak ağır darbe ve yanlış kimyasal kullanımı dolgulara zarar verebilir. Normal kullanımda açılmaz."
        },
        {
          q: "Traverten ile Paledyen arasındaki fark nedir?",
          a: "Traverten doğal bir taştır; paledyen ise farklı taş parçalarının beton veya harç ile birleştirilmesiyle oluşur. Her ikisi de gözeneklidir ve özel bakım gerektirir."
        }
      ]}
    />
  );
}
