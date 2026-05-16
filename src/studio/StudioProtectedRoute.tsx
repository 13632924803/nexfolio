import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { EmptyState } from '../components/ui/EmptyState';
import { useStudioAuth } from './StudioAuth';

export function StudioProtectedRoute() {
  const location = useLocation();
  const { configured, loading, user } = useStudioAuth();

  if (!configured) {
    return <Navigate to="/studio/login" state={{ from: location.pathname }} replace />;
  }

  if (loading) {
    return (
      <section className="studio-page">
        <EmptyState title="正在检查登录状态" description="Studio 正在读取当前会话。" />
      </section>
    );
  }

  if (!user) {
    return <Navigate to="/studio/login" state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
}
