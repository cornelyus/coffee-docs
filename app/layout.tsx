import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { GoatCounter } from '@/components/goatcounter'
import { Analytics } from "@vercel/analytics/next"
import { SITE_URL } from '@/lib/site-url'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Specialty Coffee Docs',
    template: '%s | Specialty Coffee Docs',
  },
  description: 'A comprehensive guide to specialty coffee — brewing, processing, water chemistry, and more.',
  openGraph: {
    type: 'website',
    siteName: 'Specialty Coffee Docs',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
        <Analytics />
        <GoatCounter />
        <Script
          src="https://gc.zgo.at/count.js"
          strategy="afterInteractive"
          data-goatcounter="https://coffee-docs.goatcounter.com/count"
        />
      </body>
    </html>
  )
}
