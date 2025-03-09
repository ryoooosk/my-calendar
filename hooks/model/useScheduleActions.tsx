import {
  InsertScheduleReminders,
  InsertSchedules,
  ScheduleReminders,
} from '@/database.types';
import dayjs from 'dayjs';
import { useCallback } from 'react';
import { useExpoNotificationRepository } from '../repository/useExpoNotificationRepository';
import { useScheduleRepository } from '../repository/useScheduleRepository';

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

export function useScheduleActions(
  userId: string | undefined,
  setSchedules: React.Dispatch<React.SetStateAction<ScheduleEntity[] | null>>,
) {
  const {
    upsertSchedule: upsertScheduleRepository,
    deleteSchedule: deleteScheduleRepository,
    upsertScheduleReminder,
  } = useScheduleRepository();
  const { scheduleNotification, cancelScheduleNotification } =
    useExpoNotificationRepository();

  const upsertSchedule = useCallback(
    async (entity: ScheduleEntity): Promise<void> => {
      if (!userId) throw new Error('User not found');

      const data: InsertSchedules = {
        id: entity.id,
        user_id: userId,
        title: entity.title,
        start_at: entity.startAt,
        end_at: entity.endAt,
        is_all_day: entity.isAllDay,
        description: entity.description,
        color: entity.color,
      };
      const scheduleRes = await upsertScheduleRepository(data);
      const newEntity: ScheduleEntity = { ...entity, id: scheduleRes.id };
      const finalEntity = newEntity.reminderOffset
        ? await upsertScheduleReminderAndNotification(
            newEntity,
            cancelScheduleNotification,
            scheduleNotification,
            upsertScheduleReminder,
          )
        : newEntity;

      setSchedules((prev) => {
        if (!prev) return [finalEntity];

        const filtered = prev?.filter((s) => s.id !== entity.id);
        return [...filtered, finalEntity];
      });
    },
    [
      userId,
      cancelScheduleNotification,
      scheduleNotification,
      upsertScheduleReminder,
      upsertScheduleRepository,
      setSchedules,
    ],
  );

  const deleteSchedule = useCallback(
    async (scheduleId: number, reminderIdentifier?: string): Promise<void> => {
      if (reminderIdentifier)
        await cancelScheduleNotification(reminderIdentifier);
      await deleteScheduleRepository(scheduleId);

      setSchedules((prev) => prev?.filter((s) => s.id !== scheduleId) ?? []);
    },
    [cancelScheduleNotification, deleteScheduleRepository, setSchedules],
  );

  return {
    upsertSchedule,
    deleteSchedule,
  };
}

async function upsertScheduleReminderAndNotification(
  entity: ScheduleEntity,
  cancelScheduleNotification: (identifier: string) => Promise<void>,
  scheduleNotification: (
    title: string,
    date: Date,
    offset?: number,
  ) => Promise<string>,
  upsertScheduleReminder: (
    body: InsertScheduleReminders,
  ) => Promise<ScheduleReminders>,
): Promise<ScheduleEntity> {
  if (!entity.id) throw new Error('Schedule not found');
  if (!entity.reminderOffset) throw new Error('Reminder offset not found');

  if (entity.reminderIdentifier)
    await cancelScheduleNotification(entity.reminderIdentifier);
  const identifier = await scheduleNotification(
    entity.title,
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
    schedule_id: entity.id,
    identifier,
    reminder_type: 'push_notification',
    reminder_time: dayjs(entity.startAt)
      .subtract(entity.reminderOffset, 'minute')
      .toDate()
      .toISOString(),
    reminder_offset: entity.reminderOffset,
  };
  await upsertScheduleReminder(reminder);

  const result = {
    ...entity,
    id: entity.id,
    reminderId: reminder.id,
    reminderIdentifier: identifier,
  };

  return result;
}
