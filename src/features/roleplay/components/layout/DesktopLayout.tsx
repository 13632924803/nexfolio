import type {
  ApiStatus,
  CharacterCard,
  MemoryEntry,
  PromptTemplate,
  RoleplayMessage,
  RoleplaySession,
  RoleplaySettings,
  WorldBookEntry,
} from '../../types';
import { ChatArea } from '../chat/ChatArea';
import { ChatInput } from '../chat/ChatInput';
import { LeftSidebar } from '../panels/LeftSidebar';
import { RightPanel } from '../panels/RightPanel';

interface Props {
  characters: CharacterCard[];
  sessions: RoleplaySession[];
  messages: RoleplayMessage[];
  worldBooks: WorldBookEntry[];
  memories: MemoryEntry[];
  prompts: PromptTemplate[];
  settings: RoleplaySettings;
  apiStatus: ApiStatus;
  activeCharacterId?: string;
  activeSessionId?: string;
  activeCharacter?: CharacterCard;
  activeSession?: RoleplaySession;
  onSelectCharacter: (id: string) => void;
  onSelectSession: (id: string) => void;
}

export function DesktopLayout({
  characters,
  sessions,
  messages,
  worldBooks,
  memories,
  prompts,
  settings,
  apiStatus,
  activeCharacterId,
  activeSessionId,
  activeCharacter,
  activeSession,
  onSelectCharacter,
  onSelectSession,
}: Props) {
  return (
    <div className="tavern-desktop">
      <LeftSidebar
        characters={characters}
        sessions={sessions}
        activeCharacterId={activeCharacterId}
        activeSessionId={activeSessionId}
        apiConnected={apiStatus.connected}
        onSelectCharacter={onSelectCharacter}
        onSelectSession={onSelectSession}
      />

      <div className="tavern-center">
        <div className="tavern-topnav">
          {['聊天', '角色卡', '世界书', '记忆', '提示词', '会话', '设置'].map((label) => (
            <button key={label} className={label === '聊天' ? 'active' : ''}>
              {label}
            </button>
          ))}
        </div>

        {activeSession && (
          <div className="tavern-chat-header">
            <div className="tavern-chat-header-avatar">
              {activeCharacter?.name?.charAt(0) ?? '?'}
            </div>
            <div className="tavern-chat-header-info">
              <strong>{activeSession.title}</strong>
              <span>{activeCharacter?.name ?? '未绑定角色'} · 进行中</span>
            </div>
            <div className="tavern-chat-header-tags">
              <span className="tavern-tag">进行中</span>
              {activeSession.tags.map((t) => (
                <span className="tavern-tag scene" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        <ChatArea messages={messages} />
        <ChatInput />

        <div className="tavern-statusbar">
          <div className="tavern-statusbar-item">
            <span className="tavern-statusbar-dot saved" />
            自动保存
          </div>
          <div className="tavern-statusbar-item">
            API: {apiStatus.connected ? '已连接' : '未连接'}
          </div>
          <div className="tavern-statusbar-item">会话时长: 32 min</div>
          <div className="tavern-statusbar-item">消息数: {messages.length}</div>
          <div className="tavern-statusbar-item">Token ~2,048 / 8,192</div>
          <div className="tavern-statusbar-item">上下文: 6 / 20</div>
        </div>
      </div>

      <RightPanel
        character={activeCharacter}
        worldBooks={worldBooks}
        memories={memories}
        prompts={prompts}
        settings={settings}
        apiStatus={apiStatus}
      />
    </div>
  );
}
