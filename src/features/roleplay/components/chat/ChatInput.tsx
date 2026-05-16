export function ChatInput() {
  return (
    <div className="tavern-input-area">
      <div className="tavern-input-tools">
        <button title="附件" aria-label="附件">
          +
        </button>
        <button title="表情" aria-label="表情">
          :)
        </button>
        <button title="指令" aria-label="指令">
          /
        </button>
        <button title="世界书" aria-label="世界书">
          B
        </button>
      </div>
      <div className="tavern-input-row">
        <textarea placeholder="输入消息……" rows={1} />
        <select
          style={{
            minHeight: 36,
            borderRadius: 10,
            border: '1px solid var(--rp-line)',
            padding: '0 8px',
            fontSize: '0.75rem',
            color: 'var(--rp-muted)',
            background: 'var(--rp-bg)',
          }}
        >
          <option>deepseek-chat</option>
        </select>
        <button className="btn-send" title="发送" aria-label="发送消息">
          &gt;
        </button>
      </div>
    </div>
  );
}
