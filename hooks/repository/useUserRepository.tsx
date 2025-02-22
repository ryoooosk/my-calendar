import { Users } from '@/database.types';
import { supabase } from '@/lib/supabase';

export const useUserRepository = () => {
  const fetchUser = async (userId: string): Promise<Users> => {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return user;
  };

  const updateUser = async (user: Users): Promise<void> => {
    const { error } = await supabase
      .from('users')
      .update(user)
      .eq('id', user.id);
    if (error) throw error;
  };

  return { fetchUser, updateUser };
};
