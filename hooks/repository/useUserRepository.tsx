import { Users } from '@/database.types';
import { supabase } from '@/lib/supabase';
import { PostgrestError } from '@supabase/supabase-js';
import { useCallback } from 'react';

export const useUserRepository = () => {
  const fetchUser = useCallback(async (userId: string): Promise<Users> => {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return user;
  }, []);

  const updateUser = useCallback(
    async (user: Users): Promise<PostgrestError | null> => {
      const { error } = await supabase
        .from('users')
        .update(user)
        .eq('id', user.id);
      if (error) throw error;

      return error;
    },
    [],
  );

  return { fetchUser, updateUser };
};
