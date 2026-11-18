import type { Metadata } from "next";
import "./globals.css";
import { APP_METADATA } from "@/lib/sensifai/app-metadata";

export const metadata: Metadata = {
  title: `${APP_METADATA.name} — ${APP_METADATA.tagline}`,
  description: APP_METADATA.shortDescription,
  metadataBase: new URL(APP_METADATA.canonicalUrl),
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: `${APP_METADATA.name} — ${APP_METADATA.tagline}`,
    description: APP_METADATA.shortDescription,
    url: APP_METADATA.canonicalUrl,
    siteName: `${APP_METADATA.name} on Sensifai Marketplace`,
    images: [
      {
        url: "/images/hero.jpg",
        width: 1280,
        height: 720,
        alt: `${APP_METADATA.name} Cover`,
      },
    ],
    locale: "en_US",
    type: "website",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-rose-100 selection:text-rose-900">
        {children}
      </body>
    </html>
  );
}
