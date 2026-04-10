interface BrewRecipeProps {
  ratio: string
  temp: string
  grind: string
  time?: string
  yield?: string
}

export function BrewRecipe({ ratio, temp, grind, time, yield: yld }: BrewRecipeProps) {
  const items = [
    { label: 'Ratio', value: ratio },
    { label: 'Temperature', value: temp },
    { label: 'Grind', value: grind },
    ...(time ? [{ label: 'Total Time', value: time }] : []),
    ...(yld ? [{ label: 'Yield', value: yld }] : []),
  ]

  return (
    <div className="my-6 rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30 p-4">
      <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber-800 dark:text-amber-300">
        Recipe
      </h4>
      <dl className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {items.map(({ label, value }) => (
          <div key={label}>
            <dt className="text-xs text-amber-600 dark:text-amber-400">{label}</dt>
            <dd className="font-medium text-amber-900 dark:text-amber-100">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
