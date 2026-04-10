import { notFound } from 'next/navigation'
import * as runtime from 'react/jsx-runtime'
import { getDocBySlug, getAllDocs } from '@/lib/docs'
import { useMDXComponents } from '@/mdx-components'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const docs = getAllDocs()
  return docs.map((doc) => ({
    slug: doc.slugPath === 'index' ? [] : doc.slugPath.split('/'),
  }))
}

type PageProps = {
  params: Promise<{ slug?: string[] }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const slugPath = slug?.join('/') || 'index'
  const doc = getDocBySlug(slugPath)
  if (!doc) return {}
  return {
    title: doc.title,
    description: doc.description,
  }
}

function MDXContent({ code }: { code: string }) {
  const fn = new Function(code)
  const { default: Component } = fn({ ...runtime })
  const components = useMDXComponents()
  return <Component components={components} />
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params
  const slugPath = slug?.join('/') || 'index'
  const doc = getDocBySlug(slugPath)

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
