interface NavItem {
  key: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { key: 'tavern', label: '酒馆', icon: 'T' },
  { key: 'explore', label: '探索', icon: 'E' },
  { key: 'create', label: '新建', icon: '+' },
  { key: 'messages', label: '消息', icon: 'M' },
  { key: 'me', label: '我的', icon: 'W' },
];

interface Props {
  active: string;
  onNavigate: (key: string) => void;
}

export function MobileBottomNav({ active, onNavigate }: Props) {
  return (
    <div className="tavern-mobile-nav">
      {navItems.map((item) => (
        <button
          key={item.key}
          className={active === item.key ? 'active' : ''}
          onClick={() => onNavigate(item.key)}
        >
          <span className="nav-icon">{item.icon}</span>
          {item.label}
        </button>
      ))}
    </div>
  );
}
