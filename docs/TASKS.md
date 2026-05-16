# 个人数字平台开发任务清单 TASKS

> 状态标记：`[ ]` 未开始；`[~]` 进行中；`[x]` 已完成；`[!]` 需修复。

## 0. 开发执行规则

- [x] 已阅读 `docs/PRD.md`。
- [x] 已确认项目名称为“个人数字平台”。
- [x] 已确认整体风格为蓝白极简拟态风。
- [x] 已确认交互方案为“纵向主滚动 + 局部横向滑动 + 模块切换动效”。
- [x] 已确认第一版不做登录、后台、数据库、评论等复杂功能。
- [x] 已在开发完成后更新 `docs/CHANGELOG.md`。
- [x] 已根据 `docs/ACCEPTANCE.md` 自检。

## 1. 项目初始化

- [x] 初始化 React + Vite + TypeScript 项目。
- [x] 安装并配置 React、Vite、TypeScript、React Router、Framer Motion。
- [x] 安装并配置 ESLint、Prettier。
- [x] 安装并配置 Vitest、Testing Library、jest-dom、jsdom。
- [x] 安装并配置 Playwright，浏览器二进制保存在项目内 `.playwright-browsers`。
- [x] 配置 `npm run dev`、`npm run build`、`npm run lint`、`npm run format`、`npm run test`、`npm run test:ui`。
- [x] 建立 `src/components`、`src/pages`、`src/data`、`src/styles`、`src/test`、`tests/e2e` 目录。
- [x] 配置全局 CSS Reset、蓝白主题变量、玻璃拟态卡片、统一按钮与标签样式。
- [x] 配置基础路由。

## 2. 文档与资源

- [x] 保留 `docs/PRD.md`。
- [x] 更新 `docs/TASKS.md`。
- [x] 更新 `docs/CHANGELOG.md`。
- [x] 更新 `docs/ACCEPTANCE.md`。
- [x] 保留 `docs/assets` 目录。
- [x] 在 `README.md` 中说明启动与校验方式。

## 3. 全局布局

- [x] 完成全局页面容器。
- [x] 完成顶部导航栏。
- [x] 完成桌面端与移动端响应式导航。
- [x] 完成 Footer。
- [x] 完成全站蓝白渐变背景。
- [x] 完成玻璃拟态 / 轻拟态基础卡片样式。
- [x] 完成统一按钮、标签、筛选胶囊样式。

## 4. 首页

- [x] 完成 Hero 首屏布局。
- [x] 添加“个人数字平台”主标题与简介文案。
- [x] 添加“探索我的项目”和“阅读我的博客”主按钮。
- [x] 添加右侧平台概览视觉卡片。
- [x] 添加项目、博客、工具、关于四个核心入口卡片。
- [x] 完成精选项目横向滑动模块。
- [x] 完成最新博客横向展示模块。
- [x] 完成常用工具横向展示模块。
- [x] 完成关于与联系收尾区域。
- [x] 添加滚动入场、卡片 hover、按钮 hover 等克制动效。

## 5. 项目作品页

- [x] 完成 `/projects` 页面。
- [x] 完成 `src/data/projects.ts` 本地项目数据。
- [x] 完成项目卡片组件。
- [x] 完成项目类型筛选。
- [x] 完成项目状态筛选。
- [x] 展示项目状态、标签、技术栈与详情入口。
- [x] 完成响应式适配与卡片动效。

## 6. 项目详情页

- [x] 完成 `/projects/:id` 动态路由。
- [x] 展示项目名称、简介、背景、核心功能、技术栈、状态和封面区域。
- [x] 展示访问链接与 GitHub 链接。
- [x] 展示后续计划。
- [x] 添加返回项目列表按钮。
- [x] 处理不存在项目的兜底状态。

## 7. 博客页

- [x] 完成 `/blog` 页面。
- [x] 完成 `src/data/posts.ts` 本地博客数据。
- [x] 完成博客卡片组件。
- [x] 完成博客分类筛选。
- [x] 完成标题与摘要搜索。
- [x] 展示文章日期、分类、标签与详情入口。
- [x] 完成响应式适配与卡片动效。

## 8. 博客详情页

