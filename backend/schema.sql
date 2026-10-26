-- Apply only to the approved PAL Tech Supabase project.
-- Approved adult accounts are inserted by the project administrator, never by clients.
begin;
create table public.pal_hub_facilitators (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.pal_hub_facilitators enable row level security;
revoke all on public.pal_hub_facilitators from anon, authenticated;
grant select on public.pal_hub_facilitators to authenticated;
create policy facilitator_self on public.pal_hub_facilitators for select to authenticated
  using ((select auth.uid())=user_id);

create table public.pal_hub_backups (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  label text not null check (length(label) between 1 and 100),
  payload jsonb not null check (jsonb_typeof(payload)='object'
    and payload ? 'version' and payload ? 'profiles'
    and payload->'version' <> 'null'::jsonb and payload->'profiles' <> 'null'::jsonb
    and payload->>'version'='2'
    and jsonb_typeof(payload->'profiles')='object'
    and octet_length(payload::text)<1000000)
);
create index pal_hub_backups_owner_date on public.pal_hub_backups(owner_id,created_at desc);
alter table public.pal_hub_backups enable row level security;
revoke all on public.pal_hub_backups from anon, authenticated;
grant select, insert, delete on public.pal_hub_backups to authenticated;
create policy backup_owner_read on public.pal_hub_backups for select to authenticated using (
  (select auth.uid())=owner_id and exists(select 1 from public.pal_hub_facilitators where user_id=(select auth.uid())));
create policy backup_owner_create on public.pal_hub_backups for insert to authenticated with check (
  (select auth.uid())=owner_id and exists(select 1 from public.pal_hub_facilitators where user_id=(select auth.uid())));
create policy backup_owner_delete on public.pal_hub_backups for delete to authenticated using (
  (select auth.uid())=owner_id and exists(select 1 from public.pal_hub_facilitators where user_id=(select auth.uid())));
commit;
