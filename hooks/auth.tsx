import { Users } from '@/database.types';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { ReactNode, createContext, useEffect, useState } from 'react';

export const AuthContext = createContext<{
  session: Session | null;
  user: Users | null;
  isLoading: boolean;
}>({ session: null, user: null, isLoading: false });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Users | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setLoading] = useState(true);

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
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);

        if (!session) setUser(null);
        else fetchUser(session.user.id);

        setLoading(false);
      },
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
