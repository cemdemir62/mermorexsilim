import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/public/WhatsAppButton";
import { LanguageProvider } from "@/lib/LanguageContext";
import VisitorTracker from "@/components/public/VisitorTracker";
import { cookies } from "next/headers";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Mermorex Silim | Profesyonel Mermer Silim ve Parlatma",
  description: "İstanbul mermer silim, parlatma, restorasyon ve kristalize cila hizmetleri. 20 yıllık tecrübe ile kusursuz işçilik.",
  keywords: "mermer silim, mermer parlatma, mermer restorasyon, istanbul mermer silim, beton parlatma",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("locale")?.value || "tr") as any;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Mermorex Silim",
    "image": "https://www.mermorexsilim.com.tr/images/hero.png",
    "@id": "https://www.mermorexsilim.com.tr",
    "url": "https://www.mermorexsilim.com.tr",
    "telephone": "+905XXXXXXXXX",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "İstanbul",
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
    <html lang={locale} className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <LanguageProvider initialLocale={locale}>
          <VisitorTracker />
          {children}
          <WhatsAppButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
