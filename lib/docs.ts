import { docs } from '#site/content'

export type Doc = (typeof docs)[number]

export function getAllDocsByLocale(locale: string): Doc[] {
  return docs
    .filter((doc) => doc.locale === locale)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
}

export function getDocBySlug(locale: string, slugPath: string): Doc | undefined {
  return docs.find((doc) => doc.locale === locale && doc.slugPath === slugPath)
}
