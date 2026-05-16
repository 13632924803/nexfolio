// ===== 角色酒馆 · 核心类型定义 =====

export type MessageRole = 'user' | 'assistant' | 'system';

export interface RoleplayMessage {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: string;
}

export interface RoleplaySession {
  id: string;
  title: string;
  characterId?: string;
  systemPrompt?: string;
  currentSceneNote?: string;
  styleRules?: string;
  messages: RoleplayMessage[];
  settings: RoleplaySettings;
  tags: string[];
  status: 'active' | 'archived' | 'pinned';
  createdAt: string;
  updatedAt: string;
}

export interface CharacterCard {
  id: string;
  name: string;
  avatar?: string;
  description?: string;
  identity?: string;
  personality?: string;
  speakingStyle?: string;
  relationship?: string;
  stage?: string;
  greeting?: string;
  createdAt: string;
  updatedAt: string;
}

export type WorldBookCategory = 'location' | 'faction' | 'person' | 'event' | 'rule' | 'other';

export interface WorldBookEntry {
  id: string;
  title: string;
  category: WorldBookCategory;
  keywords: string[];
  content: string;
  enabled: boolean;
  priority: number;
  createdAt: string;
  updatedAt: string;
}

export type MemoryType = 'summary' | 'event' | 'relationship' | 'user_preference' | 'other';

export interface MemoryEntry {
  id: string;
  type: MemoryType;
  content: string;
  relatedCharacterId?: string;
  relatedSessionId?: string;
  createdAt: string;
  updatedAt: string;
}

export type PromptCategory = 'general' | 'roleplay' | 'character' | 'scene' | 'style' | 'safety';

export interface PromptTemplate {
  id: string;
  title: string;
  category: PromptCategory;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface RoleplaySettings {
  provider: string;
  model: string;
  temperature: number;
  maxTokens: number;
  contextMessageLimit: number;
}

export interface ApiStatus {
  provider: string;
  model: string;
  connected: boolean;
  latency: number;
  lastCheck: string;
}