- [x] 完成 `/blog/:id` 动态路由。
- [x] 展示文章标题、发布时间、分类、标签、摘要和正文。
- [x] 添加返回博客列表按钮。
- [x] 添加上一篇 / 下一篇入口。
- [x] 完成移动端阅读体验适配。
- [x] 处理不存在文章的兜底状态。

## 9. 工具入口页

- [x] 完成 `/tools` 页面。
- [x] 完成 `src/data/tools.ts` 本地工具数据。
- [x] 完成工具卡片组件。
- [x] 区分自研工具和常用工具。
- [x] 完成工具分类筛选。
- [x] 完成内部工具与外部工具链接跳转。
- [x] 添加工具卡片 hover 动效。
- [x] 完成响应式适配。

## 10. 关于页

- [x] 完成 `/about` 页面。
- [x] 添加个人简介。
- [x] 添加当前关注方向。
- [x] 添加正在构建的项目类型说明。
- [x] 添加站点说明。
- [x] 添加联系方式入口。
- [x] 保持蓝白极简拟态风格统一。

## 11. 动效与交互

- [x] 完成页面切换动效。
- [x] 完成首页模块滚动入场动效。
- [x] 完成 Hero 首屏入场体验。
- [x] 完成卡片 hover、按钮 hover。
- [x] 完成项目横向滑动。
- [x] 完成博客横向展示。
- [x] 完成工具横向展示。
- [x] 动效不影响页面阅读和操作。

## 12. 响应式适配

- [x] 桌面端布局正常。
- [x] 平板端布局正常。
- [x] 手机端布局正常。
- [x] 移动端导航可用。
- [x] 横向滑动模块在移动端可用。
- [x] 标题不溢出。
- [x] 卡片不重叠。
- [x] 页面无异常横向滚动。

## 13. 测试与验证

- [x] `npm run lint` 通过。
- [x] `npm run test` 通过，Vitest + Testing Library 覆盖首页、博客搜索、项目详情。
- [x] `npm run build` 通过，完成 TypeScript 与 Vite 打包验证。
- [x] `npm run test:ui` 通过，Playwright 覆盖导航、详情跳转、横向滑动、移动端宽度。

## 最终问题记录

```text
当前第一版主要功能与验证均已完成。npm install 报告若干依赖审计漏洞，未执行 npm audit fix --force，避免引入破坏性升级。
```

## 14. 第一阶段线上补丁任务

- [x] 修复 Vercel 深层路由直接访问 / 刷新 404。
- [x] 新增 `vercel.json` rewrite 到 `/index.html`。
- [x] 复测 `/projects/:id`、`/blog/:id` 直接访问和刷新。
- [x] 补充 SEO 基础文件：favicon、`robots.txt`、`sitemap.xml`。
- [x] 补充 `index.html` 的 Open Graph / Twitter Card meta。
- [x] 清理占位链接和占位文案。
- [x] 无真实链接的按钮隐藏、禁用或显示“暂未上线”。
- [x] 修复横向滑动模块鼠标滚轮无法左右滚动的问题。
- [x] 鼠标位于横向模块内部时，将纵向滚轮映射为横向滚动。
- [x] 鼠标离开横向模块后，页面恢复正常纵向滚动。
- [x] 横向滚动到边界后，允许页面继续纵向滚动。
- [x] 为横向模块增加左右按钮 / 进度条 / 边缘渐隐提示。
- [x] 调整卡片视觉比例，修复椭圆封面嵌套灰色方块的奇怪观感。
- [x] 统一项目、博客、工具卡片封面比例。
- [x] 优化 Hero、Footer、社交入口和作品集质感。
- [x] 复查移动端导航，必要时改为菜单按钮 / 抽屉导航。
- [x] 更新对应测试用例。
- [x] 运行 `npm run lint`。
- [x] 运行 `npm run test`。
- [x] 运行 `npm run build`。
- [x] 运行 `npm run test:ui`。
- [~] 重新部署 Vercel：随本次 GitHub push 触发。
- [ ] 线上复测所有核心路径。

## 15. 第二阶段 Supabase 轻后台任务

