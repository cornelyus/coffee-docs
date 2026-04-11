'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getNav, type NavItem, type Locale } from '@/lib/nav'
import LocaleSwitcher from './locale-switcher'

function NavLink({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const pathname = usePathname()
  const isActive = pathname === item.href

  return (
    <li>
      <Link
        href={item.href}
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
            <NavLink key={child.href} item={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  )
}

export function Sidebar({ lang }: { lang: string }) {
  const navItems = getNav(lang as Locale)
  return (
    <nav className="w-64 shrink-0 py-8 pr-8">
      <div className="mb-4 flex items-center gap-2 px-3">
        <span className="text-xl">☕</span>
        <span className="font-semibold text-gray-900 dark:text-gray-100">Specialty Coffee</span>
      </div>
      <ul className="space-y-0.5">
        {navItems.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </ul>
      <div className="mt-6 px-3">
        <LocaleSwitcher currentLang={lang} />
      </div>
    </nav>
  )
}
