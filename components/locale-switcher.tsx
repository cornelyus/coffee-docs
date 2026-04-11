'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { locales, type Locale } from '@/lib/nav'

const langLabels: Record<Locale, string> = {
  en: 'EN',
  pt: 'PT',
}

export default function LocaleSwitcher({ currentLang }: { currentLang: string }) {
  const pathname = usePathname()

  function switchedHref(lang: Locale): string {
    // Replace the locale segment: /en/docs/... → /pt/docs/...
    return pathname.replace(/^\/[^/]+/, `/${lang}`)
  }

  return (
    <div className="flex gap-1">
      {locales.map((lang) => (
        <Link
          key={lang}
          href={switchedHref(lang)}
          className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
            lang === currentLang
              ? 'bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100'
              : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100'
          }`}
        >
          {langLabels[lang]}
        </Link>
      ))}
    </div>
  )
}
