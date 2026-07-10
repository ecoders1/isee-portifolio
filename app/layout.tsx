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
  title: "Isayas Fikadu | Full Stack Developer",
  description:
    "Isayas Fikadu – Full Stack Web Developer & Computer Science Student from Ethiopia. I build modern websites, web applications, and mobile-friendly digital solutions.",
  keywords: [
    "Isayas Fikadu",
    "Full Stack Developer",
    "Web Developer",
    "Ethiopia",
    "Next.js",
    "React",
    "TypeScript",
  ],
  authors: [{ name: "Isayas Fikadu" }],
  creator: "Isayas Fikadu",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://isayasfikadu.vercel.app",
    title: "Isayas Fikadu | Full Stack Developer",
    description:
      "Full Stack Web Developer & Computer Science Student from Ethiopia. Building modern, responsive web applications.",
    siteName: "Isayas Fikadu Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Isayas Fikadu – Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Isayas Fikadu | Full Stack Developer",
    description: "Full Stack Web Developer & CS Student from Ethiopia",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
