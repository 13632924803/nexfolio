import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useStudioAuth } from './StudioAuth';

const studioNav = [
  { to: '/studio', label: '概览' },
  { to: '/studio/posts', label: '博客' },
  { to: '/studio/projects', label: '项目' },
  { to: '/studio/tools', label: '工具' },
];

export function StudioLayout() {
  const navigate = useNavigate();
  const { signOut, user } = useStudioAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/studio/login', { replace: true });
  };

  return (
    <div className="studio-shell">
      <aside className="studio-sidebar glass-card">
        <div>
          <span className="eyebrow">Studio</span>
          <h1>NexFolio</h1>
          <p>{user?.email}</p>
        </div>
        <nav className="studio-nav" aria-label="Studio 导航">
          {studioNav.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/studio'}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="studio-actions">
          <NavLink className="secondary-button" to="/">
            返回前台
          </NavLink>
          <button className="secondary-button" type="button" onClick={handleSignOut}>
            登出
          </button>
        </div>
      </aside>
      <main className="studio-main">
        <Outlet />
      </main>
    </div>
  );
}
