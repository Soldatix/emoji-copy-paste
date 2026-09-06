import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

const appUrl = "https://emoji.appsandgames.org/";
const socialImage = "https://appsandgames.org/assets/social/emoji-copy-paste.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: "Emoji Copy & Paste — Meanings, Flags & Traffic Signs | Apps & Games",
  description: "Find emoji meanings, country flags and common traffic signs, then copy them instantly in English, Croatian, German, Italian or Spanish.",
  keywords: ["emoji", "copy emoji", "paste emoji", "emoji meanings", "country flags", "traffic signs", "prometni znakovi", "Unicode emoji", "Apps and Games"],
  applicationName: "Emoji Copy & Paste",
  alternates: {
    canonical: appUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: appUrl,
    siteName: "Apps & Games",
    title: "Emoji Copy & Paste — Meanings, Flags & Traffic Signs",
    description: "Find emoji meanings, country flags and traffic signs, then copy them instantly in five languages.",
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: "Apps & Games — Emoji Copy & Paste",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emoji Copy & Paste | Apps & Games",
    description: "Find emoji meanings, flags and traffic signs and copy them instantly in five languages.",
    images: [socialImage],
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Emoji Copy & Paste",
  url: appUrl,
  image: socialImage,
  description:
    "A free multilingual browser app for finding emoji meanings, country flags and common traffic signs and copying them instantly.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  isAccessibleForFree: true,
  inLanguage: ["en", "hr", "de", "it", "es"],
  publisher: {
    "@type": "Organization",
    name: "Apps & Games",
    url: "https://appsandgames.org/",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body><Providers>{children}</Providers></body>
    </html>
  );
}
