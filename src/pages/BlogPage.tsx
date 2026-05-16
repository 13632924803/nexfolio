import { useMemo, useState } from 'react';
import { BlogCard } from '../components/cards/BlogCard';
import { EmptyState } from '../components/ui/EmptyState';
import { FilterPills } from '../components/ui/FilterPills';
import { MotionPage } from '../components/ui/MotionPage';
import { SectionHeading } from '../components/ui/SectionHeading';
import { blogCategories } from '../data/categories';
import { posts as localPosts } from '../data/posts';
import type { BlogCategory } from '../data/types';
import { useAsyncData } from '../hooks/useAsyncData';
import { getPublishedPosts } from '../lib/contentRepository';

export function BlogPage() {
  const [category, setCategory] = useState<BlogCategory | '全部'>('全部');
  const [query, setQuery] = useState('');
  const { data: posts, error, loading } = useAsyncData(getPublishedPosts, localPosts, []);

  const filteredPosts = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = category === '全部' || post.category === category;
      const matchesQuery =
        keyword.length === 0 ||
        post.title.toLowerCase().includes(keyword) ||
        post.summary.toLowerCase().includes(keyword);
      return matchesCategory && matchesQuery;
    });
  }, [category, posts, query]);

  return (
    <MotionPage>
      <section className="page-section page-hero">
        <SectionHeading
          eyebrow="Blog"
          title="博客记录"
          description="开发记录、项目复盘、学习笔记和个人数字平台的持续建设过程。"
        />
        {loading ? <p className="data-note">正在读取博客内容...</p> : null}
        {error ? <p className="data-note">{error}</p> : null}
      </section>
      <section className="page-section compact-section">
        <div className="search-row">
          <input
            aria-label="搜索文章"
            placeholder="搜索文章标题或摘要"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <FilterPills items={blogCategories} value={category} onChange={setCategory} label="博客分类筛选" />
        {filteredPosts.length > 0 ? (
          <div className="card-grid">
            {filteredPosts.map((post) => (
              <BlogCard post={post} key={post.id} />
            ))}
          </div>
        ) : (
          <EmptyState title="没有找到相关文章" description="可以清空搜索词，或切换分类继续阅读。" />
        )}
      </section>
    </MotionPage>
  );
}
