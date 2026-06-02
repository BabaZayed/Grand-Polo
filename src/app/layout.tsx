import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import UTMTracker from "@/components/utm-tracker";
import { SITE_URL, SITE_NAME } from "@/lib/data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Grand Polo Club & Resort by Emaar | Luxury Equestrian Villas in Dubai",
    template: "%s | Grand Polo Club & Resort",
  },
  description:
    "Grand Polo Club & Resort by Emaar — Dubai's premier equestrian community. 3 polo fields, luxury clubhouse, private stables, 6,661 residences. Villas from AED 7.34M.",
  keywords: [
    "grand polo dubai", "emaar polo club", "equestrian villas dubai", "chevalia estate",
    "chevalia fields", "polo fields dubai", "luxury villa dubai", "emaar grand polo",
    "dubai polo community", "equestrian real estate dubai", "off plan villa dubai",
    "golden visa dubai property", "emaar off plan dubai", "dubai luxury community",
  ],
  authors: [{ name: "Grand Polo Club & Resort" }],
  creator: "Grand Polo Club & Resort",
  publisher: "Emaar Properties PJSC",
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Grand Polo Club & Resort by Emaar | Luxury Equestrian Villas in Dubai",
    description:
      "Dubai's premier equestrian community. 3 polo fields, luxury clubhouse, private stables, and 6,661 residences. Villas from AED 7.34M.",
    images: [{ url: "/images/hero/hero-dark.webp", width: 1200, height: 630, alt: "Grand Polo Club & Resort — Luxury Equestrian Villas in Dubai" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Grand Polo Club & Resort by Emaar",
    description: "Dubai's premier equestrian community. 3 polo fields, luxury villas from AED 7.34M.",
    images: ["/images/hero/hero-dark.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
  alternates: { canonical: SITE_URL },
};

// JSON-LD Schemas
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "RealEstateAgent"],
  name: "Grand Polo Club & Resort — Authorized Agent",
  description: "Authorized sales agent for Grand Polo Club & Resort by Emaar Properties in Dubai",
  url: SITE_URL,
  telephone: "+971526919169",
  email: "info@thegrandpolo.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Grand Polo Club & Resort",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  geo: { "@type": "GeoCoordinates", latitude: 24.9, longitude: 55.2 },
  openingHoursSpecification: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "09:00", closes: "19:00" },
  priceRange: "AED 7.34M - AED 20M+",
  sameAs: ["https://facebook.com/grandpoloclub", "https://instagram.com/grandpoloclub", "https://www.oasisemaar.com", "https://www.emaar.com"],
  areaServed: { "@type": "Place", name: "Dubai, UAE" },
};

// FAQ schema removed from global layout — it now only renders on the /faq page (faq-content.tsx)
// This prevents structured data violations (FAQPage should only be on pages with visible Q&A content)

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Grand Polo Club & Resort",
  url: SITE_URL,
  // SearchAction removed — no search functionality exists on /projects yet
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Grand Polo Club & Resort",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  sameAs: ["https://facebook.com/grandpoloclub", "https://instagram.com/grandpoloclub", "https://twitter.com/grandpoloclub", "https://linkedin.com/company/grandpoloclub", "https://youtube.com/@grandpoloclub"],
  foundingLocation: { "@type": "Place", name: "Dubai, UAE" },
  knowsAbout: ["Equestrian Real Estate", "Luxury Villas Dubai", "Polo Club Community", "Off-Plan Property Dubai"],
};

// Removed low-value schemas (Residence, Speakable, EventSeries, HowTo) to reduce HTML bloat by ~15KB
// Kept the 4 highest-impact schemas: LocalBusiness, FAQ, WebSite, Organization

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1510715397129819";
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-QPQCZZ61FN";

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <head>
        {/* Meta Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(e,t,n,o,a,c,f){e.fbq||(a=e.fbq=function(){a.callMethod?a.callMethod.apply(a,arguments):a.queue.push(arguments)},e._fbq||(e._fbq=a),a.push=a,a.loaded=!0,a.version="2.0",a.queue=[])}(window,document,"script","https://connect.facebook.net/en_US/fbevents.js");fbq("init","${pixelId}");fbq("track","PageView");`,
          }}
        />
        <noscript>
          <img height="1" width="1" style={{ display: "none" }} src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`} alt="" />
        </noscript>

        {/* Google Analytics */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","${gaId}");`,
          }}
        />

        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#5D3A1A" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Grand Polo" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />

        {/* Geo Meta Tags */}
        <meta name="geo.region" content="AE-DU" />
        <meta name="geo.placename" content="Dubai" />
        <meta name="geo.position" content="24.9;55.2" />
        <meta name="ICBM" content="24.9, 55.2" />

        {/* Hreflang removed — localized pages (/ar, /zh, etc.) don't exist yet. Add back when built. */}

        {/* JSON-LD Schemas — 3 global schemas. FAQ schema only on /faq page */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      </head>
      <body className="min-h-full flex flex-col bg-[#5D3A1A] text-[#FFFAF3]">
        {/* Skip to content - Accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#D4AF37] focus:text-[#2A1506] focus:rounded-md focus:font-semibold">
          Skip to main content
        </a>
        <UTMTracker />
        {children}
      </body>
    </html>
  );
}
