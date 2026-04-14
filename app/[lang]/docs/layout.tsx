import { Sidebar } from '@/components/sidebar'
import { MobileTopBar, MobileNavTrigger } from '@/components/mobile-nav'

export default async function DocsLayout({
  children,
  params,
}: LayoutProps<'/[lang]/docs'>) {
  const { lang } = await params
  return (
    <div className="mx-auto max-w-6xl">
      <MobileTopBar lang={lang} />
      <div className="flex min-h-screen px-4">
        <div className="hidden md:block">
          <Sidebar lang={lang} />
        </div>
        <main className="min-w-0 flex-1 py-6 md:py-8 md:pl-8 md:border-l border-gray-200 dark:border-gray-800">
          <MobileNavTrigger lang={lang} />
          {children}
        </main>
      </div>
    </div>
  )
}
