import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider, THEME_SCRIPT } from "@/hooks/useTheme";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import Script from "next/script";
export const metadata: Metadata = {
  title: "datasciencekibaatein — Master Data Science with Practical Learning",
  description:
    "India's premier Data Science platform. Master Python, Pandas, NumPy, Machine Learning, Power BI, SQL, Statistics and AI with practical, project-based courses taught by industry experts.",
  keywords: [
    "data science courses",
    "python data science",
    "machine learning course",
    "pandas numpy tutorial",
    "sql data science",
    "power bi course",
    "data science for beginners",
    "datasciencekibaatein",
  ],
  authors: [{ name: "Aryan Sharma — datasciencekibaatein" }],
  creator: "datasciencekibaatein",
  openGraph: {
    title: "datasciencekibaatein — Master Data Science",
    description: "Practical Data Science courses: Python, ML, Power BI, SQL, Statistics & AI",
    type: "website",
    locale: "en_US",
    siteName: "datasciencekibaatein",
  },
  twitter: {
    card: "summary_large_image",
    title: "datasciencekibaatein",
    description: "India's #1 Data Science learning platform",
  },
  robots: { index: true, follow: true },
   icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        
      </head>
      <body className="font-body antialiased">
        <ThemeProvider>
          <AuthProvider>
            {children}
            <AuthModal />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
