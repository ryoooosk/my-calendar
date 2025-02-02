import { Users } from '@/database.types';
import { supabase } from '@/lib/supabase';
import { ReactNode, createContext, useEffect, useState } from 'react';

export const AuthContext = createContext<Users | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Users | null>(null);
  const fetchUser = async (userId: string) => {
    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    setUser(user);
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) return setUser(null);
        fetchUser(session.user.id);
      },
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
