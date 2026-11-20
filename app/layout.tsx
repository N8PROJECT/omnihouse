import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const display = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-display" });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "ONNI House | Kitchen, Florist & Home",
  description: "A Jakarta house in bloom. Explore ONNI House, from the kitchen table to the flower studio, and plan a visit to Jakarta or Surabaya.",
  openGraph: { title: "ONNI House | A House in Bloom", description: "Kitchen, florist and home, all under one roof.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${display.variable} ${body.variable}`}><body>{children}</body></html>;
}
