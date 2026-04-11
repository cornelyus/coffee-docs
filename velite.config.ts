import { defineConfig, s } from 'velite'

export default defineConfig({
  root: 'content',
  collections: {
    docs: {
      name: 'Doc',
      pattern: 'docs/**/*.mdx',
      schema: s.object({
        slug: s.path(),
        title: s.string(),
        description: s.string().optional(),
        order: s.number().optional(),
        content: s.mdx(),
      }).transform(data => {
        const parts = data.slug.replace(/^docs\//, '').split('/')
        const locale = parts[0]
        const slugPath = parts.slice(1).join('/').replace(/\/index$/, '') || 'index'
        return { ...data, locale, slugPath }
      })
    }
  }
})
