import { SCHEDULE_SLATE } from '@/constants/ScheduleColors';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import {
  ScheduleRepository,
  useScheduleRepository,
} from '../repository/useScheduleRepository';

export type ScheduleEntity = {
  id: number;
  userId: string;
  title: string;
  description: string | null;
  startAt: string;
  endAt: string;
  isAllDay: boolean;
  color: string;
  isPublic: boolean;
  reminderIds?: number[];
  reminderIdentifier?: string[];
  reminderOffset?: number[] | null;
};

export const useScheduleModel = () => {
  const { user } = useContext(AuthContext);
  const {
    fetchSchedules,
    upsertSchedule,
    deleteSchedule,
    upsertScheduleReminder,
  } = useScheduleRepository();
  const [schedules, setSchedules] = useState<ScheduleEntity[] | null>(null);

  useEffect(() => {
    if (!user) return;

    fetchSchedules(user.id).then((schedules) => {
      const entities: ScheduleEntity[] = schedules.map(
        (schedule: ScheduleRepository) => {
          const entity: ScheduleEntity = {
            id: schedule.id,
            userId: schedule.user_id,
            title: schedule.title,
            description: schedule.description,
            startAt: schedule.start_at,
            endAt: schedule.end_at,
            isAllDay: schedule.is_all_day,
            color: schedule.color !== '' ? schedule.color : SCHEDULE_SLATE,
            isPublic: schedule.is_public,
            reminderIds: schedule.schedule_reminders?.map((r) => r.id),
            reminderIdentifier: schedule.schedule_reminders?.map(
              (r) => r.identifier,
            ),
            reminderOffset:
              schedule.schedule_reminders?.map((r) => r.reminder_offset) ??
              null,
          };

          return entity;
        },
      );

      setSchedules(entities);
    });
  }, [user]);

  return {
    schedules,
    upsertSchedule,
    deleteSchedule,
    upsertScheduleReminder,
  };
};
