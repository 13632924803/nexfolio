import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { EmptyState } from '../../components/ui/EmptyState';
import { listStudioRecords, studioLabels } from '../studioRepository';
import type { StudioKind, StudioRecord } from '../types';

function isStudioKind(value: string | undefined): value is StudioKind {
  return value === 'posts' || value === 'projects' || value === 'tools';
}

export function StudioListPage() {
  const params = useParams();
  const kind = isStudioKind(params.kind) ? params.kind : 'posts';
  const [records, setRecords] = useState<StudioRecord[]>([]);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage('');
    listStudioRecords(kind)
      .then(setRecords)
      .catch((error) => setMessage(error instanceof Error ? error.message : '读取列表失败'));
  }, [kind]);

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return records.filter((record) => {
      const matchesStatus =
        filter === 'all' || (filter === 'published' ? record.is_published : !record.is_published);
      const title = record.title || record.name || '';
      const matchesQuery = !keyword || title.toLowerCase().includes(keyword) || record.slug.includes(keyword);
      return matchesStatus && matchesQuery;
    });
  }, [filter, query, records]);

  return (
    <section className="studio-page">
      <div className="studio-page-head">
        <div>
          <span className="eyebrow">{studioLabels[kind].plural}</span>
          <h1>{studioLabels[kind].plural}管理</h1>
        </div>
        <Link className="primary-button" to={`/studio/${kind}/new`}>
          新建
        </Link>
      </div>
      <div className="studio-toolbar">
        <input
          aria-label="搜索后台内容"
          placeholder="搜索标题或 slug"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select aria-label="发布状态筛选" value={filter} onChange={(event) => setFilter(event.target.value as typeof filter)}>
          <option value="all">全部</option>
          <option value="published">已发布</option>
          <option value="draft">草稿</option>
        </select>
      </div>
      {message ? <p className="form-message">{message}</p> : null}
      {filtered.length > 0 ? (
        <div className="glass-card studio-list">
          {filtered.map((record) => (
            <Link to={`/studio/${kind}/${record.id}/edit`} className="studio-list-row" key={record.id}>
              <span>{record.title || record.name}</span>
              <small>{record.slug}</small>
              <small>{record.is_published ? '已发布' : '草稿'}</small>
              <small>{new Date(record.updated_at).toLocaleString()}</small>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState title="暂无匹配内容" description="可以调整筛选条件，或新建一条内容。" />
      )}
    </section>
  );
}
