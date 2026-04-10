import type { ReactNode } from 'react'

interface CalloutProps {
  type?: 'tip' | 'warning' | 'info' | 'note'
  children: ReactNode
}

const styles = {
  tip: 'border-green-500 bg-green-50 dark:bg-green-950/30 text-green-900 dark:text-green-100',
  warning: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30 text-yellow-900 dark:text-yellow-100',
  info: 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-100',
  note: 'border-gray-400 bg-gray-50 dark:bg-gray-800/40 text-gray-900 dark:text-gray-100',
}

const icons = {
  tip: '💡',
  warning: '⚠️',
  info: 'ℹ️',
  note: '📝',
}

export function Callout({ type = 'note', children }: CalloutProps) {
  return (
    <div className={`my-4 rounded-md border-l-4 px-4 py-3 ${styles[type]}`}>
      <span className="mr-2 text-base">{icons[type]}</span>
      <span className="text-sm">{children}</span>
    </div>
  )
}
