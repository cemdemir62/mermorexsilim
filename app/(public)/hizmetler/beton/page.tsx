import { Metadata } from "next";
import MaterialServicePage from "@/components/public/MaterialServicePage";

export const metadata: Metadata = {
  title: "Beton Zemin İşleme & Epoksi Kaplama | Mermorex Silim",
  description: "Endüstriyel ve dekoratif beton zeminler için zımparalama, çatlak dolgu ve epoksi kaplama hizmetleri.",
  keywords: "beton zemin parlatma, epoksi kaplama, beton zımparalama, mikro çimento bakımı, endüstriyel zemin",
};

export default function BetonPage() {
  return (
    <MaterialServicePage
      slug="beton"
      title="Beton"
      image="/images/gallery-2.png"
      materialImage="/images/service-2.png"
      materialInfo={{
        hardness: "Mohs 3-5 (Zayıf/Orta)",
        porosity: "Çok Yüksek",
        usage: "Otopark, Fabrika, Depo",
        maintenance: "3-5 Yılda Bir"
      }}
      processes={[
        {
          title: "Yüzey Hazırlama & Zımparalama",
          desc: "Kaba beton çıkıntıları elmas zımparalama ile düzleştirilir. Toz vakum sistemi ile emilir.",
          time: "4-8 saat",
          method: "Endüstriyel Zımpara"
        },
        {
          title: "Çatlak Dolgu & Onarım",
          desc: "Beton çatlakları poliüretan veya epoksi dolgu ile kapatılır. Zemin bütünlüğü sağlanır.",
          time: "2-4 saat",
          method: "Enjeksiyon / Dolgu"
        },
        {
          title: "Emprenye & Epoksi Kaplama",
          desc: "Zemin sertleştirici veya epoksi kaplama uygulanır. Tozumasız ve dayanıklı bir yüzey oluşturulur.",
          time: "1-2 gün",
          method: "Likit Cam / Epoksi"
        }
      ]}
      faqs={[
        {
          q: "Epoksi kaplama kayar mı?",
          a: "İsteğe bağlı olarak epoksi içerisine ince kum eklenerek kaymaz (orange peel) yüzey elde edilebilir."
        },
        {
          q: "Beton tozuması nasıl engellenir?",
          a: "Beton silim ve lityum silikat bazlı sertleştiriciler kullanarak betonun yapısını sıkılaştırıyor ve tozumasını %100 bitiriyoruz."
        }
      ]}
    />
  );
}
