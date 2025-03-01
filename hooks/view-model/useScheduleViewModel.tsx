import { InsertScheduleReminders, InsertSchedules } from '@/database.types';
import dayjs from 'dayjs';
import { useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import { AgendaSchedule } from 'react-native-calendars';
import { ScheduleEntity, useScheduleModel } from '../model/useScheduleModel';
import { useExpoNotificationRepository } from '../repository/useExpoNotificationRepository';

export const useSchedulesViewModel = () => {
  const { schedules, upsertSchedule, deleteSchedule, upsertScheduleReminder } =
    useScheduleModel();
  const { scheduleNotification, cancelScheduleNotification } =
    useExpoNotificationRepository();
  const DAY_KEY_FORMAT = 'YYYY-MM-DD';

  const scheduleMap = useMemo(() => {
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

  // TODO: Model行き
  const handleUpsertSchedule = async (
    id: number | undefined,
    userId: string,
    title: string,
    isAllDay: boolean,
    startDate: dayjs.Dayjs,
    endDate: dayjs.Dayjs,
    reminderId: number | undefined,
    reminderIdentifier: string | undefined,
    reminderOffset: number | null,
    color: string,
    description: string,
  ) => {
    if (!reminderOffset) return;

    const data: InsertSchedules = {
      id,
      user_id: userId,
      title,
      start_at: !isAllDay
        ? startDate.toDate().toISOString()
        : startDate.startOf('day').toDate().toISOString(),
      end_at: !isAllDay
        ? endDate.toDate().toISOString()
        : endDate.endOf('day').toDate().toISOString(),
      is_all_day: isAllDay,
      description,
      color,
    };

    try {
      const scheduleRes = await upsertSchedule(data);

      if (reminderIdentifier) {
        await cancelScheduleNotification(reminderIdentifier);
      }

      const identifier = await scheduleNotification(
        scheduleRes.title,
        new Date(
          dayjs(startDate)
            .subtract(reminderOffset, 'minute')
            .toDate()
            .toISOString(),
        ),
        reminderOffset,
      );
      const reminder: InsertScheduleReminders = {
        id: reminderId,
        schedule_id: scheduleRes.id,
        identifier,
        reminder_type: 'push_notification',
        reminder_time: dayjs(startDate)
          .subtract(reminderOffset, 'minute')
          .toDate()
          .toISOString(),
        reminder_offset: reminderOffset,
      };

      upsertScheduleReminder(reminder);
    } catch (error) {
      console.error(error);
      Alert.alert('スケジュールの登録に失敗しました');
    }
  };

  return {
    scheduleMap,
    agendaEntries,
    getTargetSchedule,
    handleUpsertSchedule,
    deleteSchedule,
  };
};
