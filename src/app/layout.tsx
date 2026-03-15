import type { Metadata } from "next";
import { Anton, Rajdhani } from "next/font/google";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const rajdhani = Rajdhani({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-rajdhani",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Madhur Dixit — Product Software Developer",
  description:
    "Portfolio of Madhur Dixit — Product Software Developer at Runara.ai. Specialises in ML infrastructure, LLM inference optimisation, GPU telemetry, and data engineering.",
  keywords: [
    "Software Engineer",
    "ML Infrastructure",
    "LLM Inference",
    "Data Engineering",
    "Python",
    "AWS",
    "Docker",
    "Runara.ai",
  ],
  authors: [{ name: "Madhur Dixit" }],
  openGraph: {
    title: "Madhur Dixit — Product Software Developer",
    description:
      "Portfolio showcasing ML infrastructure, GPU telemetry, LLM optimisation, and data engineering expertise.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} ${rajdhani.variable} antialiased`}
      >
        <main className="min-h-screen bg-[--background]">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
