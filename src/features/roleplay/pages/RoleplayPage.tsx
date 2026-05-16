import { useMemo, useState } from 'react';
import { DesktopLayout } from '../components/layout/DesktopLayout';
import { MobileLayout } from '../components/layout/MobileLayout';
import {
  mockApiStatus,
  mockCharacters,
  mockMemories,
  mockMessages,
  mockPrompts,
  mockSessions,
  mockSettings,
  mockWorldBooks,
} from '../mock';
import '../styles/roleplay.css';

export function RoleplayPage() {
  const [activeCharacterId, setActiveCharacterId] = useState(mockCharacters[0]?.id);
  const [activeSessionId, setActiveSessionId] = useState(mockSessions[0]?.id);

  const activeCharacter = useMemo(
    () => mockCharacters.find((c) => c.id === activeCharacterId),
    [activeCharacterId],
  );

  const activeSession = useMemo(
    () => mockSessions.find((s) => s.id === activeSessionId),
    [activeSessionId],
  );

  const sharedProps = {
    characters: mockCharacters,
    sessions: mockSessions,
    messages: mockMessages,
    worldBooks: mockWorldBooks,
    memories: mockMemories,
    prompts: mockPrompts,
    settings: mockSettings,
    apiStatus: mockApiStatus,
    activeCharacterId,
    activeSessionId,
    activeCharacter,
    activeSession,
    onSelectCharacter: setActiveCharacterId,
    onSelectSession: setActiveSessionId,
  };

  return (
    <div id="roleplay-root">
      <DesktopLayout {...sharedProps} />
      <MobileLayout
        characters={mockCharacters}
        sessions={mockSessions}
        messages={mockMessages}
        worldBooks={mockWorldBooks}
        memories={mockMemories}
        activeCharacter={activeCharacter}
        activeSession={activeSession}
      />
    </div>
  );
}
