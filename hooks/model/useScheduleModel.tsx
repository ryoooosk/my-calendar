import { SCHEDULE_SLATE } from '@/constants/ScheduleColors';
import { InsertScheduleReminders, InsertSchedules } from '@/database.types';
import dayjs from 'dayjs';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AgendaSchedule } from 'react-native-calendars';
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

  const DAY_KEY_FORMAT = 'YYYY-MM-DD';

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

  const scheduleMap: Map<string, ScheduleEntity[]> = useMemo(() => {
    const viewModelMap = new Map<string, ScheduleEntity[]>();
    if (!schedules) return viewModelMap;

    schedules.map((schedule: ScheduleEntity) => {
      const diff =
        dayjs(dayjs(schedule.endAt).format('YYYY-MM-DD')).diff(
          dayjs(schedule.startAt).format('YYYY-MM-DD'),
          'day',
        ) + 1;
      const dayKey = dayjs(schedule.startAt).format(DAY_KEY_FORMAT);

      if (diff === 1) {
        const existingSchedules = viewModelMap.get(dayKey) ?? [];
        existingSchedules.push(schedule);
        existingSchedules.sort((a, b) =>
          dayjs(a.startAt).diff(dayjs(b.startAt)),
        );
        viewModelMap.set(dayKey, existingSchedules);
      } else {
        Array(diff)
          .fill(undefined)
          .forEach((_, index) => {
            const targetDayKey = dayjs(schedule.startAt)
              .add(index, 'day')
              .format(DAY_KEY_FORMAT);
            const existingSchedules = viewModelMap.get(targetDayKey) ?? [];
            existingSchedules.push(schedule);
            existingSchedules.sort((a, b) =>
              dayjs(a.startAt).diff(dayjs(b.startAt)),
            );
            viewModelMap.set(targetDayKey, existingSchedules);
          });
      }
    });

    return viewModelMap;
  }, [schedules]);

  const agendaEntries: AgendaSchedule = useMemo(() => {
    const agendaSchedule: AgendaSchedule = {};

    return Array.from(scheduleMap.entries()).reduce(
      (acc, [date, scheduleArray]) => {
        const agendaSchedules = scheduleArray.map((schedule) => ({
          id: schedule.id,
          name: schedule.title,
          height: 70,
          day: `${dayjs(schedule.startAt).format('HH:mm')} - ${dayjs(schedule.endAt).format('HH:mm')}`,
          isAllDay: schedule.isAllDay,
          description: schedule.description,
        }));
        acc[date] = agendaSchedules;
        return acc;
      },
      agendaSchedule,
    );
  }, [scheduleMap]);

  const getTargetSchedule = useCallback(
    (scheduleId: number): ScheduleEntity => {
      const allSchedules = Array.from(scheduleMap.values()).flat();
      const targetSchedule = allSchedules.find(
        (schedule) => schedule.id === scheduleId,
      );
      if (!targetSchedule) throw new Error('Schedule not found');
      return targetSchedule;
    },
    [scheduleMap],
  );

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
    agendaEntries,
    scheduleMap,
    getTargetSchedule,
    deleteSchedule,
    upsertSchedule,
  };
};
