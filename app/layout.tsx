import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Islamic Finance Game App",
  description: "An interactive game exploring Islamic financial ethics and decision-making",
  keywords: ["Islamic finance", "ethics", "educational game", "financial literacy", "Islamic ethics"],
  authors: [{ name: "EthikFin Idea Team" }],
  creator: "EthikFin",
  publisher: "EthikFin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.png", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.png",
        color: "#10b981", // emerald-500 color
      },
    ],
  },
  manifest: "/site.webmanifest",
  themeColor: "#10b981", // emerald-500 color
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://islamic-finance-game.vercel.app/",
    title: "Islamic Finance Game App",
    description: "An interactive game exploring Islamic financial ethics and decision-making",
    siteName: "Islamic Finance Game App",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Islamic Finance Game App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Islamic Finance Game App",
    description: "An interactive game exploring Islamic financial ethics and decision-making",
    images: ["/og-image.png"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
