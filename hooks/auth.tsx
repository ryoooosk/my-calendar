import { Users } from '@/database.types';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { ReactNode, createContext, useEffect, useState } from 'react';

export const AuthContext = createContext<{
  session: Session | null;
  user: Users | null;
  isLoading: boolean;
  handleSetUser: (user: Users) => void;
}>({
  session: null,
  user: null,
  isLoading: false,
  handleSetUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Users | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setLoading] = useState(true);

  const fetchUser = async (userId: string) => {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) console.warn('Error fetching user:', error.message);
    return user;
  };

  // CDNによるavatar_urlのキャッシュ対策
  const handleSetUser = (user: Users) => {
    user.avatar_url = `${user.avatar_url}?v=${new Date().getTime()}`;
    setUser(user);
  };

  // TODO: useEffectの依存配列の見直し
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setLoading(true);
        setSession(session);

        if (!session) setUser(null);
        else {
          const user = await fetchUser(session.user.id);
          if (user?.avatar_url)
            user.avatar_url = `${user.avatar_url}?v=${new Date().getTime()}`;
          setUser(user);
        }

        setLoading(false);
      },
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, user, isLoading, handleSetUser }}>
      {children}
    </AuthContext.Provider>
  );
};
