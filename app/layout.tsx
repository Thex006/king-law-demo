import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { SmoothScroll } from "@/components/smooth-scroll";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "The King Law Office | Criminal defense attorney in Savannah, GA",
  description: site.description,
  // Concept build for a pitch: keep it out of search results.
  robots: { index: false, follow: false },
  openGraph: {
    title: "The King Law Office, Savannah criminal defense",
    description: site.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "The King Law Office, 100 Bull St, Savannah" }],
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: site.legalName,
  telephone: "+1-912-470-9324",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.zip,
    addressCountry: "US",
  },
  areaServed: "Savannah, Georgia",
  employee: { "@type": "Person", name: site.attorney, jobTitle: "Criminal defense attorney" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <a
          href="#main"
          className="button-sm fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-brass px-4 py-2 text-ink transition-transform duration-300 ease-out-expo focus:translate-y-0"
        >
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
