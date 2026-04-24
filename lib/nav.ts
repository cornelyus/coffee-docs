export type Locale = 'en' | 'pt'

export const locales: Locale[] = ['en', 'pt']

export interface NavItem {
  title: string
  href: string
  children?: NavItem[]
}

export function buildNav(
  docs: { title: string; slugPath: string }[],
  locale: Locale
): NavItem[] {
  const result: NavItem[] = []
  const parentMap = new Map<string, NavItem>()

  for (const { title, slugPath } of docs) {
    const href =
      slugPath === 'index' ? `/${locale}/docs` : `/${locale}/docs/${slugPath}`
    const slashIdx = slugPath.indexOf('/')

    if (slashIdx === -1) {
      const item: NavItem = { title, href }
      parentMap.set(slugPath, item)
      result.push(item)
    } else {
      const parentSlug = slugPath.slice(0, slashIdx)
      const parent = parentMap.get(parentSlug)
      if (parent) {
        parent.children ??= []
        parent.children.push({ title, href })
      }
    }
  }

  return result
}
