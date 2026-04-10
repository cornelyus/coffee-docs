import { Sidebar } from '@/components/sidebar'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl px-4">
      <Sidebar />
      <main className="min-w-0 flex-1 py-8 pl-8 border-l border-gray-200 dark:border-gray-800">
        {children}
      </main>
    </div>
  )
}
