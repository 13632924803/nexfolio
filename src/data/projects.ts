import type { ProjectItem } from './types';

export const projects: ProjectItem[] = [
  {
    id: 'ai-roleplay-tavern',
    title: 'AI Roleplay Tavern',
    description: '面向长篇角色扮演的 AI 酒馆系统，支持角色、世界书、记忆、提示词和多会话扩展。',
    type: '独立子站',
    status: '开发中',
    tags: ['AI', '角色扮演', '酒馆', 'React'],
    techStack: ['React', 'TypeScript', 'Vite'],
    cover: 'AI 角色酒馆界面',
    background: '角色扮演场景需要独立的布局系统、状态管理和上下文扩展能力，不适合内嵌在其他页面中。',
    reason: '将角色酒馆剥离为独立子站，获得自己的技术栈、部署节奏和视觉体系。',
    problem: '内嵌在主站中会与站点导航、样式和路由策略产生冲突，且前端复杂度会随功能叠加快速增长。',
    solution: '独立 Vite + React 项目，自建项目结构，后续可按需接入后端 API 和模型调用。',
    detail: 'AI Roleplay Tavern 是一个独立运行的 Web 应用，提供桌面端三栏布局和移动端适配的酒馆式角色扮演界面。',
    features: ['角色卡管理', '世界书系统', '记忆摘要', '提示词模板', '多会话切换', '响应式布局'],
    linkStatus: '暂未上线，独立子站已完成第一阶段框架搭建。',
    futurePlan: ['接入真实 AI 模型 API', '世界书自动注入上下文', '长期记忆压缩策略', '数据导入导出'],
  },
  {
    id: 'nexfolio',
    title: 'NexFolio 个人数字平台',
    description: '聚合项目、文章、工具与个人方向的主站入口，作为后续数字产品的总导航。',
    type: '个人网站',
    status: '开发中',
    tags: ['个人主页', '作品集', '内容聚合'],
    techStack: ['React', 'TypeScript', 'Vite', 'Framer Motion'],
    demoUrl: 'https://nexfolio-one.vercel.app/',
    githubUrl: 'https://github.com/13632924803/nexfolio',
    cover: '数字主站界面',
    background:
      '早期工具集合站过于松散，无法承载项目复盘、博客记录、工具入口和长期作品展示，需要一个更稳定的个人数字入口。',
    reason:
      '这个项目先解决“所有内容放在哪里”的问题，让项目、博客、工具和个人说明都有清晰的归属。',
    problem:
      '如果只做普通导航页，内容会变成链接堆叠；如果过早接入复杂后台，第一版又会失焦。NexFolio 选择先把信息架构、视觉质感和测试体系打稳。',
    solution:
      '使用 React + Vite 构建静态第一版，以本地 TypeScript 数据维护内容，配合蓝白玻璃拟态视觉、局部横向滑动和端到端测试完成可上线预览。',
    detail:
      'NexFolio 将个人主页、项目作品、博客记录和工具入口收束成统一的蓝白极简空间，方便未来持续挂载新的数字产品。',
    features: [
      '统一导航与响应式布局',
      '本地 TypeScript 数据管理',
      '项目与博客详情路由',
      '横向卡片滑动与滚轮辅助交互',
      'Vercel 预览部署与基础 SEO 文件',
    ],
    linkStatus: '预览站和 GitHub 仓库均可访问，正式域名暂未绑定。',
    futurePlan: ['补充真实项目截图', '进入 Supabase 轻后台阶段', '按内容规模预留博客、项目、工具子站拆分'],
  },
  {
    id: 'ai-prompt-desk',
    title: 'AI Prompt Desk',
    description: '用于沉淀常用提示词、场景模板和复盘笔记的轻量工具计划。',
    type: 'AI 应用',
    status: '计划中',
    tags: ['AI', '提示词', '知识管理'],
    techStack: ['React', 'Local Storage', 'OpenAI API'],
    cover: '提示词工作台',
    background: '日常使用 AI 时，常用场景和优质提示词容易散落在不同笔记中，复用成本较高。',
    reason: '把高频提示词和使用结果放到一个轻量工作台里，方便筛选、复用和继续迭代。',
    problem: '提示词如果只存放在聊天记录或零散文档中，很难形成可检索、可复盘、可共享的个人资产。',
    solution:
      '第一版计划先做离线模板管理、标签筛选和复制入口，后续再考虑同步能力与模型调用记录。',
    detail:
      '该工具计划提供模板管理、标签筛选、复制使用和效果记录，让高频 AI 工作流可以被持续优化。',
    features: ['提示词分类', '模板快速复制', '使用记录', '效果评分'],
    linkStatus: '暂未上线，当前只保留项目计划说明。',
    futurePlan: ['完成离线版本', '探索同步能力', '补充真实使用案例'],
  },
  {
    id: 'mini-automation-hub',
    title: 'Mini Automation Hub',
    description: '收纳个人自动化脚本与小型工作流的入口页计划。',
    type: '自动化工具',
    status: '维护中',
    tags: ['脚本', '效率', '自动化'],
    techStack: ['Node.js', 'PowerShell', 'GitHub Actions'],
    cover: '自动化入口',
    background: '重复性的本地任务、检查任务和发布任务需要统一的说明与入口。',
    reason: '将脚本、触发方式和运行注意事项集中展示，降低自己后续维护和复用成本。',
    problem: '脚本散落在不同目录时，常常只记得“好像写过”，但找不到入口、依赖和使用边界。',
    solution:
      '先以项目案例形式记录脚本目录、执行说明、适用场景和维护状态，后续再抽象为可复用工具模板。',
    detail:
      '该项目偏向个人内部使用，记录脚本用途、触发方式、依赖环境和运行注意事项。',
    features: ['脚本目录', '执行说明', '状态标记', '更新记录'],
    linkStatus: '暂未提供公开访问链接。',
    futurePlan: ['加入运行日志视图', '整理为公开模板', '补充安全执行说明'],
  },
  {
    id: 'glass-note',
    title: 'Glass Note',
    description: '蓝白玻璃风格的极简在线笔记原型，用于验证长文本编辑体验。',
    type: '网页工具',
    status: '已暂停',
    tags: ['笔记', '原型', 'UI'],
    techStack: ['React', 'CSS Modules'],
    cover: '玻璃笔记原型',
    background: '探索轻拟态和玻璃质感在长文本编辑场景中的可读性。',
    reason: '用一个小原型快速验证视觉层级、留白和编辑区布局，而不是直接做完整笔记产品。',
    problem: '玻璃拟态很容易影响文字可读性，需要通过真实输入场景判断它是否适合生产工具。',
    solution:
      '以局部原型测试卡片层级、阴影、背景透明度和文本密度，保留经验到 NexFolio 的视觉规范中。',
    detail:
      '这是一个视觉实验项目，主要验证卡片层级、柔和阴影和留白对写作体验的影响。',
    features: ['笔记列表', '编辑区域', '主题变量', '响应式面板'],
    linkStatus: '实验已暂停，暂不提供访问入口。',
    futurePlan: ['保留为设计实验素材'],
  },
];

export const featuredProjects = projects;
