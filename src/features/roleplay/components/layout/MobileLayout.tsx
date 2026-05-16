import { useState } from 'react';
import type {
  CharacterCard,
  MemoryEntry,
  RoleplayMessage,
  RoleplaySession,
  WorldBookEntry,
} from '../../types';
import { MessageBubble } from '../chat/MessageBubble';
import { MobileBottomNav } from '../panels/MobileBottomNav';

interface Props {
  characters: CharacterCard[];
  sessions: RoleplaySession[];
  messages: RoleplayMessage[];
  worldBooks: WorldBookEntry[];
  memories: MemoryEntry[];
  activeCharacter?: CharacterCard;
  activeSession?: RoleplaySession;
}

export function MobileLayout({
  characters,
  sessions,
  messages,
  worldBooks,
  memories,
  activeCharacter,
  activeSession,
}: Props) {
  const [navActive, setNavActive] = useState('tavern');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState<'characters' | 'sessions' | 'menu'>('menu');

  const openDrawer = (type: 'characters' | 'sessions' | 'menu') => {
    setDrawerType(type);
    setDrawerOpen(true);
  };

  return (
    <div className="tavern-mobile">
      {/* 顶部标题栏 */}
      <div className="tavern-mobile-topbar">
        <div className="brand-icon">T</div>
        <h2>角色酒馆</h2>
        <button onClick={() => openDrawer('sessions')} title="切换会话" aria-label="切换会话">
          =
        </button>
        <button onClick={() => openDrawer('menu')} title="菜单" aria-label="菜单">
          M
        </button>
      </div>

      {/* 当前会话/角色信息条 */}
      {activeSession && (
        <div className="tavern-mobile-session-bar">
          <div className="char-avatar">{activeCharacter?.name?.charAt(0) ?? '?'}</div>
          <div className="session-info">
            <strong>{activeSession.title}</strong>
            <span>
              {activeCharacter?.name ?? '未绑定'} · 进行中 · Token ~2,048
            </span>
          </div>
        </div>
      )}

      {/* 消息列表 */}
      <div className="tavern-mobile-messages">
        {messages.map((msg) => (
          <MessageBubble message={msg} key={msg.id} />
        ))}
      </div>

      {/* 场景/记忆/模型卡片 */}
      <div className="tavern-mobile-cards">
        <div className="tavern-mobile-card">
          <h4>当前场景</h4>
          <p>魔法森林 · 星塔外围 — 艾琳与你正在探索星塔第一层……</p>
        </div>
        <div className="tavern-mobile-card">
          <h4>记忆摘要</h4>
          <p>
            {memories[0]?.content.slice(0, 80) ?? '暂无记忆'}
            …
          </p>
        </div>
        <div className="tavern-mobile-card">
          <h4>模型状态</h4>
          <p>DeepSeek · deepseek-chat · 未连接 (占位)</p>
        </div>
      </div>

      {/* 快捷入口 */}
      <div className="tavern-mobile-shortcuts">
        {['角色卡', '世界书', '记忆', '提示词', '设置'].map((label) => (
          <button className="tavern-mobile-shortcut" key={label}>
            {label}
          </button>
        ))}
      </div>

      {/* 输入区 */}
      <div className="tavern-mobile-input">
        <div className="tavern-mobile-input-row">
          <div className="input-wrapper">
            <textarea placeholder="输入消息……" rows={1} />
            <div className="input-tools">
              <button title="附件" aria-label="附件">
                +
              </button>
              <button title="表情" aria-label="表情">
                :)
              </button>
            </div>
          </div>
          <button className="tavern-mobile-send" title="发送" aria-label="发送消息">
            &gt;
          </button>
        </div>
      </div>

      {/* 底部导航 */}
      <MobileBottomNav active={navActive} onNavigate={setNavActive} />

      {/* 抽屉面板 */}
      {drawerOpen && (
        <>
          <div className="tavern-drawer-overlay" onClick={() => setDrawerOpen(false)} />
          <div className="tavern-drawer">
            <div className="tavern-drawer-handle" />

            {drawerType === 'sessions' && (
              <>
                <h4>会话列表</h4>
                {sessions
                  .filter((s) => s.status !== 'archived')
                  .map((s) => (
                    <div
                      key={s.id}
                      className={`tavern-list-item ${s.id === activeSession?.id ? 'active' : ''}`}
                      style={{ marginBottom: 4 }}
                    >
                      <div className="tavern-list-item-avatar">{s.title.charAt(0)}</div>
                      <div className="tavern-list-item-meta">
                        <strong>{s.title}</strong>
                        <span>
                          {characters.find((c) => c.id === s.characterId)?.name ?? '未绑定'}
                        </span>
                      </div>
                    </div>
                  ))}
              </>
            )}

            {drawerType === 'characters' && (
              <>
                <h4>角色列表</h4>
                {characters.map((char) => (
                  <div
                    key={char.id}
                    className={`tavern-list-item ${char.id === activeCharacter?.id ? 'active' : ''}`}
                    style={{ marginBottom: 4 }}
                  >
                    <div className="tavern-list-item-avatar">{char.name.charAt(0)}</div>
                    <div className="tavern-list-item-meta">
                      <strong>{char.name}</strong>
                      <span>{char.relationship ?? '未设定'}</span>
                    </div>
                  </div>
                ))}
              </>
            )}

            {drawerType === 'menu' && (
              <>
                <h4>菜单</h4>
                {[
                  { label: '角色管理', desc: '创建、编辑、删除角色卡' },
                  { label: '世界书', desc: `${worldBooks.length} 个条目` },
                  { label: '记忆管理', desc: `${memories.length} 条记忆` },
                  { label: '提示词模板', desc: '查看与管理模板' },
                  { label: '模型设置', desc: 'DeepSeek · deepseek-chat' },
                  { label: '数据导入导出', desc: '备份与恢复 (计划中)' },
                  { label: '关于角色酒馆', desc: 'V0.1 · 第一阶段框架搭建' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="tavern-list-item"
                    style={{ marginBottom: 4 }}
                  >
                    <div className="tavern-list-item-meta">
                      <strong>{item.label}</strong>
                      <span>{item.desc}</span>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
