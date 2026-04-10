'use client'

import { useState } from 'react'

export function BrewCalculator() {
  const [coffee, setCoffee] = useState(15)
  const [ratio, setRatio] = useState(15)
  const water = Math.round(coffee * ratio)

  return (
    <div className="my-6 rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30 p-5">
      <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-blue-800 dark:text-blue-300">
        Brew Calculator
      </h4>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs text-blue-600 dark:text-blue-400">
            Coffee (g)
          </label>
          <input
            type="number"
            min={1}
            max={100}
            value={coffee}
            onChange={(e) => setCoffee(Number(e.target.value))}
            className="w-full rounded border border-blue-300 bg-white px-3 py-2 text-sm dark:border-blue-700 dark:bg-blue-950 dark:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-blue-600 dark:text-blue-400">
            Ratio (1 : X)
          </label>
          <input
            type="number"
            min={1}
            max={30}
            value={ratio}
            onChange={(e) => setRatio(Number(e.target.value))}
            className="w-full rounded border border-blue-300 bg-white px-3 py-2 text-sm dark:border-blue-700 dark:bg-blue-950 dark:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
      <div className="mt-4 rounded bg-blue-100 dark:bg-blue-900/40 px-4 py-3 text-center">
        <span className="text-sm text-blue-700 dark:text-blue-300">Water needed: </span>
        <span className="text-lg font-bold text-blue-900 dark:text-blue-100">{water} g</span>
        <span className="ml-2 text-xs text-blue-500 dark:text-blue-400">
          ({coffee}g coffee × {ratio} = {water}g water)
        </span>
      </div>
    </div>
  )
}
