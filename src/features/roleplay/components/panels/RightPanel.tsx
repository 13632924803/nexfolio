import { useState } from 'react';
import type {
  ApiStatus,
  CharacterCard,
  MemoryEntry,
  PromptTemplate,
  RoleplaySettings,
  WorldBookEntry,
} from '../../types';

interface Props {
  character?: CharacterCard;
  worldBooks: WorldBookEntry[];
  memories: MemoryEntry[];
  prompts: PromptTemplate[];
  settings: RoleplaySettings;
  apiStatus: ApiStatus;
}

type TabKey = 'character' | 'worldbook' | 'memory' | 'plot' | 'settings';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'character', label: '角色卡' },
  { key: 'worldbook', label: '世界书' },
  { key: 'memory', label: '记忆' },
  { key: 'plot', label: '剧情' },
  { key: 'settings', label: '设置' },
];

export function RightPanel({ character, worldBooks, memories, prompts, settings, apiStatus }: Props) {
  const [tab, setTab] = useState<TabKey>('character');

  return (
    <div className="tavern-right">
      <div className="tavern-right-tabs">
        {tabs.map((t) => (
          <button key={t.key} className={tab === t.key ? 'active' : ''} onClick={() => setTab(t.key)}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="tavern-right-content">
        {tab === 'character' && (
          <>
            <div className="tavern-info-card">
              <h4>角色信息</h4>
              {character ? (
                <>
                  <div className="field-row">
                    <span className="label">姓名</span>
                    <span className="value">{character.name}</span>
                  </div>
                  <div className="field-row">
                    <span className="label">身份</span>
                    <span className="value">{character.identity ?? '未设定'}</span>
                  </div>
                  <div className="field-row">
                    <span className="label">性格</span>
                    <span className="value">{character.personality ?? '未设定'}</span>
                  </div>
                  <div className="field-row">
                    <span className="label">说话风格</span>
                    <span className="value">{character.speakingStyle ?? '未设定'}</span>
                  </div>
                  <div className="field-row">
                    <span className="label">与你的关系</span>
                    <span className="value">{character.relationship ?? '未设定'}</span>
                  </div>
                  <div className="field-row">
                    <span className="label">当前阶段</span>
                    <span className="value">{character.stage ?? '未设定'}</span>
                  </div>
                </>
              ) : (
                <p>未选择角色</p>
              )}
            </div>

            <div className="tavern-info-card">
              <h4>角色简介</h4>
              <p>{character?.description ?? '请在左侧选择一个角色以查看简介。'}</p>
            </div>

            <div className="tavern-info-card">
              <h4>开场白</h4>
              <p>{character?.greeting ?? '该角色暂未设置开场白。'}</p>
            </div>
          </>
        )}

        {tab === 'worldbook' && (
          <>
            <div className="tavern-info-card">
              <h4>世界书条目</h4>
              <p>共 {worldBooks.length} 个条目</p>
            </div>
            {worldBooks.map((wb) => (
              <div className="tavern-info-card" key={wb.id}>
                <h4>
                  {wb.enabled ? '' : '[已禁用] '}
                  {wb.title}
                </h4>
                <span className="tavern-tag scene" style={{ marginBottom: 6, display: 'inline-block' }}>
                  {wb.category}
                </span>
                <p>{wb.content.slice(0, 120)}…</p>
              </div>
            ))}
          </>
        )}

        {tab === 'memory' && (
          <>
            <div className="tavern-info-card">
              <h4>记忆摘要</h4>
              <p>共 {memories.length} 条记忆</p>
            </div>
            {memories.map((m) => (
              <div className="tavern-info-card" key={m.id}>
                <h4>
                  <span className="tavern-tag scene" style={{ marginRight: 6 }}>
                    {m.type}
                  </span>
                </h4>
                <p>{m.content.slice(0, 150)}</p>
              </div>
            ))}
            <div className="tavern-info-card">
              <h4>长期记忆设置</h4>
              <p>短期记忆窗口: 20 条消息</p>
              <p>长期记忆策略: 摘要压缩 (计划中)</p>
              <p>自动摘要: 每 50 条消息触发一次 (计划中)</p>
            </div>
          </>
        )}

        {tab === 'plot' && (
          <>
            <div className="tavern-info-card">
              <h4>当前剧情</h4>
              <p>当前场景: 魔法森林 · 星塔外围</p>
              <p>剧情状态: 进行中</p>
              <p>剧情标签: 魔法 / 冒险 / 探索</p>
            </div>
            <div className="tavern-info-card">
              <h4>场景备注</h4>
              <p>
                艾琳与你正在探索星塔第一层。你们发现了古代星图残片，上面记录着关于"命运分叉点"的预言。迷雾正在缓慢消散……
              </p>
            </div>
          </>
        )}

        {tab === 'settings' && (
          <>
            <div className="tavern-info-card">
              <h4>模型设置</h4>
              <div className="field-row">
                <span className="label">Provider</span>
                <span className="value">{settings.provider}</span>
              </div>
              <div className="field-row">
                <span className="label">模型</span>
                <span className="value">{settings.model}</span>
              </div>
              <div className="field-row">
                <span className="label">Temperature</span>
                <span className="value">{settings.temperature}</span>
              </div>
              <div className="field-row">
                <span className="label">Max Tokens</span>
                <span className="value">{settings.maxTokens}</span>
              </div>
              <div className="field-row">
                <span className="label">上下文条数</span>
                <span className="value">{settings.contextMessageLimit}</span>
              </div>
            </div>

            <div className="tavern-info-card">
              <h4>提示词模板</h4>
              <p>已加载 {prompts.length} 个模板</p>
              {prompts.slice(0, 2).map((p) => (
                <p key={p.id} style={{ marginTop: 4 }}>
                  · {p.title}
                </p>
              ))}
            </div>

            <div className="tavern-info-card">
              <h4>API / Provider</h4>
              <div className="field-row">
                <span className="label">状态</span>
                <span className="value" style={{ color: apiStatus.connected ? 'var(--rp-green)' : 'var(--rp-muted)' }}>
                  {apiStatus.connected ? '已连接' : '未连接'}
                </span>
              </div>
              <div className="field-row">
                <span className="label">Provider</span>
                <span className="value">{apiStatus.provider}</span>
              </div>
              <div className="field-row">
                <span className="label">模型</span>
                <span className="value">{apiStatus.model}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
