-- Enable pgvector
create extension if not exists vector with schema extensions;

-- Documents table
create table if not exists public.documents (
  id          bigint generated always as identity primary key,
  title       text        not null,
  description text,
  slug_path   text        not null,
  locale      text        not null,
  body_text   text        not null,
  embedding   vector(384),
  updated_at  timestamptz not null default now()
);

-- Unique constraint so upsert works cleanly
create unique index if not exists documents_locale_slug_idx
  on public.documents (locale, slug_path);

-- IVFFlat index for approximate nearest-neighbor search
create index if not exists documents_embedding_idx
  on public.documents
  using ivfflat (embedding vector_cosine_ops) with (lists = 1);

-- RPC function for similarity search
create or replace function match_documents(
  query_embedding  vector(384),
  match_threshold  float  default 0.4,
  match_count      int    default 6,
  filter_locale    text   default null
)
returns table (title text, description text, slug_path text, locale text, similarity float)
language plpgsql as $$
begin
  return query
  select
    d.title,
    d.description,
    d.slug_path,
    d.locale,
    1 - (d.embedding <=> query_embedding) as similarity
  from public.documents d
  where
    (filter_locale is null or d.locale = filter_locale)
    and 1 - (d.embedding <=> query_embedding) > match_threshold
  order by d.embedding <=> query_embedding
  limit match_count;
end;
$$;
