import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

function renderApp(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe('NexFolio app', () => {
  it('renders home hero and primary entries with local fallback data', async () => {
    renderApp('/');

    expect(screen.getByRole('heading', { name: '个人数字平台' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '探索我的项目' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '阅读我的博客' })).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText(/正在读取项目内容/)).not.toBeInTheDocument();
    });
  });

  it('filters blog posts by search keyword', async () => {
    const user = userEvent.setup();
    renderApp('/blog');

    await user.type(screen.getByLabelText('搜索文章'), '第一天');

    expect(screen.getByText('从第一天开始建立测试体系')).toBeInTheDocument();
    expect(screen.queryByText('从工具集合到个人数字平台')).not.toBeInTheDocument();
  });

  it('renders richer project detail route from fallback data', async () => {
    renderApp('/projects/nexfolio');

    expect(await screen.findByRole('heading', { name: 'NexFolio 个人数字平台' })).toBeInTheDocument();
    expect(screen.getByText('项目背景')).toBeInTheDocument();
    expect(screen.getByText('为什么做')).toBeInTheDocument();
    expect(screen.getByText('解决什么问题')).toBeInTheDocument();
    expect(screen.getByText('访问链接状态')).toBeInTheDocument();
  });

  it('shows Supabase configuration guidance on studio login when env is missing', () => {
    renderApp('/studio/login');

    expect(screen.getByRole('heading', { name: 'Supabase 未配置' })).toBeInTheDocument();
    expect(screen.getByText(/VITE_SUPABASE_URL/)).toBeInTheDocument();
  });

  it('redirects protected studio routes to login while Supabase is not configured', async () => {
    renderApp('/studio');

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Supabase 未配置' })).toBeInTheDocument();
    });
  });

  it('renders graceful 404 for unknown routes', () => {
    renderApp('/unknown');

    expect(screen.getByRole('heading', { name: '页面没有找到' })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: '返回首页' }).length).toBeGreaterThan(0);
  });
});
