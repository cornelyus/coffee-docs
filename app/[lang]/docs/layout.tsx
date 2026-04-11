import { Sidebar } from '@/components/sidebar'

export default async function DocsLayout({
  children,
  params,
}: LayoutProps<'/[lang]/docs'>) {
  const { lang } = await params
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl px-4">
      <Sidebar lang={lang} />
      <main className="min-w-0 flex-1 py-8 pl-8 border-l border-gray-200 dark:border-gray-800">
        {children}
      </main>
    </div>
  )
}
