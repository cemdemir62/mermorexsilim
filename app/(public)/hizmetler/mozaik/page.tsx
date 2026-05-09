import { Metadata } from "next";
import MaterialServicePage from "@/components/public/MaterialServicePage";

export const metadata: Metadata = {
  title: "Mozaik Yüzey Restorasyon | Mermorex Silim",
  description: "Havuz, banyo ve sanat duvarlarındaki mozaik yüzeyler için profesyonel restorasyon ve koruma hizmetleri.",
  keywords: "mozaik restorasyon, mozaik temizleme, havuz mozaik, mozaik onarım, mozaik bakımı",
};

export default function MozaikPage() {
  return (
    <MaterialServicePage
      slug="mozaik"
      title="Mozaik"
      image="/images/blog-3.png"
      materialImage="/images/gallery-4.png"
      materialInfo={{
        hardness: "Kategori C (Çeşitli)",
        porosity: "Yüksek (Derzler nedeniyle)",
        usage: "Havuz, Banyo, Sanat Duvarı",
        maintenance: "2 Yılda Bir"
      }}
      processes={[
        {
          title: "Parça Bütünlük Kontrolü",
          desc: "Kopuk, çatlak veya oynak parçalar tespit edilir. Kırık parçalar özel yapıştırıcı ile sabitlenir.",
          time: "1-2 saat",
          method: "Manuel Kontrol"
        },
        {
          title: "Hassas Yüzey Temizleme",
          desc: "Küçük parçalar arası birikim özel fırça ve çözücüyle temizlenir. Asit kullanımından kaçınılır.",
          time: "2-4 saat",
          method: "Yumuşak Fırça + Çözücü"
        },
        {
          title: "Yüzey Düzleştirme & Cila",
          desc: "Yükseklik farkı varsa ince disk ile düzleştirme yapılır. Şeffaf sealer ile yüzey korunur.",
          time: "3-5 saat",
          method: "İnce Elmas Disk"
        }
      ]}
      faqs={[
        {
          q: "Havuz mozaikleri neden dökülür?",
          a: "Genellikle yanlış kimyasal kullanımı ve derz aşınması nedeniyle su arkaya sızar. Bizim koruyucu sealer işlemimiz bu sızıntıları engeller."
        },
        {
          q: "Restorasyon sonrası renk değişir mi?",
          a: "Hayır, mozaiklerin doğal rengi korunur ancak yüzeydeki kireç tabakası kalktığı için daha canlı görünürler."
        }
      ]}
    />
  );
}
