import {
  InsertScheduleReminders,
  InsertSchedules,
  ScheduleReminders,
  Schedules,
} from '@/database.types';
import { supabase } from '@/lib/supabase';
import { useCallback } from 'react';

export type ScheduleRepository = Schedules & {
  schedule_reminders:
    | {
        id: ScheduleReminders['id'];
        identifier: ScheduleReminders['identifier'];
        reminder_offset: ScheduleReminders['reminder_offset'];
      }[]
    | null;
};

export const useScheduleRepository = () => {
  const fetchSchedules = useCallback(
    async (userId: string): Promise<ScheduleRepository[]> => {
      const { data, error } = await supabase
        .from('schedules')
        .select('*,schedule_reminders (id,identifier,reminder_offset)')
        .eq('user_id', userId);

      if (error) throw error;
      return data;
    },
    [],
  );

  const upsertSchedule = useCallback(
    async (body: InsertSchedules): Promise<Schedules> => {
      const { data, error } = await supabase
        .from('schedules')
        .upsert(body)
        .select()
        .single();
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

  const upsertScheduleReminder = useCallback(
    async (body: InsertScheduleReminders): Promise<ScheduleReminders> => {
      const { data, error } = await supabase
        .from('schedule_reminders')
        .upsert(body)
        .select()
        .single();
      if (error) throw error;

      return data;
    },
    [],
  );

  const deleteScheduleReminder = useCallback(
    async (scheduleReminderId: number): Promise<void> => {
      const { error } = await supabase
        .from('schedule_reminders')
        .delete()
        .eq('id', scheduleReminderId);
      if (error) throw error;
    },
    [],
  );

  return {
    fetchSchedules,
    upsertSchedule,
    deleteSchedule,
    upsertScheduleReminder,
    deleteScheduleReminder,
  };
};
