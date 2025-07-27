import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { UserProvider } from "@/context/UserContext";
import ReactQueryProvider from "@/provider/react-query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ACTQ - Üye Portalı",
  description:
    "Quimper Türk Kültür Derneği üyelerine özel, güvenli ve kullanıcı dostu web uygulaması",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReactQueryProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}