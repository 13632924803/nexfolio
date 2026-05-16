import type { RoleplayMessage } from '../../types';

export function MessageBubble({ message }: { message: RoleplayMessage }) {
  return (
    <div>
      <div className={`tavern-message-bubble ${message.role}`}>{message.content}</div>
      <div className={`tavern-message-time ${message.role === 'user' ? 'user' : ''}`}>
        {new Date(message.createdAt).toLocaleTimeString('zh-CN', {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </div>
    </div>
  );
}
