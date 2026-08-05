import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Renz Carljansen Sarucam — Junior R&D Engineer",
  description:
    "Portfolio of Renz Carljansen Sarucam, a Junior Research & Development Engineer based in Davao City, Philippines.",
  keywords: ["Renz Sarucam", "Junior R&D Engineer", "Davao City", "Software Developer", "Portfolio"],
  authors: [{ name: "Renz Carljansen Sarucam" }],
  openGraph: {
    title: "Renz Carljansen Sarucam — Full Stack Developer &R&D Engineer",
    description: "Portfolio of Renz Carljansen Sarucam — building research-driven software solutions.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Renz Carljansen Sarucam — Junior R&D Engineer",
    description: "Portfolio of Renz Carljansen Sarucam — building research-driven software solutions.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        suppressHydrationWarning
        style={{
          margin: 0,
          padding: 0,
          background: "#050d1a",
          fontFamily: "'Segoe UI', 'SF Pro Display', system-ui, sans-serif",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          color: "#e8f4ff",
          scrollBehavior: "smooth",
        }}
      >
        {children}
      </body>
    </html>
  );
}
