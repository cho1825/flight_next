import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Flight Next | International Budget Flight Finder for English Speakers",
    description: "Flight Next helps English-speaking travelers find last-minute cheap flights from South Korea to Japan, Southeast Asia, and beyond. Compare and book your flight with real-time updates and affiliate links.",
    keywords: [
        "Flight Next",
        "cheap flights",
        "last minute flights",
        "Korea Japan flight deals",
        "budget travel",
        "real-time flight search",
        "English flight booking",
        "affiliate flight deals",
        "cho's flight",
        "let's fly with cho",
    ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
