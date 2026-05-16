create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text not null default '',
  content text not null default '',
  category text not null default '随笔',
  tags text[] not null default '{}',
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  is_published boolean not null default false,
  published_at timestamptz,
  seo_title text,
  seo_description text,
  is_featured boolean not null default false,
  sort_order integer not null default 0,
  canonical_url text,
  redirect_from text[] not null default '{}',
  owner_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null default '',
  detail text not null default '',
  category text not null default '项目',
  type text not null default '',
  tags text[] not null default '{}',
  tech_stack text[] not null default '{}',
  demo_url text,
  github_url text,
  cover text,
  background text not null default '',
  reason text not null default '',
  problem text not null default '',
  solution text not null default '',
  features text[] not null default '{}',
  link_status text not null default '暂未上线',
  future_plan text[] not null default '{}',
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  is_published boolean not null default false,
  is_featured boolean not null default false,
  published_at timestamptz,
  seo_title text,
  seo_description text,
  sort_order integer not null default 0,
  canonical_url text,
  redirect_from text[] not null default '{}',
  owner_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tools (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text not null default '',
  detail text not null default '',
  category text not null default '常用资源',
  tags text[] not null default '{}',
  url text,
  icon text,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  is_published boolean not null default false,
  is_self_built boolean not null default false,
  is_recommended boolean not null default false,
  published_at timestamptz,
  seo_title text,
  seo_description text,
  sort_order integer not null default 0,
  canonical_url text,
  redirect_from text[] not null default '{}',
  owner_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_posts_updated_at on public.posts;
create trigger set_posts_updated_at
before update on public.posts
for each row execute function public.set_updated_at();

drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

drop trigger if exists set_tools_updated_at on public.tools;
create trigger set_tools_updated_at
before update on public.tools
for each row execute function public.set_updated_at();

alter table public.posts enable row level security;
alter table public.projects enable row level security;
alter table public.tools enable row level security;

create policy "Public can read published posts"
on public.posts for select
using (is_published = true);

create policy "Owners can read own posts"
on public.posts for select to authenticated
using (owner_id = auth.uid());

create policy "Owners can insert posts"
on public.posts for insert to authenticated
with check (owner_id = auth.uid());

create policy "Owners can update posts"
on public.posts for update to authenticated
using (owner_id = auth.uid())
with check (owner_id = auth.uid());

create policy "Owners can delete posts"
on public.posts for delete to authenticated
using (owner_id = auth.uid());

create policy "Public can read published projects"
on public.projects for select
using (is_published = true);

create policy "Owners can read own projects"
on public.projects for select to authenticated
using (owner_id = auth.uid());

create policy "Owners can insert projects"
on public.projects for insert to authenticated
with check (owner_id = auth.uid());

create policy "Owners can update projects"
on public.projects for update to authenticated
using (owner_id = auth.uid())
with check (owner_id = auth.uid());

create policy "Owners can delete projects"
on public.projects for delete to authenticated
using (owner_id = auth.uid());

create policy "Public can read published tools"
on public.tools for select
using (is_published = true);

create policy "Owners can read own tools"
on public.tools for select to authenticated
using (owner_id = auth.uid());

create policy "Owners can insert tools"
on public.tools for insert to authenticated
with check (owner_id = auth.uid());

create policy "Owners can update tools"
on public.tools for update to authenticated
using (owner_id = auth.uid())
with check (owner_id = auth.uid());

create policy "Owners can delete tools"
on public.tools for delete to authenticated
using (owner_id = auth.uid());
