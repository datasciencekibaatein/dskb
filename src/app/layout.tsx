import type { Metadata } from "next";
import type { CSSProperties } from "react";
import "./globals.css";
import { siteConfig } from "@/config/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

// Pass brand colors from the config file into CSS variables.
const brandVars = {
  "--brand": siteConfig.colors.brand,
  "--brand-dark": siteConfig.colors.brandDark,
  "--accent": siteConfig.colors.accent,
} as CSSProperties;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      style={brandVars}
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
