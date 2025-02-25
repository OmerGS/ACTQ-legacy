import React from "react";
import Head from "next/head";

export const metadata = {
  title: "ACTQ",
  description: "Üyeler için bir platform",
  icons: {
    icon: "assets/logo/logo.png", 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        {/* Balises meta pour le SEO et la PWA */}
        <meta name="description" content="Description de ton application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        {/* Ajouter d'autres balises meta comme nécessaire */}

        {/* Configuration PWA */}
        <link rel="icon" href="/favicon.ico" />
        {/* ...ajouter les autres icônes ici */}
      </head>
      <body style={{ margin: 0, padding: 0, width: "100%", height: "100%", boxSizing: "border-box" }}>
        {children}
      </body>
    </html>
  );
}
