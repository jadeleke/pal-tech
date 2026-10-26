begin;
create table public.pal_hub_cohorts (
 id uuid primary key default gen_random_uuid(),
 owner_id uuid not null references auth.users(id) on delete cascade,
 name text not null check(length(name) between 1 and 80),
 created_at timestamptz not null default now(),
 unique(id,owner_id)
);
create table public.pal_hub_assignments (
 id uuid primary key default gen_random_uuid(),
 owner_id uuid not null references auth.users(id) on delete cascade,
 cohort_id uuid not null,
 module_id text not null check(module_id in ('computer','algorithm','flowchart','code','network','ai','safety','skills')),
 lesson_start integer not null check(lesson_start between 1 and 20),
 lesson_end integer not null check(lesson_end between lesson_start and 20),
 due_date date,
 created_at timestamptz not null default now(),
 foreign key(cohort_id,owner_id) references public.pal_hub_cohorts(id,owner_id) on delete cascade
);
create index pal_hub_cohorts_owner on public.pal_hub_cohorts(owner_id);
create index pal_hub_assignments_cohort_owner on public.pal_hub_assignments(cohort_id,owner_id);
create index pal_hub_assignments_owner on public.pal_hub_assignments(owner_id);
alter table public.pal_hub_cohorts enable row level security;
alter table public.pal_hub_assignments enable row level security;
revoke all on public.pal_hub_cohorts,public.pal_hub_assignments from anon,authenticated;
grant select,insert,delete on public.pal_hub_cohorts,public.pal_hub_assignments to authenticated;
create policy cohorts_owner on public.pal_hub_cohorts for all to authenticated
 using(owner_id=(select auth.uid()) and exists(select 1 from public.pal_hub_facilitators where user_id=(select auth.uid())))
 with check(owner_id=(select auth.uid()) and exists(select 1 from public.pal_hub_facilitators where user_id=(select auth.uid())));
create policy assignments_owner on public.pal_hub_assignments for all to authenticated
 using(owner_id=(select auth.uid()) and exists(select 1 from public.pal_hub_facilitators where user_id=(select auth.uid())))
 with check(owner_id=(select auth.uid()) and exists(select 1 from public.pal_hub_facilitators where user_id=(select auth.uid())));
commit;
