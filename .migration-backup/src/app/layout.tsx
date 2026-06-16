import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const display = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const siteUrl = siteConfig.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ExSell Academy — The career launchpad for future sales professionals",
    template: "%s · ExSell Academy",
  },
  description:
    "Certified online sales training, funded learning pathways, and real employer opportunities. Learn, certify and get placed with ExSell Academy.",
  keywords: [
    "sales training",
    "CPD certification",
    "funded training",
    "sales careers",
    "recruitment",
    "school leavers",
    "ExSell Academy",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "ExSell Academy — The career launchpad for future sales professionals",
    description:
      "Certified online sales training, funded learning pathways, and real employer opportunities.",
    siteName: "ExSell Academy",
  },
  twitter: {
    card: "summary_large_image",
    title: "ExSell Academy",
    description:
      "Certified online sales training, funded learning pathways, and real employer opportunities.",
  },
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
  manifest: "/manifest.webmanifest",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  logo: `${siteConfig.url}/icon`,
  email: siteConfig.email,
  sameAs: [
    siteConfig.social.linkedin,
    siteConfig.social.instagram,
    siteConfig.social.tiktok,
    siteConfig.social.youtube,
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-ink antialiased">
        <JsonLd data={organizationSchema} />
        {children}
      </body>
    </html>
  );
}
