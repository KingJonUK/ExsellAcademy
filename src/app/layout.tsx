import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const display = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const siteUrl = "https://exsellacademy.com";

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
        {children}
      </body>
    </html>
  );
}
