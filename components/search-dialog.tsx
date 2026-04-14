'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import type { SearchResult } from '@/lib/search'
import { docHref } from '@/lib/search'

interface SearchDialogProps {
  locale: string
  onClose: () => void
}

export function SearchDialog({ locale, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  const search = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([])
      setError(null)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q, locale }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Search failed')
      setResults(data.results ?? [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed')
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [locale])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    setQuery(val)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => search(val), 300)
  }

  useEffect(() => () => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-[15vh]"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-lg rounded-xl bg-white shadow-2xl dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <svg className="h-4 w-4 shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search docs..."
            className="flex-1 bg-transparent text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 outline-none"
          />
          {loading && (
            <span className="text-xs text-gray-400">Searching…</span>
          )}
          <kbd className="hidden sm:inline-flex h-5 items-center rounded border border-gray-300 dark:border-gray-600 px-1.5 font-mono text-[10px] text-gray-400">
            ESC
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {error && (
            <p className="px-3 py-2 text-sm text-red-500">{error}</p>
          )}
          {!error && results.length === 0 && query.trim() && !loading && (
            <p className="px-3 py-4 text-center text-sm text-gray-400">No results found</p>
          )}
          {!error && !query.trim() && (
            <p className="px-3 py-4 text-center text-sm text-gray-400">
              Type to search across all docs
            </p>
          )}
          {results.map((r) => (
            <Link
              key={`${r.locale}/${r.slug_path}`}
              href={docHref(r)}
              onClick={onClose}
              className="block rounded-lg px-3 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{r.title}</p>
              {r.description && (
                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                  {r.description}
                </p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
