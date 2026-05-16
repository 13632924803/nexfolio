import { describe, expect, it } from 'vitest';
import {
  getPublishedPostBySlug,
  getPublishedPosts,
  getPublishedProjectBySlug,
  getPublishedProjects,
  getPublishedTools,
} from './contentRepository';
import { isSupabaseConfigured } from './supabase';

describe('content repository fallback', () => {
  it('keeps the public site usable without Supabase env vars', async () => {
    expect(isSupabaseConfigured).toBe(false);

    await expect(getPublishedProjects()).resolves.toEqual(
      expect.arrayContaining([expect.objectContaining({ id: 'nexfolio' })]),
    );
    await expect(getPublishedPosts()).resolves.toEqual(
      expect.arrayContaining([expect.objectContaining({ id: 'testing-from-day-one' })]),
    );
    await expect(getPublishedTools()).resolves.toEqual(expect.arrayContaining([expect.objectContaining({ id: 'prompt-desk' })]));
  });

  it('finds detail content from local fallback data', async () => {
    await expect(getPublishedProjectBySlug('nexfolio')).resolves.toEqual(
      expect.objectContaining({ title: 'NexFolio 个人数字平台' }),
    );
    await expect(getPublishedPostBySlug('testing-from-day-one')).resolves.toEqual(
      expect.objectContaining({ title: '从第一天开始建立测试体系' }),
    );
  });
});
