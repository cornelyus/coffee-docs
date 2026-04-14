import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site-url'
import { locales } from '@/lib/nav'
import { getAllDocsByLocale } from '@/lib/docs'

export default function sitemap(): MetadataRoute.Sitemap {
  const slugMap = new Map<string, Record<string, string>>()

  for (const locale of locales) {
    for (const doc of getAllDocsByLocale(locale)) {
      const suffix = doc.slugPath === 'index' ? '' : `/${doc.slugPath}`
      const url = `${SITE_URL}/${locale}/docs${suffix}`
      const entry = slugMap.get(doc.slugPath) ?? {}
      entry[locale] = url
      slugMap.set(doc.slugPath, entry)
    }
  }

  return [...slugMap.entries()].map(([, langs]) => ({
    url: langs['en'],
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
    alternates: { languages: langs },
  }))
}
