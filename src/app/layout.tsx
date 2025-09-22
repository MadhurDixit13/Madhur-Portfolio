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
  title: "Madhur Dixit - Software/Data Engineer",
  description: "Portfolio of Madhur Dixit, Software Engineer specializing in ML Infrastructure, Data Engineering, and QA Automation. Experience with Python, AWS, Docker, and modern web technologies.",
  keywords: ["Software Engineer", "ML Infrastructure", "Data Engineering", "Python", "AWS", "Docker"],
  authors: [{ name: "Madhur Dixit" }],
  openGraph: {
    title: "Madhur Dixit - Software/Data Engineer",
    description: "Portfolio showcasing expertise in ML Infrastructure, Data Engineering, and QA Automation",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > 
        <main className="min-h-screen bg-[--color-white-smoke] dark:bg-[--background]">
          {children}
        </main> 
      </body>
    </html>
  );
}
