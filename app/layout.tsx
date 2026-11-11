import type { Metadata, Viewport } from "next";
import { Quattrocento_Sans } from "next/font/google";
import localFont from "next/font/local";
import { site } from "@/content/site";
import "./globals.css";

const pagella = localFont({
  src: [
    { path: "./fonts/pagella-regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/pagella-bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-pagella",
  fallback: ["Palatino Linotype", "Palatino", "Book Antiqua", "serif"],
});

const quattrocento = Quattrocento_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-quattrocento",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name}_ | Legal consultancy for fashion and the creative industries`,
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name}_`,
    description: site.description,
    url: "/",
    siteName: site.name,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#22333b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${pagella.variable} ${quattrocento.variable}`}>
      <body>{children}</body>
    </html>
  );
}
