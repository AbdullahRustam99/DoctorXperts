import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// app/layout.tsx
import "./globals.css";
import { Poppins } from "next/font/google";
import HealthChatButton from "@/components/HealthChatButton";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-poppins", // optional if using Tailwind
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "DoctorXpert",
  description: "DoctorXpert is a health-tech platform built to make medical understanding easier, faster, and smarter for everyone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <head>
        <link rel="icon" href="/images/weblogo.jpg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        < HealthChatButton />
        {children}
      </body>
    </html>
  );
}
