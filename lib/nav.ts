export interface NavItem {
  title: string
  href: string
  children?: NavItem[]
}

export const nav: NavItem[] = [
  { title: 'Getting Started', href: '/docs' },
  {
    title: 'Brewing Methods',
    href: '/docs/brewing',
    children: [
      { title: 'Pour Over', href: '/docs/brewing/pour-over' },
      { title: 'Immersion', href: '/docs/brewing/immersion' },
      { title: 'Espresso', href: '/docs/brewing/espresso' },
    ],
  },
  { title: 'Processing', href: '/docs/processing' },
  { title: 'Water Chemistry', href: '/docs/water-chemistry' },
  { title: 'Tasting & Cupping', href: '/docs/tasting' },
  { title: 'Equipment', href: '/docs/equipment' },
  { title: 'Origins', href: '/docs/origins' },
]
