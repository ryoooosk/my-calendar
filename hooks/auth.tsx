import { Users } from '@/database.types';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';
import { ReactNode, createContext, useEffect, useState } from 'react';

export const AuthContext = createContext<Users | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [user, setUser] = useState<Users | null>(null);
  const fetchUser = async (userId: string) => {
    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    setUser(user);
  };

  // TODO: useEffectの依存配列の見直し
  useEffect(() => {
    // TODO: routerの遷移は_layoutでできないか？
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          setUser(null);
          return router.replace('/login');
        }

        fetchUser(session.user.id);
        if (user) router.replace('/');
      },
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
