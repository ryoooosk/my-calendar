import { Schedules } from '@/database.types';
import { supabase } from '@/lib/supabase';
import { useCallback } from 'react';

export const useScheduleRepository = () => {
  const fetchSchedules = useCallback(
    async (userId: string): Promise<Schedules[]> => {
      const { data, error } = await supabase
        .from('schedules')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data;
    },
    [],
  );

  const deleteSchedule = useCallback(
    async (scheduleId: number): Promise<void> => {
      const { error } = await supabase
        .from('schedules')
        .delete()
        .eq('id', scheduleId);
      if (error) throw error;
    },
    [],
  );

  return { fetchSchedules, deleteSchedule };
};
