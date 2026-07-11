import type { Metadata } from "next";
import { Cardo, Geist, Inter } from "next/font/google";
import "./globals.css";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Main from "@/components/layout/Main";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

const cardo = Cardo({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-cardo",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TPI | Demo Website for Papa",
    template: "%s | TPI",
  },
  description: "A modern corporate website demo for TPI.",
  keywords: ["TPI", "PAPA", "PAPA KIM", "NHAN TRAN"],
  authors: [{ name: "Binn" }],
  creator: "Binn",
  metadataBase: new URL("https://tpi-corporate-website.vercel.app/"),
  openGraph: {
    title: "TPI | Demo Website For Papa",
    description: "A modern corporate website demo.",
    type: "website",
    locale: "vi_VN",
    siteName: "TPI Demo",
    images: [
      {
        url: "/Vua-tu-san.webp",
        width: 1200,
        height: 630,
        alt: "TPI Demo Website",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={cn(
        "h-full",
        "antialiased",
        inter.variable,
        cardo.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <body className="min-h-full flex flex-col font-sans overflow-x-hidden">
        <Header />
        <Main>{children}</Main>
        <Footer />
      </body>
    </html>
  );
}
