import { FormEvent, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { EmptyState } from '../../components/ui/EmptyState';
import { supabaseConfigMessage } from '../../lib/supabase';
import { useStudioAuth } from '../StudioAuth';

export function StudioLoginPage() {
  const { configured, loading, signIn, user } = useStudioAuth();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const redirectTo = (location.state as { from?: string } | null)?.from ?? '/studio';

  if (user) {
    return <Navigate to="/studio" replace />;
  }

  if (!configured) {
    return (
      <section className="studio-login">
        <EmptyState
          title="Supabase 未配置"
          description={`${supabaseConfigMessage} 前台页面会继续使用本地 TypeScript 数据。`}
          actionLabel="返回前台"
          actionTo="/"
        />
      </section>
    );
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setMessage('');
    try {
      await signIn(email, password);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '登录失败，请检查邮箱和密码。');
    }
  };

  if (!loading && user) {
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <section className="studio-login">
      <form className="glass-card studio-form compact" onSubmit={handleSubmit}>
        <span className="eyebrow">Studio Login</span>
        <h1>站主登录</h1>
        <label>
          邮箱
          <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required />
        </label>
        <label>
          密码
          <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required />
        </label>
        {message ? <p className="form-message">{message}</p> : null}
        <button className="primary-button" type="submit">
          登录
        </button>
      </form>
    </section>
  );
}
