export type Locale = 'en' | 'pt'

export const locales: Locale[] = ['en', 'pt']

export interface NavItem {
  title: string
  href: string
  children?: NavItem[]
}

const labels: Record<Locale, Record<string, string>> = {
  en: {
    'getting-started': 'Getting Started',
    brewing: 'Brewing Methods',
    'pour-over': 'Pour Over',
    immersion: 'Immersion Brewing',
    espresso: 'Espresso',
    processing: 'Processing Methods',
    'water-chemistry': 'Water Chemistry',
    tasting: 'Tasting & Cupping',
    equipment: 'Equipment',
    origins: 'Origins',
    ethiopia: 'Ethiopia',
    colombia: 'Colombia',
  },
  pt: {
    'getting-started': 'Introdução',
    brewing: 'Métodos de Preparação',
    'pour-over': 'Pour Over',
    immersion: 'Preparação por Imersão',
    espresso: 'Espresso',
    processing: 'Processamento',
    'water-chemistry': 'Química da Água',
    tasting: 'Prova e Cupping',
    equipment: 'Equipamento',
    origins: 'Origens',
    ethiopia: 'Etiópia',
    colombia: 'Colômbia',
  },
}

export function getNav(locale: Locale): NavItem[] {
  const t = (key: string) => labels[locale][key]
  return [
    { title: t('getting-started'), href: `/${locale}/docs` },
    {
      title: t('brewing'),
      href: `/${locale}/docs/brewing`,
      children: [
        { title: t('pour-over'), href: `/${locale}/docs/brewing/pour-over` },
        { title: t('immersion'), href: `/${locale}/docs/brewing/immersion` },
        { title: t('espresso'), href: `/${locale}/docs/brewing/espresso` },
      ],
    },
    { title: t('processing'), href: `/${locale}/docs/processing` },
    { title: t('water-chemistry'), href: `/${locale}/docs/water-chemistry` },
    { title: t('tasting'), href: `/${locale}/docs/tasting` },
    { title: t('equipment'), href: `/${locale}/docs/equipment` },
    {
      title: t('origins'),
      href: `/${locale}/docs/origins`,
      children: [
        { title: t('ethiopia'), href: `/${locale}/docs/origins/ethiopia` },
        { title: t('colombia'), href: `/${locale}/docs/origins/colombia` },
      ],
    },
  ]
}
