import { posts as localPosts } from '../data/posts';
import { projects as localProjects } from '../data/projects';
import { tools as localTools } from '../data/tools';
import type { BlogPost, ProjectItem, ToolItem } from '../data/types';
import { isSupabaseConfigured, supabase } from './supabase';
import { contentToParagraphs } from './listFields';

type ProjectRow = {
  slug: string;
  title: string;
  description: string;
  type: string;
  status: string;
  tags: string[] | null;
  tech_stack: string[] | null;
  cover: string | null;
  demo_url: string | null;
  github_url: string | null;
  detail: string | null;
  background: string | null;
  reason: string | null;
  problem: string | null;
  solution: string | null;
  features: string[] | null;
  link_status: string | null;
  future_plan: string[] | null;
};

type PostRow = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  tags: string[] | null;
  published_at: string | null;
  cover: string | null;
  content: string | null;
};

type ToolRow = {
  slug: string;
  name: string;
  description: string;
  category: string;
  url: string | null;
  icon: string | null;
  is_self_built: boolean | null;
  is_recommended: boolean | null;
  status: string | null;
};

function hasRemoteData<T>(data: T[] | null): data is T[] {
  return Array.isArray(data) && data.length > 0;
}

function toProject(row: ProjectRow): ProjectItem {
  return {
    id: row.slug,
    title: row.title,
    description: row.description,
    type: row.type as ProjectItem['type'],
    status: row.status as ProjectItem['status'],
    tags: row.tags ?? [],
    techStack: row.tech_stack ?? [],
    cover: row.cover ?? undefined,
    demoUrl: row.demo_url ?? undefined,
    githubUrl: row.github_url ?? undefined,
    detail: row.detail ?? row.description,
    background: row.background ?? '',
    reason: row.reason ?? '',
    problem: row.problem ?? '',
    solution: row.solution ?? '',
    features: row.features ?? [],
    linkStatus: row.link_status ?? '暂无公开访问链接。',
    futurePlan: row.future_plan ?? [],
  };
}

function toPost(row: PostRow): BlogPost {
  return {
    id: row.slug,
    title: row.title,
    summary: row.summary,
    category: row.category as BlogPost['category'],
    tags: row.tags ?? [],
    date: row.published_at ? row.published_at.slice(0, 10) : '',
    cover: row.cover ?? undefined,
    content: contentToParagraphs(row.content),
  };
}

function toTool(row: ToolRow): ToolItem {
  return {
    id: row.slug,
    name: row.name,
    description: row.description,
    category: row.category as ToolItem['category'],
    url: row.url ?? undefined,
    icon: row.icon ?? undefined,
    isSelfBuilt: Boolean(row.is_self_built),
    isRecommended: Boolean(row.is_recommended),
    status: (row.status as ToolItem['status']) ?? '可访问',
  };
}

export async function getPublishedProjects(): Promise<ProjectItem[]> {
  if (!isSupabaseConfigured || !supabase) {
    return localProjects;
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_published', true)
    .order('is_featured', { ascending: false })
    .order('published_at', { ascending: false });

  if (error || !hasRemoteData<ProjectRow>(data)) {
    return localProjects;
  }

  return data.map(toProject);
}

export async function getPublishedProjectBySlug(slug: string): Promise<ProjectItem | undefined> {
  if (!isSupabaseConfigured || !supabase) {
    return localProjects.find((item) => item.id === slug);
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle();

  if (error || !data) {
    return localProjects.find((item) => item.id === slug);
  }

  return toProject(data as ProjectRow);
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured || !supabase) {
    return localPosts;
  }

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  if (error || !hasRemoteData<PostRow>(data)) {
    return localPosts;
  }

  return data.map(toPost);
}

export async function getPublishedPostBySlug(slug: string): Promise<BlogPost | undefined> {
  if (!isSupabaseConfigured || !supabase) {
    return localPosts.find((item) => item.id === slug);
  }

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle();

  if (error || !data) {
    return localPosts.find((item) => item.id === slug);
  }

  return toPost(data as PostRow);
}

export async function getPublishedTools(): Promise<ToolItem[]> {
  if (!isSupabaseConfigured || !supabase) {
    return localTools;
  }

  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('is_published', true)
    .order('is_recommended', { ascending: false })
    .order('updated_at', { ascending: false });

  if (error || !hasRemoteData<ToolRow>(data)) {
    return localTools;
  }

  return data.map(toTool);
}
