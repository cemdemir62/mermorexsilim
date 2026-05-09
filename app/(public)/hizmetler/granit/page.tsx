import { Metadata } from "next";
import MaterialServicePage from "@/components/public/MaterialServicePage";

export const metadata: Metadata = {
  title: "Granit Silim & Kristalizasyon | Mermorex Silim",
  description: "Profesyonel granit silim, parlatma ve kristalizasyon hizmetleri. İstanbul ve çevresi için 7/24 keşif. Hemen teklif alın.",
  keywords: "granit silim, granit parlatma, granit kristalizasyon, granit zemin bakımı, doğal taş silim",
};

export default function GranitPage() {
  return (
    <MaterialServicePage
      slug="granit"
      title="Granit"
      image="/images/blog-1.png"
      materialImage="/images/gallery-2.png"
      materialInfo={{
        hardness: "Mohs 6-7 (Çok Sert)",
        porosity: "Düşük / Orta",
        usage: "Zemin, Tezgah, Dış Cephe",
        maintenance: "2-3 Yılda Bir"
      }}
      processes={[
        {
          title: "Yüzey Analizi & Ön Temizlik",
          desc: "Granit yüzey lekeleri, mineraller ve birikim analiz edilir. Kimyasal ön işlem ile derin kirler gevşetilir.",
          time: "30-60 dk",
          method: "pH-nötr çözücü"
        },
        {
          title: "Elmas Disk ile Silim",
          desc: "200-400-800-1500-3000 grit sırasıyla kuru/yaş silim yapılır. Her aşama yüzeyin parlaklık kazanmasını sağlar.",
          time: "2-5 saat / 100m²",
          method: "Elmas disk silim makinesi"
        },
        {
          title: "Kristal Parlatma & Koruma",
          desc: "Oxalic acid bazlı kristalizasyon işlemi uygulanır. Son kat nano-sealer ile yüzey korunur.",
          time: "1-2 saat",
          method: "Granit kristalizatör + sealer"
        }
      ]}
      faqs={[
        {
          q: "Granit hiç çizilir mi?",
          a: "Granit çok sert bir taştır ancak kum ve sert metaller zamanla mikro çizikler oluşturabilir. Profesyonel silim ile bu çizikler tamamen giderilebilir."
        },
        {
          q: "Ne kadar sürer?",
          a: "Granit mermere göre daha sert olduğu için silim süreci biraz daha uzundur. Ortalama 100m² alan 2-3 günde tamamlanır."
        }
      ]}
    />
  );
}
