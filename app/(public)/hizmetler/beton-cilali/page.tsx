import { Metadata } from "next";
import MaterialServicePage from "@/components/public/MaterialServicePage";

export const metadata: Metadata = {
  title: "Cilalı Beton Zemin Silim & Parlatma | Mermorex Silim",
  description: "Dekoratif ve endüstriyel zeminler için elmas pedlerle yüksek parlaklıkta cilalı beton silim ve parlatma hizmetleri.",
  keywords: "cilalı beton, beton parlatma, parlak beton silimi, lityum silikat beton, beton cilası, ayna parlaklığında beton",
};

export default function BetonCilaliPage() {
  return (
    <MaterialServicePage
      slug="beton-cilali"
      title="Cilalı Beton"
      image="/images/beton-cilali.png"
      materialImage="/images/beton-cilali.png"
      materialInfo={{
        hardness: "Mohs 6-7 (Çok Yüksek - Parlatma Sonrası)",
        porosity: "Çok Düşük (Sıkıştırılmış)",
        usage: "Ofis, Showroom, Otel, Konut",
        maintenance: "5-10 Yılda Bir"
      }}
      processes={[
        {
          title: "Kaba Silim & Düzleştirme",
          desc: "Zemindeki pürüzler ve seviye farkları metal bağlayıcılı elmaslar kullanılarak düzeltilir.",
          time: "4-8 saat",
          method: "Kaba Zımparalama"
        },
        {
          title: "Beton Sertleştirme (Lityum Silikat)",
          desc: "Beton mikroskobik düzeyde sıvı lityum silikat sertleştirici ile emprenye edilir ve tozuma tamamen engellenir.",
          time: "2-4 saat",
          method: "Kimyasal Mukavemet Artışı"
        },
        {
          title: "İnce Silim & Elmas Parlatma",
          desc: "Reçine bağlayıcılı ince elmas pedler ile aşamalı silim yapılarak ayna parlaklığında pürüzsüz bir yüzey elde edilir.",
          time: "1-2 gün",
          method: "Kademeli Parlatma"
        }
      ]}
      faqs={[
        {
          q: "Cilalı beton kaygan mıdır?",
          a: "Görünümü ayna gibi parlak olsa da, cilalı beton yüksek sürtünme katsayısına sahiptir ve kuru zeminlerde standart betondan daha az kaygandır."
        },
        {
          q: "Bakımı nasıl yapılır?",
          a: "Sadece nemli bir paspas ve pH nötr temizleyicilerle temizlenmesi yeterlidir. Ekstra cila veya balmumu gerektirmez."
        }
      ]}
    />
  );
}
