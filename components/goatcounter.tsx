'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    goatcounter?: {
      count: (vars?: { path?: string; title?: string; referrer?: string; event?: boolean }) => void
    }
  }
}

export function GoatCounter() {
  const pathname = usePathname()
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return // script handles the initial pageview automatically
    }
    window.goatcounter?.count?.({ path: pathname })
  }, [pathname])

  return null
}
