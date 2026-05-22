import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import UTMTracker from "@/components/utm-tracker";
import { SITE_URL, SITE_NAME } from "@/lib/data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Grand Polo Club & Resort by Emaar | Luxury Equestrian Villas in Dubai",
    template: "%s | Grand Polo Club & Resort",
  },
  description:
    "Grand Polo Club & Resort by Emaar — Dubai's premier equestrian community. 3 polo fields, luxury clubhouse, private stables, and 6,661 residences across 22 clusters. Villas from AED 7.34M. Golden Visa eligible.",
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
    images: [{ url: "/images/hero/chevalia-estate-2-hero.jpg", width: 1200, height: 630, alt: "Grand Polo Club & Resort" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grand Polo Club & Resort by Emaar",
    description: "Dubai's premier equestrian community. 3 polo fields, luxury villas from AED 7.34M.",
    images: ["/images/hero/chevalia-estate-2-hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
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
  sameAs: ["https://www.oasisemaar.com", "https://theoasisemaar.com", "https://www.emaar.com"],
  areaServed: { "@type": "Place", name: "Dubai, UAE" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What is Grand Polo Club & Resort?", acceptedAnswer: { "@type": "Answer", text: "Grand Polo Club & Resort is Emaar Properties' flagship equestrian-themed masterplan community in Dubai spanning 5.54 million square metres with three polo fields, a luxury clubhouse, private stables, and 6,661 residences across 22 clusters." } },
    { "@type": "Question", name: "Where is Grand Polo located?", acceptedAnswer: { "@type": "Answer", text: "Grand Polo Club & Resort is located near Al Maktoum International Airport in Dubai, just 5 minutes from the airport, 10 minutes from Expo City, and 30 minutes from Downtown Dubai." } },
    { "@type": "Question", name: "What are the starting prices at Grand Polo?", acceptedAnswer: { "@type": "Answer", text: "Prices start from AED 7.34 million for a 4-bedroom villa in Chevalia Fields, AED 7.88 million in Chevalia Estate 2, and AED 9 million in Chevalia Estate." } },
    { "@type": "Question", name: "Is Grand Polo eligible for the Golden Visa?", acceptedAnswer: { "@type": "Answer", text: "Yes, all properties at Grand Polo qualify for the UAE Golden Visa as they are all priced above the AED 2 million threshold. The Golden Visa grants 10-year residency for the property owner and their family." } },
    { "@type": "Question", name: "What payment plans are available?", acceptedAnswer: { "@type": "Answer", text: "All clusters offer 10% down payment with instalments of 10% at construction milestones and 20% on completion." } },
    { "@type": "Question", name: "What amenities does Grand Polo offer?", acceptedAnswer: { "@type": "Answer", text: "Grand Polo offers 23 amenities including three polo fields, a luxury clubhouse, private stables, riding arenas, galloping fountain, art pavilion, padel courts, fitness areas, and more." } },
    { "@type": "Question", name: "Who is the developer?", acceptedAnswer: { "@type": "Answer", text: "Grand Polo Club & Resort is developed by Emaar Properties PJSC, the developer of Burj Khalifa, Dubai Mall, and other iconic Dubai landmarks." } },
    { "@type": "Question", name: "When is the handover?", acceptedAnswer: { "@type": "Answer", text: "Handover dates vary by cluster: Chevalia Fields Q1 2029, Chevalia Estate 2 Q2 2029, Chevalia Estate Q4 2028." } },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Grand Polo Club & Resort",
  url: SITE_URL,
  potentialAction: { "@type": "SearchAction", target: `${SITE_URL}/projects?q={search_term_string}`, "query-input": "required name=search_term_string" },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Grand Polo Club & Resort",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  sameAs: ["https://www.oasisemaar.com", "https://theoasisemaar.com", "https://www.emaar.com"],
  foundingLocation: { "@type": "Place", name: "Dubai, UAE" },
  knowsAbout: ["Equestrian Real Estate", "Luxury Villas Dubai", "Polo Club Community", "Off-Plan Property Dubai"],
};

const residenceSchema = {
  "@context": "https://schema.org",
  "@type": ["Residence", "ApartmentComplex"],
  name: "Grand Polo Club & Resort",
  description: "Emaar's flagship equestrian community with 3 polo fields, clubhouse, and 6,661 luxury villas",
  numberOfRooms: { "@type": "QuantitativeValue", minValue: 4, maxValue: 5, unitCode: "C62" },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Polo Fields", value: "3 Championship Fields" },
    { "@type": "LocationFeatureSpecification", name: "Clubhouse", value: "5,600 SqM Luxury Clubhouse" },
    { "@type": "LocationFeatureSpecification", name: "Stables", value: "Private Horse Stables" },
    { "@type": "LocationFeatureSpecification", name: "Riding Arenas", value: "3 Jumping Arenas" },
    { "@type": "LocationFeatureSpecification", name: "Padel Courts", value: "Available" },
    { "@type": "LocationFeatureSpecification", name: "Fitness Area", value: "Community Gym" },
  ],
};

const ratingSchema = {
  "@context": "https://schema.org",
  "@type": "AggregateRating",
  itemReviewed: { "@type": "RealEstateAgent", name: "Grand Polo Club & Resort" },
  ratingValue: "4.9",
  bestRating: "5",
  ratingCount: "98",
  reviewCount: "84",
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "SpeakableSpecification",
  xpath: ["/html/body/main/section[1]", "/html/body/main/section[2]"],
  cssSelector: ["#hero-section", "#properties-section"],
};

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "EventSeries",
  name: "Grand Polo Property Viewings",
  description: "Exclusive property viewings at Grand Polo Club & Resort by Emaar",
  organizer: { "@type": "Organization", name: "Grand Polo Club & Resort" },
  location: { "@type": "Place", name: "Grand Polo Club & Resort", address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" } },
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "7340000",
    highPrice: "20000000",
    priceCurrency: "AED",
    offerCount: "379",
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Buy a Villa at Grand Polo Club & Resort",
  description: "Step-by-step guide to purchasing your luxury equestrian villa at Grand Polo",
  estimatedCost: { "@type": "MonetaryAmount", currency: "AED", value: "7340000" },
  tool: [{ "@type": "HowToTool", name: "Emaar Booking Portal" }, { "@type": "HowToTool", name: "UAE ID / Passport" }],
  step: [
    { "@type": "HowToStep", name: "Register Interest", text: "Fill out the enquiry form with your details and property preferences", position: 1 },
    { "@type": "HowToStep", name: "Consultation", text: "Speak with our property consultants to discuss options and budget", position: 2 },
    { "@type": "HowToStep", name: "Site Visit", text: "Visit the Grand Polo site and view the polo fields, clubhouse, and stables", position: 3 },
    { "@type": "HowToStep", name: "Select Unit", text: "Choose your preferred villa type, cluster, and unit number", position: 4 },
    { "@type": "HowToStep", name: "Pay Down Payment", text: "Pay 10% down payment to secure your villa booking", position: 5 },
    { "@type": "HowToStep", name: "DLD Registration", text: "Complete Dubai Land Department registration and Oqood", position: 6 },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1013154287947335";
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

        {/* Hreflang */}
        <link rel="alternate" hrefLang="en" href={SITE_URL} />
        <link rel="alternate" hrefLang="x-default" href={SITE_URL} />

        {/* JSON-LD Schemas */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(residenceSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ratingSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      </head>
      <body className="min-h-full flex flex-col bg-[#5D3A1A] text-[#FFFAF3]">
        <UTMTracker />
        {children}
      </body>
    </html>
  );
}
