import { Metadata } from "next";
import Script from "next/script";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Mermorex Silim | Profesyonel Mermer Silim ve Parlatma Hizmetleri",
  description: "İstanbul genelinde mermer silim, parlatma, granit ve beton zemin temizleme hizmetleri. Mermorex Silim kalitesiyle mekanlarınıza ışıltı katın.",
  keywords: "mermer silim, mermer parlatma, zemin temizleme, kristalize cila, beton silimi, mermorex silim",
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Mermorex Silim",
    "image": "https://www.mermorexsilim.com.tr/images/hero.png",
    "@id": "https://www.mermorexsilim.com.tr",
    "url": "https://www.mermorexsilim.com.tr",
    "telephone": "+905551234567",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "İstanbul Merkez",
      "addressLocality": "İstanbul",
      "addressRegion": "TR",
      "postalCode": "34000",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.0082,
      "longitude": 28.9784
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "19:00"
    }
  };

  return (
    <>
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  );
}
