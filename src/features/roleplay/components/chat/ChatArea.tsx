import type { RoleplayMessage } from '../../types';
import { MessageBubble } from './MessageBubble';

export function ChatArea({ messages }: { messages: RoleplayMessage[] }) {
  return (
    <div className="tavern-messages">
      {messages.map((msg) => (
        <MessageBubble message={msg} key={msg.id} />
      ))}
    </div>
  );
}
