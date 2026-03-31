import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import MotionProvider from "./components/MotionProvider";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sand & Sea Realty | San Diego's Premier Real Estate Brokerage",
  description:
    "Woman-owned San Diego real estate brokerage with 40+ years of experience. Buying, selling, and property management in Ocean Beach and beyond.",
  keywords: "San Diego real estate, Ocean Beach realtor, buy home San Diego, sell home San Diego, Anna Marie Barnard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        <MotionProvider>
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
