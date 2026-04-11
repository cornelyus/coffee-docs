import { notFound } from 'next/navigation'
import { locales, type Locale } from '@/lib/nav'

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function LangLayout({
  children,
  params,
}: LayoutProps<'/[lang]'>) {
  const { lang } = await params
  if (!locales.includes(lang as Locale)) notFound()
  return <>{children}</>
}