- [ ] 设计 Supabase 数据表：`posts`、`projects`、`tools`。
- [ ] 为 `posts`、`projects`、`tools` 增加稳定 `slug`。
- [ ] 为后期拆分预留 `canonical_url`、`redirect_from` 字段。
- [ ] 配置 Supabase Auth，仅允许站主登录。
- [ ] 配置 RLS，限制只有站主可写入、更新、删除。
- [ ] 新增 `/studio/login`。
- [ ] 新增 `/studio/dashboard`。
- [ ] 新增博客管理列表。
- [ ] 新增博客新建 / 编辑页面。
- [ ] 支持博客草稿、发布、归档状态。
- [ ] 支持博客 slug、标题、摘要、正文、分类、标签、发布时间。
- [ ] 新增项目管理列表。
- [ ] 新增项目新建 / 编辑页面。
- [ ] 支持项目 slug、封面、技术栈、状态、精选、排序。
- [ ] 新增工具管理列表。
- [ ] 新增工具新建 / 编辑页面。
- [ ] 支持工具 slug、分类、图标、推荐、自研标记、排序。
- [ ] 前台项目、博客、工具页面改为从 Supabase 读取 published 内容。
- [ ] 保留本地 fallback 数据，避免接口异常时页面完全空白。
- [ ] 增加基础 loading、empty、error 状态。
- [ ] 配置环境变量文档。
- [ ] 更新 README 和验收标准。

## 16. 长期架构预留：总站与子站拆分

- [ ] 在 PRD 中明确主站长期定位为个人数字总入口。
- [ ] 在 PRD 中明确后期允许博客、项目、工具逐步拆分为独立子站。
- [ ] 明确当前阶段不拆分，仍使用单站点路径结构。
- [ ] 明确 Supabase 是未来主站和子站共享的数据源。
- [ ] 明确内容使用稳定 slug，避免后期迁移困难。
- [ ] 明确后期拆分时需要保留旧路径跳转。
- [ ] 预留 `blog.nexfolio.com`、`projects.nexfolio.com`、`tools.nexfolio.com` 等子域名结构。
- [ ] 预留主站精选预览 + 子站完整内容的产品结构。
- [ ] 后期拆分前评估内容规模，不一次性拆全部模块。

## 17. 第二阶段 Supabase Studio 实现记录

- [x] 安装并配置 `@supabase/supabase-js`。
- [x] 新增 `.env.example`，声明 `VITE_SUPABASE_URL` 与 `VITE_SUPABASE_ANON_KEY`。
- [x] 新增 `src/lib/supabase.ts`，环境变量缺失时不创建客户端并返回清晰提示。
- [x] 新增统一内容访问层：`getPublishedPosts`、`getPublishedPostBySlug`、`getPublishedProjects`、`getPublishedProjectBySlug`、`getPublishedTools`。
- [x] 前台首页、项目页、项目详情页、博客页、博客详情页、工具页优先读取 Supabase published 内容。
- [x] Supabase 未配置、请求失败或数据为空时，前台自动回退本地 TypeScript 数据。
- [x] 新增 loading / error / empty 基础状态，不因 Supabase 缺失白屏。
- [x] 新增 `/studio/login`，未配置 Supabase 时显示明确提示。
- [x] 新增受保护 `/studio` 后台路由，未登录访问会跳转登录页。
- [x] 新增 Studio 概览、博客列表、项目列表、工具列表。
- [x] 新增博客、项目、工具新建与编辑表单。
- [x] 支持保存草稿、发布、取消发布、删除。
- [x] 支持 tags、tech_stack、features、future_plan 文本输入并转换为数组。
- [x] 发布时写入 `is_published = true`，并在 `published_at` 为空时写入当前时间。
- [x] 新增 `supabase/schema.sql`，包含 `posts`、`projects`、`tools` 表、RLS policy 和更新时间 trigger。
- [x] SQL 预留 `canonical_url`、`redirect_from`、SEO、排序和精选字段。
- [x] 新增 `docs/SUPABASE_SETUP.md`，说明 Supabase 项目、SQL、环境变量、Vercel 和站主账号配置。
- [x] 新增 Vitest 测试：列表字段转换、fallback 数据逻辑、Studio 未配置登录提示。
- [x] 新增 Playwright 测试：`/studio/login` 未配置提示与 `/studio` 跳转登录。
- [ ] 手动创建 Supabase 项目。
- [ ] 手动执行 `supabase/schema.sql`。
- [ ] 手动配置本地 `.env.local` 与 Vercel 环境变量。
- [ ] 手动创建第一个站主账号。
- [ ] 配置 Supabase 后进行真实 CRUD 线上验收。
