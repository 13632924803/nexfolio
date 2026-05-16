import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

interface StudioAuthContextValue {
  configured: boolean;
  loading: boolean;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const StudioAuthContext = createContext<StudioAuthContextValue | null>(null);

export function StudioAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return undefined;
    }

    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active) {
        setUser(data.session?.user ?? null);
        setLoading(false);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<StudioAuthContextValue>(
    () => ({
      configured: isSupabaseConfigured,
      loading,
      user,
      async signIn(email, password) {
        if (!supabase) {
          throw new Error('Supabase 未配置');
        }
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          throw error;
        }
      },
      async signOut() {
        if (supabase) {
          await supabase.auth.signOut();
        }
      },
    }),
    [loading, user],
  );

  return <StudioAuthContext.Provider value={value}>{children}</StudioAuthContext.Provider>;
}

// Studio routes need this hook next to the provider to keep auth state compact.
// eslint-disable-next-line react-refresh/only-export-components
export function useStudioAuth() {
  const value = useContext(StudioAuthContext);
  if (!value) {
    throw new Error('useStudioAuth must be used inside StudioAuthProvider');
  }
  return value;
}
