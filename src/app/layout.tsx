import type { Metadata } from "next";
import { Parkinsans, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Providers } from "./providers";

const parkinsans = Parkinsans({
  variable: "--font-parkinsans",
  subsets: ["latin"],
  display: "swap"
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HiMambo",
  description: "Travel sustainably with hiMambo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Identity Services Script */}
        <script src="https://accounts.google.com/gsi/client" async defer></script>
      </head>
      <body
        className={`${parkinsans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Wrap all pages with the SearchProvider, BookingProvider and SessionProvider for NextAuth */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
