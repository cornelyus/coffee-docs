import { docs } from '#site/content'

export type Doc = (typeof docs)[number]

export function getAllDocs(): Doc[] {
  return docs.sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
}

export function getDocBySlug(slugPath: string): Doc | undefined {
  return docs.find((doc) => doc.slugPath === slugPath)
}
