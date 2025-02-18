import { Schedules } from '@/database.types';
import { supabase } from '@/lib/supabase';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './auth';

export const useSchedules = (): Schedules[] | null => {
  const { user } = useContext(AuthContext);
  const [schedules, setSchedules] = useState<Schedules[] | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchSchedules = async (userId: string) => {
      const { data: schedules } = await supabase
        .from('schedules')
        .select('*')
        .eq('user_id', userId);

      return schedules;
    };

    fetchSchedules(user.id).then((schedules) => {
      setSchedules(schedules);
    });
  }, [user]);

  return schedules;
};
