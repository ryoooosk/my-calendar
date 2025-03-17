import { Users } from '@/database.types';
import { useUserModel } from '@/hooks/model/useUserModel';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { ReactNode, createContext, useEffect, useState } from 'react';

export const AuthContext = createContext<{
  session: Session | null;
  user: Users | null;
  isLoading: boolean;
  updateUser: (
    newImageUri: string | null,
    displayName: string,
    userName: string | null,
    biography: string | null,
    currentImageUri: string | null,
  ) => Promise<void>;
}>({
  session: null,
  user: null,
  isLoading: false,
  updateUser: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setLoading] = useState(true);
  const { user, updateUser } = useUserModel(session?.user.id);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) setLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setLoading(false);
      },
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, user, isLoading, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
