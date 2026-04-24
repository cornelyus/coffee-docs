'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type NavItem } from '@/lib/nav'
import { SearchButton } from './search-button'
import LocaleSwitcher from './locale-switcher'

function findSectionTitle(navItems: NavItem[], pathname: string): string {
  for (const item of navItems) {
    if (item.href === pathname) return item.title
    if (item.children?.some((c) => c.href === pathname)) return item.title
  }
  return 'Menu'
}

function MobileNavLink({
  item,
  depth = 0,
  onClose,
}: {
  item: NavItem
  depth?: number
  onClose: () => void
}) {
  const pathname = usePathname()
  const isActive = pathname === item.href

  return (
    <li>
      <Link
        href={item.href}
        onClick={onClose}
        className={`block rounded px-3 py-1.5 text-sm transition-colors ${
          depth > 0 ? 'pl-6' : ''
        } ${
          isActive
            ? 'bg-amber-100 font-medium text-amber-900 dark:bg-amber-900/40 dark:text-amber-100'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100'
        }`}
      >
        {item.title}
      </Link>
      {item.children && item.children.length > 0 && (
        <ul className="mt-0.5 space-y-0.5">
          {item.children.map((child) => (
            <MobileNavLink key={child.href} item={child} depth={depth + 1} onClose={onClose} />
          ))}
        </ul>
      )}
    </li>
  )
}

export function MobileTopBar({ lang }: { lang: string }) {
  return (
    <header className="md:hidden sticky top-0 z-30 flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-3">
      <Link href={`/${lang}/docs`} className="flex items-center gap-2 shrink-0">
        <span className="text-xl">☕</span>
        <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">Specialty Coffee</span>
      </Link>
      <div className="flex-1 min-w-0">
        <SearchButton locale={lang} />
      </div>
      <LocaleSwitcher currentLang={lang} />
    </header>
  )
}

export function MobileNavTrigger({ lang, navItems }: { lang: string; navItems: NavItem[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const sectionTitle = findSectionTitle(navItems, pathname)

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden flex items-center gap-2 mb-6 w-full text-sm text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors border-b border-gray-100 dark:border-gray-800 pb-4"
        aria-label="Open navigation"
      >
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 012 10z" clipRule="evenodd" />
        </svg>
        <span>{sectionTitle}</span>
        <svg className="h-3 w-3 ml-auto shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
          <div
            className="fixed inset-0 bg-black/40"
            aria-hidden="true"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-white dark:bg-gray-950 flex flex-col shadow-xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-lg">☕</span>
                <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">Specialty Coffee</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Close navigation"
              >
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            </div>

            <div className="px-4 pt-3 pb-2 shrink-0">
              <SearchButton locale={lang} />
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-2">
              <ul className="space-y-0.5">
                {navItems.map((item) => (
                  <MobileNavLink
                    key={item.href}
                    item={item}
                    onClose={() => setIsOpen(false)}
                  />
                ))}
              </ul>
            </nav>

            <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800 shrink-0">
              <LocaleSwitcher currentLang={lang} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
