import { useMemo, useState } from 'react';
import { ToolCard } from '../components/cards/ToolCard';
import { EmptyState } from '../components/ui/EmptyState';
import { FilterPills } from '../components/ui/FilterPills';
import { MotionPage } from '../components/ui/MotionPage';
import { SectionHeading } from '../components/ui/SectionHeading';
import { toolCategories } from '../data/categories';
import { tools as localTools } from '../data/tools';
import type { ToolCategory } from '../data/types';
import { useAsyncData } from '../hooks/useAsyncData';
import { getPublishedTools } from '../lib/contentRepository';

export function ToolsPage() {
  const [category, setCategory] = useState<ToolCategory | '全部'>('全部');
  const { data: tools, error, loading } = useAsyncData(getPublishedTools, localTools, []);

  const filteredTools = useMemo(
    () => tools.filter((tool) => category === '全部' || tool.category === category),
    [category, tools],
  );

  return (
    <MotionPage>
      <section className="page-section page-hero">
        <SectionHeading
          eyebrow="Tools"
          title="工具入口"
          description="区分自研工具和常用资源。没有真实访问地址的工具只展示计划，不跳转到假链接。"
        />
        {loading ? <p className="data-note">正在读取工具内容...</p> : null}
        {error ? <p className="data-note">{error}</p> : null}
      </section>
      <section className="page-section compact-section">
        <div className="tool-summary">
          <div className="glass-card metric-card">
            <strong>{tools.filter((tool) => tool.isSelfBuilt).length}</strong>
            <span>自研工具</span>
          </div>
          <div className="glass-card metric-card">
            <strong>{tools.filter((tool) => !tool.isSelfBuilt).length}</strong>
            <span>常用资源</span>
          </div>
        </div>
        <FilterPills items={toolCategories} value={category} onChange={setCategory} label="工具分类筛选" />
        {filteredTools.length > 0 ? (
          <div className="card-grid tools-grid">
            {filteredTools.map((tool) => (
              <ToolCard tool={tool} key={tool.id} />
            ))}
          </div>
        ) : (
          <EmptyState title="暂时没有匹配工具" description="切换分类后，可以继续查看当前工具库。" />
        )}
      </section>
    </MotionPage>
  );
}
