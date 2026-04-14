export interface SearchResult {
  title: string
  description: string | null
  slug_path: string
  locale: string
  similarity: number
}

export function docHref(result: SearchResult): string {
  const base = `/${result.locale}/docs`
  return result.slug_path === 'index' ? base : `${base}/${result.slug_path}`
}
