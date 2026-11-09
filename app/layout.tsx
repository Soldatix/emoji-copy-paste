import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { PrivacyControls } from "./privacy-controls";

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
  icons: { icon: "/favicon.ico", shortcut: "/favicon.ico", apple: "/apple-touch-icon.png" },
};

// Static server-rendered markup: the browser parses the original provider tags
// before React hydration. Do not insert these ad scripts into the client page.
const topAdMarkup = "<div class=\"emoji-ad-unit\" data-size=\"728x90\" hidden><script src=\"/emoji-adsterra-loader.js\" data-unit=\"desktop\"></script></div><div class=\"emoji-ad-unit\" data-size=\"320x50\" hidden><script src=\"/emoji-adsterra-loader.js\" data-unit=\"mobile\"></script></div>";

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
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="stylesheet" href="https://appsandgames.org/privacy-choice.css" />
        <script src="/pwa-install-capture.js"></script>
        <meta name="theme-color" content="#0C79D8" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Emoji Copy & Paste" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <section
          id="emoji-ad-area"
          aria-label="Advertisement"
          hidden
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: topAdMarkup }}
        />
        <Providers>{children}</Providers>
        <PrivacyControls />
      </body>
    </html>
  );
}
