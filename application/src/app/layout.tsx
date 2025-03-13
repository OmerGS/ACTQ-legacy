import React from "react";
import ServiceWorker from "@/components/reusable/ServiceWorker";
import { MembreProvider } from "@/app/hooks/MemberContext";

export const metadata = {
  title: "ACTQ",
  description: "Üyeler için bir plateform",
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-192x192.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <meta name="description" content="Üyeler için bir plateform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" sizes="192x192" href="/icons/icon-192x192.png" />
      </head>
      <body style={{ margin: 0, padding: 0, width: "100%", height: "100%", boxSizing: "border-box" }}>
        <MembreProvider>
        {children}
        <ServiceWorker />
        </MembreProvider>
      </body>
    </html>
  );
}