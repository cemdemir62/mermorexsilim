import { Metadata } from "next";
import MaterialServicePage from "@/components/public/MaterialServicePage";

export const metadata: Metadata = {
  title: "Cilasız Mat Beton Zemin Silim & Tozumasızlık | Mermorex Silim",
  description: "Endüstriyel tesisler, fabrikalar, depolar ve otoparklar için kaymaz, tozumasız ve yüksek aşınma dirençli mat beton silim hizmetleri.",
  keywords: "cilasız beton, mat beton silimi, tozumasız zemin, endüstriyel beton silimi, otopark zemin bakımı, beton koruma",
};

export default function BetonCilasizPage() {
  return (
    <MaterialServicePage
      slug="beton-cilasiz"
      title="Cilasız (Mat) Beton"
      image="/images/beton-cilasiz.png"
      materialImage="/images/beton-cilasiz.png"
      materialInfo={{
        hardness: "Mohs 5-6 (Yüksek - Sertleştirilmiş)",
        porosity: "Düşük (Sıvı Sertleştiricili)",
        usage: "Otopark, Depo, Fabrika Hangar",
        maintenance: "3-5 Yılda Bir"
      }}
      processes={[
        {
          title: "Derinlemesine Temizlik & Kaba Taşlama",
          desc: "Eski boya, kaplama ve kir kalıntıları yüzeyden arındırılır, aşınmış beton katmanı tıraşlanır.",
          time: "6-12 saat",
          method: "Endüstriyel Taşlama"
        },
        {
          title: "Çatlak & Derz Onarımı",
          desc: "Zemindeki çatlaklar, kırıklar ve derz boşlukları yüksek mukavemetli epoksi harç ile doldurularak düzleştirilir.",
          time: "3-6 saat",
          method: "Epoksi Tamir Dolgusu"
        },
        {
          title: "Sıvı Sertleştirici Uygulaması (Mat Koruma)",
          desc: "Yüzeye uygulanan sertleştiriciler ile tozuma tamamen engellenir ve zemine mat/yarı mat koruyucu bir yapı kazandırılır.",
          time: "1 gün",
          method: "Emprenye & Koruma"
        }
      ]}
      faqs={[
        {
          q: "Cilasız mat beton siliminin avantajı nedir?",
          a: "Çok daha ekonomiktir, kaymazlık direnci yüksektir, tozumayı %100 keser ve ağır sanayi koşullarına, forklift trafiğine son derece dayanıklıdır."
        },
        {
          q: "Tozumasız zemin garantisi var mıdır?",
          a: "Evet. Kullandığımız reaktif sıvı silikatlar betonun kalsiyum hidroksit yapısıyla birleşerek betonu kalıcı olarak sertleştirir ve tozumayı tamamen sonlandırır."
        }
      ]}
    />
  );
}
