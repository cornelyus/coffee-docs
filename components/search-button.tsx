'use client'

import { useState, useEffect, useCallback } from 'react'
import { SearchDialog } from './search-dialog'

export function SearchButton({ locale }: { locale: string }) {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      <button
        onClick={open}
        className="flex w-full items-center gap-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-1.5 text-sm text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
        aria-label="Search documentation"
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
        </svg>
        <span className="flex-1 text-left">Search</span>
        <kbd className="hidden sm:inline-flex h-5 items-center gap-0.5 rounded border border-gray-200 dark:border-gray-600 px-1 font-mono text-[10px]">
          <span>⌘</span><span>K</span>
        </kbd>
      </button>

      {isOpen && <SearchDialog locale={locale} onClose={close} />}
    </>
  )
}
