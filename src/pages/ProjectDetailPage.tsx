import { Link, useParams } from 'react-router-dom';
import { EmptyState } from '../components/ui/EmptyState';
import { MotionPage } from '../components/ui/MotionPage';
import { projects as localProjects } from '../data/projects';
import { useAsyncData } from '../hooks/useAsyncData';
import { getPublishedProjectBySlug } from '../lib/contentRepository';

export function ProjectDetailPage() {
  const { id = '' } = useParams();
  const fallback = localProjects.find((item) => item.id === id);
  const { data: project, loading } = useAsyncData(
    () => getPublishedProjectBySlug(id),
    fallback,
    [id],
  );

  if (!project && !loading) {
    return (
      <MotionPage>
        <section className="page-section">
          <EmptyState
            title="项目不存在"
            description="这个项目可能还没有发布，或链接已经调整。"
            actionLabel="返回项目列表"
            actionTo="/projects"
          />
        </section>
      </MotionPage>
    );
  }

  if (!project) {
    return (
      <MotionPage>
        <section className="page-section">
          <EmptyState title="正在读取项目" description="正在加载项目详情，未配置 Supabase 时会自动使用本地数据。" />
        </section>
      </MotionPage>
    );
  }

  return (
    <MotionPage>
      <article className="page-section detail-layout project-case">
        <div className="detail-main glass-card">
          <span className="eyebrow">{project.type}</span>
          <h1>{project.title}</h1>
          <p className="lead">{project.detail}</p>
          <div className="tag-row">
            <span className="tag">{project.status}</span>
            {project.techStack.map((tech) => (
              <span className="tag" key={tech}>
                {tech}
              </span>
            ))}
          </div>

          <section>
            <h2>项目背景</h2>
            <p>{project.background}</p>
          </section>
          <section>
            <h2>为什么做</h2>
            <p>{project.reason}</p>
          </section>
          <section>
            <h2>解决什么问题</h2>
            <p>{project.problem}</p>
          </section>
          <section>
            <h2>技术方案</h2>
            <p>{project.solution}</p>
          </section>
          <section>
            <h2>核心功能</h2>
            <ul className="feature-list">
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2>当前状态</h2>
            <p>{project.linkStatus}</p>
          </section>
          {project.futurePlan ? (
            <section>
              <h2>后续计划</h2>
              <ul className="feature-list">
                {project.futurePlan.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}
          <div className="detail-actions">
            <Link className="secondary-button" to="/projects">
              返回项目列表
            </Link>
            {project.demoUrl ? (
              <a className="primary-button" href={project.demoUrl}>
                访问项目
              </a>
            ) : (
              <span className="secondary-button is-disabled">暂未上线</span>
            )}
            {project.githubUrl ? (
              <a className="secondary-button" href={project.githubUrl} target="_blank" rel="noreferrer">
                GitHub
              </a>
            ) : null}
          </div>
        </div>
        <aside className="detail-side glass-card">
          <div className="cover-panel large">
            <span className="cover-kicker">{project.status}</span>
            <strong>{project.cover ?? project.title}</strong>
            <i aria-hidden="true" />
          </div>
          <strong>技术栈</strong>
          <div className="tag-row">
            {project.techStack.map((tech) => (
              <span className="tag" key={tech}>
                {tech}
              </span>
            ))}
          </div>
          <strong>访问链接状态</strong>
          <p>{project.linkStatus}</p>
        </aside>
      </article>
    </MotionPage>
  );
}
