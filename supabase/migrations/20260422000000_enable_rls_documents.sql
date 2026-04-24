-- Enable Row-Level Security on documents table.
-- The service_role key (used by the indexer and edge function) bypasses RLS,
-- so existing functionality is unaffected. Anonymous access via PostgREST is
-- restricted to SELECT only — writes require the service role.
alter table public.documents enable row level security;

create policy "Allow public read"
  on public.documents
  for select
  to anon, authenticated
  using (true);
