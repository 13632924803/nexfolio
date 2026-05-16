import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { site } from '../../data/site';

const navItems = [
  { to: '/', label: '首页' },
  { to: '/projects', label: '项目' },
  { to: '/blog', label: '博客' },
  { to: '/tools', label: '工具' },
  { to: '/roleplay', label: '酒馆' },
  { to: '/about', label: '关于' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="site-shell">
      <header className="topbar">
        <NavLink to="/" className="brand" aria-label="返回首页">
          <span className="brand-mark">N</span>
          <span>
            <strong>{site.shortName}</strong>
            <small>{site.name}</small>
          </span>
        </NavLink>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
          <strong>菜单</strong>
        </button>
        <nav
          className={`nav-links ${menuOpen ? 'is-open' : ''}`}
          id="primary-navigation"
          aria-label="主导航"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <div>
          <strong>{site.shortName}</strong>
          <p>{site.description}</p>
          <span className="footer-version">{site.version} · Studio 入口已预留，后台需配置 Supabase 后使用</span>
        </div>
        <div className="footer-links" aria-label="站点链接">
          <a href={site.contact.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <span>{site.contact.emailLabel}</span>
        </div>
      </footer>
    </div>
  );
}
