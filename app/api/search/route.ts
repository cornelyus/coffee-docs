import { createClient } from '@supabase/supabase-js'
import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const query: string = (body.query ?? '').trim()
    const locale: string | null = body.locale ?? null

    if (!query) {
      return Response.json({ error: 'query required' }, { status: 400 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data, error } = await supabase.functions.invoke('search', {
      body: { query, locale },
    })

    if (error) {
      console.error('Supabase function error:', error)
      return Response.json({ error: 'Search failed' }, { status: 500 })
    }

    return Response.json(data)
  } catch (err) {
    console.error('Search route error:', err)
    return Response.json({ error: 'Internal error' }, { status: 500 })
  }
}
