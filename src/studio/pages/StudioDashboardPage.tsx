import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { EmptyState } from '../../components/ui/EmptyState';
import { listStudioRecords, studioLabels } from '../studioRepository';
import type { StudioKind, StudioRecord } from '../types';

const kinds: StudioKind[] = ['posts', 'projects', 'tools'];

export function StudioDashboardPage() {
  const [records, setRecords] = useState<Record<StudioKind, StudioRecord[]>>({
    posts: [],
    projects: [],
    tools: [],
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    Promise.all(kinds.map((kind) => listStudioRecords(kind)))
      .then(([posts, projects, tools]) => setRecords({ posts, projects, tools }))
      .catch((error) => setMessage(error instanceof Error ? error.message : '读取 Studio 数据失败'));
  }, []);

  const recent = useMemo(
    () =>
      kinds
        .flatMap((kind) => records[kind].map((record) => ({ ...record, kind })))
        .sort((a, b) => (a.updated_at < b.updated_at ? 1 : -1))
        .slice(0, 6),
    [records],
  );

  return (
    <section className="studio-page">
      <div className="studio-page-head">
        <div>
          <span className="eyebrow">Dashboard</span>
          <h1>创作中心概览</h1>
          <p>管理博客、项目和工具内容。前台只读取已发布内容。</p>
        </div>
      </div>
      {message ? <p className="form-message">{message}</p> : null}
      <div className="studio-metrics">
        {kinds.map((kind) => {
          const list = records[kind];
          return (
            <Link className="glass-card metric-card" to={`/studio/${kind}`} key={kind}>
              <strong>{list.length}</strong>
              <span>{studioLabels[kind].plural}</span>
              <small>
                已发布 {list.filter((item) => item.is_published).length} / 草稿{' '}
                {list.filter((item) => !item.is_published).length}
              </small>
            </Link>
          );
        })}
      </div>
      {recent.length > 0 ? (
        <div className="glass-card studio-list">
          <h2>最近更新</h2>
          {recent.map((record) => (
            <Link to={`/studio/${record.kind}/${record.id}/edit`} className="studio-list-row" key={record.id}>
              <span>{record.title || record.name}</span>
              <small>{record.is_published ? '已发布' : '草稿'}</small>
              <small>{new Date(record.updated_at).toLocaleString()}</small>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState title="还没有后台内容" description="先创建一篇博客、一个项目或一个工具，Studio 就会开始有数据。" />
      )}
    </section>
  );
}
