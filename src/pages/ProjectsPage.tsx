import { useMemo, useState } from 'react';
import { ProjectCard } from '../components/cards/ProjectCard';
import { EmptyState } from '../components/ui/EmptyState';
import { FilterPills } from '../components/ui/FilterPills';
import { MotionPage } from '../components/ui/MotionPage';
import { SectionHeading } from '../components/ui/SectionHeading';
import { projectStatuses, projectTypes } from '../data/categories';
import { projects as localProjects } from '../data/projects';
import type { ProjectStatus, ProjectType } from '../data/types';
import { useAsyncData } from '../hooks/useAsyncData';
import { getPublishedProjects } from '../lib/contentRepository';

export function ProjectsPage() {
  const [type, setType] = useState<ProjectType | '全部'>('全部');
  const [status, setStatus] = useState<ProjectStatus | '全部'>('全部');
  const { data: projects, error, loading } = useAsyncData(getPublishedProjects, localProjects, []);

  const filteredProjects = useMemo(
    () =>
      projects.filter(
        (project) => (type === '全部' || project.type === type) && (status === '全部' || project.status === status),
      ),
    [projects, status, type],
  );

  return (
    <MotionPage>
      <section className="page-section page-hero">
        <SectionHeading
          eyebrow="Projects"
          title="项目作品"
          description="展示个人开发项目、网页工具、AI 应用、自动化工具和实验作品。"
        />
        {loading ? <p className="data-note">正在读取项目内容...</p> : null}
        {error ? <p className="data-note">{error}</p> : null}
      </section>
      <section className="page-section compact-section">
        <FilterPills items={projectTypes} value={type} onChange={setType} label="项目类型筛选" />
        <FilterPills items={projectStatuses} value={status} onChange={setStatus} label="项目状态筛选" />
        {filteredProjects.length > 0 ? (
          <div className="card-grid">
            {filteredProjects.map((project) => (
              <ProjectCard project={project} key={project.id} />
            ))}
          </div>
        ) : (
          <EmptyState title="暂时没有匹配项目" description="换一个类型或状态筛选，继续浏览当前作品库。" />
        )}
      </section>
    </MotionPage>
  );
}
