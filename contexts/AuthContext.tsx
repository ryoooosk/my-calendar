import { Users } from '@/database.types';
import { useUserRepository } from '@/hooks/repository/useUserRepository';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { ReactNode, createContext, useEffect, useState } from 'react';

export const AuthContext = createContext<{
  session: Session | null;
  user: Users | null;
  isLoading: boolean;
  setUser: (user: Users) => void;
}>({
  session: null,
  user: null,
  isLoading: false,
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Users | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setLoading] = useState(true);
  const { fetchUser } = useUserRepository();

  // TODO: useEffectの依存配列の見直し
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setLoading(true);
        setSession(session);

        if (!session) setUser(null);
        else {
          const user = await fetchUser(session.user.id);
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
    <AuthContext.Provider value={{ session, user, isLoading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
