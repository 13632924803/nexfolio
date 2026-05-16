# Supabase Setup

本文档用于配置 NexFolio 第二阶段轻量真实后台。前台在未配置 Supabase 时会继续使用本地数据，配置完成后会优先读取 Supabase 中已发布内容。

## 1. 创建 Supabase 项目

1. 登录 Supabase。
2. 新建一个项目。
3. 在 Project Settings -> API 中复制：
   - Project URL
   - anon public key
4. 不要把 `service_role` key 放入前端项目、GitHub 或 Vercel 前端环境变量。

## 2. 执行数据库 SQL

1. 打开 Supabase SQL Editor。
2. 复制并执行仓库中的 `supabase/schema.sql`。
3. SQL 会创建：
   - `posts`
   - `projects`
   - `tools`
4. SQL 已启用 Row Level Security，并包含公开读取已发布内容、站主管理自己内容的基础策略。

## 3. 本地环境变量

复制 `.env.example` 为 `.env.local`，并填写：

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

未填写时：

- 前台继续读取本地 TypeScript 数据。
- `/studio/login` 显示 Supabase 未配置提示。
- 测试不会依赖真实 Supabase 项目。

## 4. 创建第一个后台账号

1. 打开 Supabase Dashboard -> Authentication -> Users。
2. 创建站主邮箱账号。
3. 确认该账号可以使用邮箱密码登录。
4. 当前版本是单站主后台，不开放注册入口。

## 5. Vercel 环境变量

在 Vercel 项目中进入 Settings -> Environment Variables，添加：

```bash
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

保存后重新部署。不要添加 `service_role` key。

## 6. 内容发布规则

- `is_published = false` 表示草稿，前台不会显示。
- 发布内容时会设置 `is_published = true`。
- 如果 `published_at` 为空，发布时会写入当前时间。
- 取消发布不会强制清空 `published_at`。
- 前台只读取已发布内容；如果 Supabase 请求失败或没有数据，会回退到本地数据。

## 7. RLS 策略说明

- 匿名访客只能读取 `is_published = true` 的内容。
- 登录用户只能新增、编辑、删除 `owner_id = auth.uid()` 的内容。
- 插入内容时 `owner_id` 必须等于当前登录用户。
- 更新和删除也只允许操作自己的内容。
