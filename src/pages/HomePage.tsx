import { Link } from 'react-router-dom';
import { BlogCard } from '../components/cards/BlogCard';
import { ProjectCard } from '../components/cards/ProjectCard';
import { ToolCard } from '../components/cards/ToolCard';
import { HorizontalRail } from '../components/sections/HorizontalRail';
import { MotionPage } from '../components/ui/MotionPage';
import { MotionSection } from '../components/ui/MotionSection';
import { SectionHeading } from '../components/ui/SectionHeading';
import { projects as localProjects } from '../data/projects';
import { posts as localPosts } from '../data/posts';
import { site } from '../data/site';
import { tools as localTools } from '../data/tools';
import { useAsyncData } from '../hooks/useAsyncData';
import { getPublishedPosts, getPublishedProjects, getPublishedTools } from '../lib/contentRepository';

const entryCards = [
  { title: '项目作品', text: '查看正在构建和已经沉淀的数字产品。', to: '/projects' },
  { title: '博客记录', text: '阅读开发过程、学习笔记和项目复盘。', to: '/blog' },
  { title: '工具入口', text: '进入自研工具计划与常用外部资源。', to: '/tools' },
  { title: '关于我', text: '了解当前关注方向和站点说明。', to: '/about' },
];

export function HomePage() {
  const { data: projects, loading: projectsLoading } = useAsyncData(getPublishedProjects, localProjects, []);
  const { data: posts, loading: postsLoading } = useAsyncData(getPublishedPosts, localPosts, []);
  const { data: tools, loading: toolsLoading } = useAsyncData(getPublishedTools, localTools, []);

  return (
    <MotionPage>
      <section className="hero page-section">
        <div className="hero-copy">
          <span className="eyebrow">Personal Digital Platform</span>
          <h1>{site.name}</h1>
          <p>{site.tagline}</p>
          <div className="hero-actions">
            <Link className="primary-button" to="/projects">
              探索我的项目
            </Link>
            <Link className="secondary-button" to="/blog">
              阅读我的博客
            </Link>
          </div>
        </div>
        <div className="hero-visual" aria-label="个人数字平台概览">
          <div className="visual-card main">
            <span>Now Building</span>
            <strong>NexFolio</strong>
            <p>Projects · Blog · Tools</p>
          </div>
          <div className="visual-card mini top">Supabase Ready</div>
          <div className="visual-card mini bottom">Blue Glass UI</div>
        </div>
      </section>

      <MotionSection className="page-section">
        <div className="entry-grid">
          {entryCards.map((card) => (
            <Link className="glass-card entry-card" to={card.to} key={card.title}>
              <span>{card.title}</span>
              <p>{card.text}</p>
            </Link>
          ))}
        </div>
      </MotionSection>

      <MotionSection className="page-section" id="featured-projects">
        <SectionHeading
          eyebrow="Projects"
          title="精选项目"
          description={
            projectsLoading
              ? '正在读取项目内容，未配置 Supabase 时会自动使用本地数据。'
              : '局部横向滑动展示重点作品，保留纵向主浏览节奏。'
          }
        />
        <HorizontalRail label="精选项目横向滑动">
          {projects.slice(0, 5).map((project, index) => (
            <ProjectCard project={project} featured={index === 0} key={project.id} />
          ))}
        </HorizontalRail>
      </MotionSection>

      <MotionSection className="page-section">
        <SectionHeading
          eyebrow="Blog"
          title="最新博客"
          description={
            postsLoading
              ? '正在读取博客内容，未配置 Supabase 时会自动使用本地数据。'
              : '记录开发过程、项目复盘和学习笔记。'
          }
        />
        <HorizontalRail label="最新博客横向滑动">
          {posts.slice(0, 3).map((post) => (
            <BlogCard post={post} key={post.id} />
          ))}
        </HorizontalRail>
      </MotionSection>

      <MotionSection className="page-section">
        <SectionHeading
          eyebrow="Tools"
          title="常用工具入口"
          description={
            toolsLoading
              ? '正在读取工具内容，未配置 Supabase 时会自动使用本地数据。'
              : '自研工具计划与常用资源统一收纳，避免跳转到无意义占位地址。'
          }
        />
        <HorizontalRail label="工具横向滑动">
          {tools.slice(0, 5).map((tool) => (
            <ToolCard tool={tool} key={tool.id} />
          ))}
        </HorizontalRail>
      </MotionSection>

      <MotionSection className="page-section about-strip">
        <div>
          <span className="eyebrow">About</span>
          <h2>持续构建一个清晰、可扩展的个人数字入口。</h2>
          <p>{site.description}</p>
        </div>
        <Link className="primary-button" to="/about">
          了解更多
        </Link>
      </MotionSection>
    </MotionPage>
  );
}
