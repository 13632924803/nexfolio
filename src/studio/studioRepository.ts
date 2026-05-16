import { parseListInput, stringifyListInput } from '../lib/listFields';
import { isSupabaseConfigured, supabase, supabaseConfigMessage } from '../lib/supabase';
import type { StudioFormValues, StudioKind, StudioRecord } from './types';

export const studioLabels: Record<StudioKind, { single: string; plural: string; table: string }> = {
  posts: { single: '博客', plural: '博客', table: 'posts' },
  projects: { single: '项目', plural: '项目', table: 'projects' },
  tools: { single: '工具', plural: '工具', table: 'tools' },
};

function assertSupabase() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error(supabaseConfigMessage);
  }

  return supabase;
}

export function createEmptyForm(kind: StudioKind): StudioFormValues {
  return {
    slug: '',
    title: '',
    summary: '',
    content: '',
    category: '',
    tags: '',
    status: 'draft',
    type: kind === 'projects' ? '个人网站' : '',
    techStack: '',
    demoUrl: '',
    githubUrl: '',
    cover: '',
    background: '',
    reason: '',
    problem: '',
    solution: '',
    features: '',
    linkStatus: '',
    futurePlan: '',
    isFeatured: false,
    url: '',
    icon: '',
    isSelfBuilt: kind === 'tools',
    isRecommended: false,
  };
}

export function recordToForm(kind: StudioKind, record: StudioRecord): StudioFormValues {
  const base = createEmptyForm(kind);
  return {
    ...base,
    slug: record.slug,
    title: record.title || record.name || '',
    summary: record.summary || record.description || '',
    content: record.content || record.description || '',
    category: record.category || '',
    tags: stringifyListInput(record.tags),
    status: record.status || 'draft',
    type: record.type || base.type,
    techStack: stringifyListInput(record.tech_stack),
    demoUrl: record.demo_url || '',
    githubUrl: record.github_url || '',
    cover: record.cover || '',
    background: record.background || '',
    reason: record.reason || '',
    problem: record.problem || '',
    solution: record.solution || '',
    features: stringifyListInput(record.features),
    linkStatus: record.link_status || '',
    futurePlan: stringifyListInput(record.future_plan),
    isFeatured: Boolean(record.is_featured),
    url: record.url || '',
    icon: record.icon || '',
    isSelfBuilt: Boolean(record.is_self_built),
    isRecommended: Boolean(record.is_recommended),
  };
}

export async function listStudioRecords(kind: StudioKind): Promise<StudioRecord[]> {
  const client = assertSupabase();
  const { data, error } = await client
    .from(studioLabels[kind].table)
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as StudioRecord[];
}

export async function getStudioRecord(kind: StudioKind, id: string): Promise<StudioRecord | null> {
  const client = assertSupabase();
  const { data, error } = await client.from(studioLabels[kind].table).select('*').eq('id', id).maybeSingle();

  if (error) {
    throw error;
  }

  return data as StudioRecord | null;
}

function formToPayload(kind: StudioKind, values: StudioFormValues, publish: boolean) {
  const now = new Date().toISOString();
  const base = {
    slug: values.slug.trim(),
    category: values.category.trim(),
    tags: parseListInput(values.tags),
    status: publish ? 'published' : values.status || 'draft',
    is_published: publish,
  };

  if (kind === 'posts') {
    return {
      ...base,
      title: values.title.trim(),
      summary: values.summary.trim(),
      content: values.content,
      cover: values.cover.trim() || null,
      published_at: publish ? now : undefined,
    };
  }

  if (kind === 'projects') {
    return {
      ...base,
      title: values.title.trim(),
      description: values.summary.trim(),
      detail: values.content,
      type: values.type.trim(),
      tech_stack: parseListInput(values.techStack),
      demo_url: values.demoUrl.trim() || null,
      github_url: values.githubUrl.trim() || null,
      cover: values.cover.trim() || null,
      background: values.background,
      reason: values.reason,
      problem: values.problem,
      solution: values.solution,
      features: parseListInput(values.features),
      link_status: values.linkStatus,
      future_plan: parseListInput(values.futurePlan),
      is_featured: values.isFeatured,
      published_at: publish ? now : undefined,
    };
  }

  return {
    ...base,
    name: values.title.trim(),
    description: values.summary.trim(),
    url: values.url.trim() || null,
    icon: values.icon.trim() || null,
    is_self_built: values.isSelfBuilt,
    is_recommended: values.isRecommended,
    published_at: publish ? now : undefined,
  };
}

export async function saveStudioRecord(
  kind: StudioKind,
  values: StudioFormValues,
  options: { id?: string; publish: boolean },
) {
  const client = assertSupabase();
  if (!values.slug.trim()) {
    throw new Error('slug 必填');
  }

  const { data: userResult, error: userError } = await client.auth.getUser();
  if (userError || !userResult.user) {
    throw new Error('请先登录 Studio');
  }

  const payload = formToPayload(kind, values, options.publish);
  const table = studioLabels[kind].table;

  if (options.id) {
    const { error } = await client.from(table).update(payload).eq('id', options.id);
    if (error) {
      throw error;
    }
    return options.id;
  }

  const { data, error } = await client
    .from(table)
    .insert({ ...payload, owner_id: userResult.user.id })
    .select('id')
    .single();

  if (error) {
    throw error;
  }

  return (data as { id: string }).id;
}

export async function unpublishStudioRecord(kind: StudioKind, id: string) {
  const client = assertSupabase();
  const { error } = await client.from(studioLabels[kind].table).update({ is_published: false, status: 'draft' }).eq('id', id);
  if (error) {
    throw error;
  }
}

export async function deleteStudioRecord(kind: StudioKind, id: string) {
  const client = assertSupabase();
  const { error } = await client.from(studioLabels[kind].table).delete().eq('id', id);
  if (error) {
    throw error;
  }
}
