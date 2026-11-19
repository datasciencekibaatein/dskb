import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

// Turn the colors in src/config/site.ts into CSS variables:
// light values on :root, dark values on .dark (set by next-themes).
type ThemeTokens = typeof siteConfig.colors.light;
const tokenVars = (t: ThemeTokens) =>
  `--bg:${t.bg};--card:${t.card};--border:${t.border};--heading:${t.heading};` +
  `--body:${t.body};--muted:${t.muted};--teal-text:${t.tealText};--subtle:${t.subtle};`;

const c = siteConfig.colors;
const themeCss =
  `:root{--navy-950:${c.navy950};--navy-800:${c.navy800};--ocean:${c.ocean};` +
  `--cyan:${c.cyan};--blue:${c.blue};${tokenVars(c.light)}}` +
  `.dark{${tokenVars(c.dark)}}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: next-themes adds the "dark" class before React loads.
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <style>{themeCss}</style>
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
