import { SCHEDULE_SLATE } from '@/constants/ScheduleColors';
import { InsertScheduleReminders, InsertSchedules } from '@/database.types';
import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useExpoNotificationRepository } from '../repository/useExpoNotificationRepository';
import {
  ScheduleRepository,
  useScheduleRepository,
} from '../repository/useScheduleRepository';

export type ScheduleEntity = {
  id?: number;
  userId: string;
  title: string;
  description: string | null;
  startAt: string;
  endAt: string;
  isAllDay: boolean;
  color: string;
  isPublic: boolean;
  reminderId?: number;
  reminderIdentifier?: string;
  reminderOffset?: number | null;
};

export const useScheduleModel = () => {
  const { user } = useContext(AuthContext);
  const {
    fetchSchedules,
    upsertSchedule: upsertScheduleRepository,
    deleteSchedule,
    upsertScheduleReminder,
  } = useScheduleRepository();
  const { scheduleNotification, cancelScheduleNotification } =
    useExpoNotificationRepository();
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
  }, [user]);

  const upsertSchedule = async (entity: ScheduleEntity) => {
    if (!user || !entity.reminderOffset) return;

    const data: InsertSchedules = {
      id: entity.id,
      user_id: user.id,
      title: entity.title,
      start_at: entity.startAt,
      end_at: entity.endAt,
      is_all_day: entity.isAllDay,
      description: entity.description,
      color: entity.color,
    };
    const scheduleRes = await upsertScheduleRepository(data);

    if (entity.reminderIdentifier) {
      await cancelScheduleNotification(entity.reminderIdentifier);
    }
    const identifier = await scheduleNotification(
      scheduleRes.title,
      new Date(
        dayjs(entity.startAt)
          .subtract(entity.reminderOffset, 'minute')
          .toDate()
          .toISOString(),
      ),
      entity.reminderOffset,
    );

    const reminder: InsertScheduleReminders = {
      id: entity.reminderId,
      schedule_id: scheduleRes.id,
      identifier,
      reminder_type: 'push_notification',
      reminder_time: dayjs(entity.startAt)
        .subtract(entity.reminderOffset, 'minute')
        .toDate()
        .toISOString(),
      reminder_offset: entity.reminderOffset,
    };
    upsertScheduleReminder(reminder);
  };

  return {
    schedules,
    deleteSchedule,
    upsertSchedule,
  };
};
