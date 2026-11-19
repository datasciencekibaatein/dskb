import type { Metadata } from "next";
import type { CSSProperties } from "react";
import "./globals.css";
import { siteConfig } from "@/config/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MotionProvider } from "@/components/motion";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

// Pass brand colors from the config file into CSS variables.
const brandVars = {
  "--navy-950": siteConfig.colors.navy950,
  "--navy-800": siteConfig.colors.navy800,
  "--ocean": siteConfig.colors.ocean,
  "--cyan": siteConfig.colors.cyan,
  "--blue": siteConfig.colors.blue,
  "--bg": siteConfig.colors.bg,
  "--card": siteConfig.colors.card,
  "--border": siteConfig.colors.border,
  "--teal-text": siteConfig.colors.tealText,
} as CSSProperties;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      style={brandVars}
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col font-sans">
        <MotionProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
