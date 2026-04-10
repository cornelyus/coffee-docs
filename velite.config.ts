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
      }).transform(data => ({
        ...data,
        slugPath: data.slug.replace(/^docs\/?/, '').replace(/\/index$/, '') || 'index',
      }))
    }
  }
})
