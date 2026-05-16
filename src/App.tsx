import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { RoleplayPage } from './features/roleplay/pages/RoleplayPage';
import { AboutPage } from './pages/AboutPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { BlogPage } from './pages/BlogPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ToolsPage } from './pages/ToolsPage';
import { StudioAuthProvider } from './studio/StudioAuth';
import { StudioLayout } from './studio/StudioLayout';
import { StudioProtectedRoute } from './studio/StudioProtectedRoute';
import { StudioDashboardPage } from './studio/pages/StudioDashboardPage';
import { StudioEditorPage } from './studio/pages/StudioEditorPage';
import { StudioListPage } from './studio/pages/StudioListPage';
import { StudioLoginPage } from './studio/pages/StudioLoginPage';

export default function App() {
  const location = useLocation();

  if (location.pathname.startsWith('/roleplay')) {
    return <RoleplayPage />;
  }

  if (location.pathname.startsWith('/studio')) {
    return (
      <StudioAuthProvider>
        <Routes>
          <Route path="/studio/login" element={<StudioLoginPage />} />
          <Route element={<StudioProtectedRoute />}>
            <Route path="/studio" element={<StudioLayout />}>
              <Route index element={<StudioDashboardPage />} />
              <Route path=":kind" element={<StudioListPage />} />
              <Route path=":kind/new" element={<StudioEditorPage />} />
              <Route path=":kind/:id/edit" element={<StudioEditorPage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </StudioAuthProvider>
    );
  }

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}
