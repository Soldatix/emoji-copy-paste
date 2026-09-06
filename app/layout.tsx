import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Emoji Copy & Paste",
  description: "Find emoji meanings, country flags and common traffic signs, then copy them instantly in English, Croatian, German, Italian or Spanish.",
  keywords: ["emoji", "copy emoji", "paste emoji", "emoji meanings", "traffic signs", "prometni znakovi", "Unicode emoji", "Apps and Games"],
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body><Providers>{children}</Providers></body></html>;
}
