export type ProjectType =
  | '个人网站'
  | '网页工具'
  | '微信小程序'
  | 'AI 应用'
  | '自动化工具'
  | '实验项目'
  | '独立子站';

export type ProjectStatus = '开发中' | '已上线' | '计划中' | '维护中' | '已暂停';

export type BlogCategory = '开发记录' | '项目复盘' | 'AI 工具' | '学习笔记' | '网站搭建' | '生活想法';

export type ToolCategory = '自研工具' | 'AI 工具' | '开发工具' | '效率工具' | '设计工具' | '资源网站';

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  type: ProjectType;
  status: ProjectStatus;
  tags: string[];
  techStack: string[];
  cover?: string;
  demoUrl?: string;
  githubUrl?: string;
  detail: string;
  background: string;
  reason: string;
  problem: string;
  solution: string;
  features: string[];
  linkStatus: string;
  futurePlan?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  category: BlogCategory;
  tags: string[];
  date: string;
  cover?: string;
  content: string[];
}

export interface ToolItem {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  url?: string;
  icon?: string;
  isSelfBuilt: boolean;
  isRecommended?: boolean;
  status?: '可访问' | '暂未上线';
}
