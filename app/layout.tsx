import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { GoatCounter } from '@/components/goatcounter'
import { Analytics } from "@vercel/analytics/next"
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Specialty Coffee Docs',
    template: '%s | Specialty Coffee Docs',
  },
  description: 'A comprehensive guide to specialty coffee — brewing, processing, water chemistry, and more.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
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
