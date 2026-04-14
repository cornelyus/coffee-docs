import { notFound } from 'next/navigation'
import * as runtime from 'react/jsx-runtime'
import { getDocBySlug, getAllDocsByLocale } from '@/lib/docs'
import { locales, type Locale } from '@/lib/nav'
import { useMDXComponents } from '@/mdx-components'
import { SITE_URL } from '@/lib/site-url'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const params: { lang: string; slug?: string[] }[] = []
  for (const lang of locales) {
    const docs = getAllDocsByLocale(lang)
    for (const doc of docs) {
      params.push({
        lang,
        slug: doc.slugPath === 'index' ? undefined : doc.slugPath.split('/'),
      })
    }
  }
  return params
}

export async function generateMetadata({
  params,
}: PageProps<'/[lang]/docs/[[...slug]]'>): Promise<Metadata> {
  const { lang, slug } = await params
  const slugPath = slug?.join('/') || 'index'
  const doc = getDocBySlug(lang, slugPath)
  if (!doc) return {}

  const suffix = slugPath === 'index' ? '' : `/${slugPath}`
  const canonical = `${SITE_URL}/${lang}/docs${suffix}`
  const altLangs = Object.fromEntries(
    locales.map(l => [l, `${SITE_URL}/${l}/docs${suffix}`])
  )

  return {
    title: doc.title,
    description: doc.description,
    alternates: {
      canonical,
      languages: altLangs,
    },
    openGraph: {
      title: doc.title,
      description: doc.description,
      url: canonical,
      type: 'article',
    },
    twitter: {
      title: doc.title,
      description: doc.description,
    },
  }
}

function MDXContent({ code }: { code: string }) {
  const fn = new Function(code)
  const { default: Component } = fn({ ...runtime })
  const components = useMDXComponents()
  return <Component components={components} />
}

export default async function DocPage({
  params,
}: PageProps<'/[lang]/docs/[[...slug]]'>) {
  const { lang, slug } = await params
  const slugPath = slug?.join('/') || 'index'
  const doc = getDocBySlug(lang, slugPath)

  if (!doc) notFound()

  return (
    <article className="prose prose-gray dark:prose-invert max-w-none">
      <h1>{doc.title}</h1>
      {doc.description && (
        <p className="lead text-lg text-gray-500 dark:text-gray-400">{doc.description}</p>
      )}
      <MDXContent code={doc.content} />
    </article>
  )
}
