import type { CharacterCard, RoleplaySession } from '../../types';

interface Props {
  characters: CharacterCard[];
  sessions: RoleplaySession[];
  activeCharacterId?: string;
  activeSessionId?: string;
  apiConnected: boolean;
  onSelectCharacter?: (id: string) => void;
  onSelectSession?: (id: string) => void;
}

export function LeftSidebar({
  characters,
  sessions,
  activeCharacterId,
  activeSessionId,
  apiConnected,
  onSelectCharacter,
  onSelectSession,
}: Props) {
  const activeSessions = sessions.filter((s) => s.status !== 'archived');
  const archivedSessions = sessions.filter((s) => s.status === 'archived');

  return (
    <div className="tavern-left">
      <div className="tavern-left-header">
        <div className="tavern-brand">
          <div className="tavern-brand-icon">T</div>
          <div>
            <h2>角色酒馆</h2>
            <span>Tavern Chat</span>
          </div>
        </div>
        <div className="tavern-left-actions">
          <button className="btn-new primary">+ 新角色</button>
          <button className="btn-new secondary">+ 剧情</button>
        </div>
      </div>

      <div className="tavern-search">
        <input type="search" placeholder="搜索角色或会话……" />
      </div>

      <div className="tavern-left-list">
        <div className="tavern-list-section">
          <div className="tavern-list-label">角色</div>
          {characters.map((char) => (
            <div
              key={char.id}
              className={`tavern-list-item ${char.id === activeCharacterId ? 'active' : ''}`}
              onClick={() => onSelectCharacter?.(char.id)}
            >
              <div className="tavern-list-item-avatar">{char.name.charAt(0)}</div>
              <div className="tavern-list-item-meta">
                <strong>{char.name}</strong>
                <span>{char.relationship ?? '未设定'}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="tavern-list-section">
          <div className="tavern-list-label">
            会话
            <span>{activeSessions.length}</span>
          </div>
          {activeSessions.map((s) => (
            <div
              key={s.id}
              className={`tavern-list-item ${s.id === activeSessionId ? 'active' : ''}`}
              onClick={() => onSelectSession?.(s.id)}
            >
              <div className="tavern-list-item-avatar">{s.title.charAt(0)}</div>
              <div className="tavern-list-item-meta">
                <strong>{s.title}</strong>
                <span>
                  {characters.find((c) => c.id === s.characterId)?.name ?? '未绑定'}
                </span>
              </div>
              {s.status === 'pinned' && <span className="tavern-list-badge">置顶</span>}
            </div>
          ))}
          {archivedSessions.length > 0 && (
            <div className="tavern-list-item" style={{ opacity: 0.6 }}>
              <div className="tavern-list-item-meta">
                <strong>归档 ({archivedSessions.length})</strong>
                <span>查看已归档会话</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="tavern-left-footer">
        <div className="tavern-status-row">
          <span className={`tavern-status-dot ${apiConnected ? 'on' : 'off'}`} />
          API {apiConnected ? '已连接' : '未连接'}
        </div>
        <div className="tavern-status-row">自动保存 · 就绪</div>
      </div>
    </div>
  );
}
