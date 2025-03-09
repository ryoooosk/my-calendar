import { SCHEDULE_SLATE } from '@/constants/ScheduleColors';
import { useCallback, useEffect, useState } from 'react';
import {
  ScheduleRepository,
  useScheduleRepository,
} from '../repository/useScheduleRepository';
import { ScheduleEntity } from './useScheduleActions';

export function useScheduleState(userId: string | undefined) {
  const [schedules, setSchedules] = useState<ScheduleEntity[] | null>(null);

  const { fetchSchedules } = useScheduleRepository();

  useEffect(() => {
    if (!userId) return;

    fetchSchedules(userId).then((schedules) => {
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
            reminderId: schedule.schedule_reminders?.map((r) => r.id)[0],
            reminderIdentifier: schedule.schedule_reminders?.map(
              (r) => r.identifier,
            )[0],
            reminderOffset:
              schedule.schedule_reminders?.map((r) => r.reminder_offset)[0] ??
              null,
          };

          return entity;
        },
      );

      setSchedules(entities);
    });
  }, [userId, fetchSchedules]);

  const getTargetSchedule = useCallback(
    (scheduleId: number): ScheduleEntity => {
      const targetSchedule = schedules?.find(
        (schedule) => schedule.id === scheduleId,
      );
      if (!targetSchedule) throw new Error('Schedule not found');
      return targetSchedule;
    },
    [schedules],
  );

  return {
    schedules,
    setSchedules,
    getTargetSchedule,
  };
}
