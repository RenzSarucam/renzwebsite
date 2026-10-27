import type { Metadata } from "next";
import { Courier_Prime, Libre_Caslon_Display, Libre_Caslon_Text, Libre_Franklin, Special_Elite } from "next/font/google";
import ScrollToTop from "@/components/ScrollToTop";
import MagnifierCursor from "@/components/MagnifierCursor";
import "./globals.css";
import "@/styles/device-mockups.css";

const display = Libre_Caslon_Display({ subsets: ["latin"], weight: "400", variable: "--font-display", display: "swap" });
const body = Libre_Caslon_Text({ subsets: ["latin"], weight: ["400", "700"], style: ["normal", "italic"], variable: "--font-body", display: "swap" });
const label = Libre_Franklin({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-label", display: "swap" });
const stamp = Special_Elite({ subsets: ["latin"], weight: "400", variable: "--font-stamp", display: "swap" });
const mono = Courier_Prime({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Renz Carljansen Sarucam — Full Stack Developer & R&D Engineer",
  description:
    "Portfolio of Renz Carljansen Sarucam, a Full Stack Developer, R&D Engineer, and DevOps Engineer based in Davao City, Philippines.",
  keywords: ["Renz Sarucam", "Full Stack Developer", "R&D Engineer", "DevOps Engineer", "Davao City", "Software Developer", "Portfolio"],
  authors: [{ name: "Renz Carljansen Sarucam" }],
  openGraph: {
    title: "Renz Carljansen Sarucam — Full Stack Developer & R&D Engineer",
    description: "Portfolio of Renz Carljansen Sarucam — building research-driven software solutions.",
    type: "website",
    locale: "en_US",
    url: "https://renzcarljansensarucam.vercel.app",
    siteName: "Renz.dev",
    images: [
      {
        url: "https://renzcarljansensarucam.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Renz Carljansen Sarucam — Full Stack Developer & R&D Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Renz Carljansen Sarucam — Full Stack Developer & R&D Engineer",
    description: "Portfolio of Renz Carljansen Sarucam — building research-driven software solutions.",
    images: ["https://renzcarljansensarucam.vercel.app/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${label.variable} ${mono.variable} ${stamp.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#f1ecdf" />
      </head>
      <body suppressHydrationWarning>
        {/* Rubber-stamp texture: wobbly edges + ink-starved speckle */}
        <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
          <filter id="stamp-rough" x="-8%" y="-15%" width="116%" height="130%">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" seed="4" result="warp" />
            <feDisplacementMap in="SourceGraphic" in2="warp" scale="3.5" xChannelSelector="R" yChannelSelector="G" result="wobbly" />
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="11" result="grain" />
            <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  3.2 0 0 0 -0.85" result="holes" />
            <feComposite in="wobbly" in2="holes" operator="in" />
          </filter>
          {/* softer variant for small badges: same wobble, far fewer ink holes so the text stays legible */}
          <filter id="stamp-rough-soft" x="-8%" y="-15%" width="116%" height="130%">
            <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="7" result="warp" />
            <feDisplacementMap in="SourceGraphic" in2="warp" scale="2" xChannelSelector="R" yChannelSelector="G" result="wobbly" />
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="13" result="grain" />
            <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  3.4 0 0 0 -0.35" result="holes" />
            <feComposite in="wobbly" in2="holes" operator="in" />
          </filter>
        </svg>
        <ScrollToTop />
        {children}
        <MagnifierCursor />
      </body>
    </html>
  );
}
