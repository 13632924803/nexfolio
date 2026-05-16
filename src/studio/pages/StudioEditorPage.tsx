import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  createEmptyForm,
  deleteStudioRecord,
  getStudioRecord,
  recordToForm,
  saveStudioRecord,
  studioLabels,
  unpublishStudioRecord,
} from '../studioRepository';
import type { StudioFormValues, StudioKind } from '../types';

function isStudioKind(value: string | undefined): value is StudioKind {
  return value === 'posts' || value === 'projects' || value === 'tools';
}

export function StudioEditorPage() {
  const params = useParams();
  const navigate = useNavigate();
  const kind = isStudioKind(params.kind) ? params.kind : 'posts';
  const id = params.id === 'new' ? undefined : params.id;
  const [values, setValues] = useState<StudioFormValues>(() => createEmptyForm(kind));
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage('');
    setValues(createEmptyForm(kind));
    if (id) {
      getStudioRecord(kind, id)
        .then((record) => {
          if (record) {
            setValues(recordToForm(kind, record));
          } else {
            setMessage('内容不存在或无权访问。');
          }
        })
        .catch((error) => setMessage(error instanceof Error ? error.message : '读取内容失败'));
    }
  }, [id, kind]);

  const title = useMemo(() => `${id ? '编辑' : '新建'}${studioLabels[kind].single}`, [id, kind]);

  const update = (key: keyof StudioFormValues, value: string | boolean) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const handleSave = async (publish: boolean) => {
    setMessage('');
    try {
      const savedId = await saveStudioRecord(kind, values, { id, publish });
      setMessage(publish ? '已发布。' : '已保存草稿。');
      if (!id) {
        navigate(`/studio/${kind}/${savedId}/edit`, { replace: true });
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '保存失败');
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    void handleSave(false);
  };

  const handleDelete = async () => {
    if (!id || !window.confirm('确认删除这条内容？此操作不可撤销。')) {
      return;
    }
    await deleteStudioRecord(kind, id);
    navigate(`/studio/${kind}`);
  };

  const handleUnpublish = async () => {
    if (!id) {
      return;
    }
    await unpublishStudioRecord(kind, id);
    setMessage('已取消发布。');
  };

  return (
    <section className="studio-page">
      <div className="studio-page-head">
        <div>
          <span className="eyebrow">{studioLabels[kind].single}</span>
          <h1>{title}</h1>
        </div>
        <Link className="secondary-button" to={`/studio/${kind}`}>
          返回列表
        </Link>
      </div>
      <form className="glass-card studio-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            标题 / 名称
            <input value={values.title} onChange={(event) => update('title', event.target.value)} required />
          </label>
          <label>
            slug
            <input value={values.slug} onChange={(event) => update('slug', event.target.value)} required />
          </label>
          <label>
            分类
            <input value={values.category} onChange={(event) => update('category', event.target.value)} />
          </label>
          <label>
            状态
            <input value={values.status} onChange={(event) => update('status', event.target.value)} />
          </label>
        </div>
        <label>
          摘要 / 描述
          <textarea value={values.summary} onChange={(event) => update('summary', event.target.value)} rows={3} />
        </label>
        <label>
          正文 / 详情
          <textarea value={values.content} onChange={(event) => update('content', event.target.value)} rows={8} />
        </label>
        <label>
          标签（逗号或换行分隔）
          <textarea value={values.tags} onChange={(event) => update('tags', event.target.value)} rows={3} />
        </label>

        {kind === 'projects' ? (
          <div className="form-extra">
            <div className="form-grid">
              <label>
                项目类型
                <input value={values.type} onChange={(event) => update('type', event.target.value)} />
              </label>
              <label>
                封面
                <input value={values.cover} onChange={(event) => update('cover', event.target.value)} />
              </label>
              <label>
                演示链接
                <input value={values.demoUrl} onChange={(event) => update('demoUrl', event.target.value)} />
              </label>
              <label>
                GitHub 链接
                <input value={values.githubUrl} onChange={(event) => update('githubUrl', event.target.value)} />
              </label>
            </div>
            <label>
              技术栈（逗号或换行分隔）
              <textarea value={values.techStack} onChange={(event) => update('techStack', event.target.value)} rows={3} />
            </label>
            <label>
              项目背景
              <textarea value={values.background} onChange={(event) => update('background', event.target.value)} rows={3} />
            </label>
            <label>
              为什么做
              <textarea value={values.reason} onChange={(event) => update('reason', event.target.value)} rows={3} />
            </label>
            <label>
              解决什么问题
              <textarea value={values.problem} onChange={(event) => update('problem', event.target.value)} rows={3} />
            </label>
            <label>
              技术方案
              <textarea value={values.solution} onChange={(event) => update('solution', event.target.value)} rows={3} />
            </label>
            <label>
              核心功能（逗号或换行分隔）
              <textarea value={values.features} onChange={(event) => update('features', event.target.value)} rows={4} />
            </label>
            <label>
              后续计划（逗号或换行分隔）
              <textarea value={values.futurePlan} onChange={(event) => update('futurePlan', event.target.value)} rows={4} />
            </label>
            <label>
              访问链接状态
              <input value={values.linkStatus} onChange={(event) => update('linkStatus', event.target.value)} />
            </label>
            <label className="check-row">
              <input type="checkbox" checked={values.isFeatured} onChange={(event) => update('isFeatured', event.target.checked)} />
              设为精选
            </label>
          </div>
        ) : null}

        {kind === 'tools' ? (
          <div className="form-extra">
            <div className="form-grid">
              <label>
                工具链接
                <input value={values.url} onChange={(event) => update('url', event.target.value)} />
              </label>
              <label>
                图标
                <input value={values.icon} onChange={(event) => update('icon', event.target.value)} />
              </label>
            </div>
            <label className="check-row">
              <input type="checkbox" checked={values.isSelfBuilt} onChange={(event) => update('isSelfBuilt', event.target.checked)} />
              自研工具
            </label>
            <label className="check-row">
              <input
                type="checkbox"
                checked={values.isRecommended}
                onChange={(event) => update('isRecommended', event.target.checked)}
              />
              推荐工具
            </label>
          </div>
        ) : null}

        {message ? <p className="form-message">{message}</p> : null}
        <div className="studio-form-actions">
          <button className="secondary-button" type="submit">
            保存草稿
          </button>
          <button className="primary-button" type="button" onClick={() => void handleSave(true)}>
            发布
          </button>
          {id ? (
            <button className="secondary-button" type="button" onClick={() => void handleUnpublish()}>
              取消发布
            </button>
          ) : null}
          {id ? (
            <button className="danger-button" type="button" onClick={() => void handleDelete()}>
              删除
            </button>
          ) : null}
        </div>
      </form>
    </section>
  );
}
