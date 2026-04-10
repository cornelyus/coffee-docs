import type { MDXComponents } from 'mdx/types'
import { Callout } from '@/components/mdx/callout'
import { BrewRecipe } from '@/components/brew-recipe'
import { BrewCalculator } from '@/components/brew-calculator'

export function useMDXComponents(): MDXComponents {
  return {
    Callout,
    BrewRecipe,
    BrewCalculator,
  }
}
