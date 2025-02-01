import { Users } from '@/database.types';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<Users | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { data: user } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();
      if (!user) return;
      setUser(user);
    };

    fetchUser();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [session]);

  return { user };
};
