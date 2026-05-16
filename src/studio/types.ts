export type StudioKind = 'posts' | 'projects' | 'tools';

export interface StudioRecord {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  status: string;
  is_published: boolean;
  published_at: string | null;
  updated_at: string;
  created_at?: string;
  content?: string;
  description?: string;
  name?: string;
  tags?: string[];
  type?: string;
  tech_stack?: string[];
  demo_url?: string | null;
  github_url?: string | null;
  cover?: string | null;
  background?: string | null;
  reason?: string | null;
  problem?: string | null;
  solution?: string | null;
  features?: string[];
  link_status?: string | null;
  future_plan?: string[];
  is_featured?: boolean;
  url?: string | null;
  icon?: string | null;
  is_self_built?: boolean;
  is_recommended?: boolean;
}

export interface StudioFormValues {
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  tags: string;
  status: string;
  type: string;
  techStack: string;
  demoUrl: string;
  githubUrl: string;
  cover: string;
  background: string;
  reason: string;
  problem: string;
  solution: string;
  features: string;
  linkStatus: string;
  futurePlan: string;
  isFeatured: boolean;
  url: string;
  icon: string;
  isSelfBuilt: boolean;
  isRecommended: boolean;
}
