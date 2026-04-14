import { createClient } from '@supabase/supabase-js'
import docs from '../.velite/docs.json'

interface VeliteDoc {
  slug: string
  title: string
  description?: string
  order?: number
  content: string
  locale: string
  slugPath: string
}

// Extract visible text from Velite's compiled JSX string.
// The compiled output stores visible text inside children:"..." literals.
// We pull all quoted strings, filter out JSX boilerplate, and join them.
function extractBodyText(compiledJsx: string): string {
  const strings: string[] = []
  const re = /"((?:[^"\\]|\\.)*)"/g
  let m: RegExpExecArray | null
  while ((m = re.exec(compiledJsx)) !== null) {
    const s = m[1]
      .replace(/\\n/g, ' ')
      .replace(/\\t/g, ' ')
      .replace(/\\"/g, '"')
      .trim()
    if (
      s.length > 3 &&
      !/^[a-z][a-z0-9]*$/.test(s) &&
      !s.startsWith('function') &&
      !s.startsWith('const ') &&
      !s.startsWith('return ') &&
      s !== 'object' &&
      s !== 'tip' && s !== 'warning' && s !== 'info' && s !== 'note'
    ) {
      strings.push(s)
    }
  }
  return [...new Set(strings)].join(' ')
}

async function getEmbedding(
  text: string,
  embedUrl: string,
  anonKey: string
): Promise<number[]> {
  const res = await fetch(embedUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${anonKey}`,
      apikey: anonKey,
    },
    body: JSON.stringify({ text }),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`embed function failed: ${res.status} ${err}`)
  }
  const { embedding } = await res.json() as { embedding: number[] }
  return embedding
}

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !anonKey || !serviceKey) {
    throw new Error('Missing env vars: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY')
  }

  const supabase = createClient(supabaseUrl, serviceKey)
  const embedUrl = `${supabaseUrl}/functions/v1/embed`

  console.log(`Indexing ${(docs as VeliteDoc[]).length} documents...`)

  for (const doc of docs as VeliteDoc[]) {
    const bodyText = [
      doc.title,
      doc.description ?? '',
      extractBodyText(doc.content),
    ]
      .filter(Boolean)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim()

    console.log(`  Embedding [${doc.locale}] ${doc.slugPath} (${bodyText.length} chars)`)

    const embedding = await getEmbedding(bodyText, embedUrl, anonKey)

    const { error } = await supabase
      .from('documents')
      .upsert(
        {
          title: doc.title,
          description: doc.description ?? null,
          slug_path: doc.slugPath,
          locale: doc.locale,
          body_text: bodyText,
          embedding,
        },
        { onConflict: 'locale,slug_path' }
      )

    if (error) {
      console.error(`  ERROR [${doc.locale}] ${doc.slugPath}:`, error.message)
    } else {
      console.log(`  OK    [${doc.locale}] ${doc.slugPath}`)
    }

    // Small delay to avoid hammering edge function cold starts
    await new Promise((r) => setTimeout(r, 200))
  }

  console.log('\nDone.')
}

main().catch((e) => { console.error(e); process.exit(1) })
