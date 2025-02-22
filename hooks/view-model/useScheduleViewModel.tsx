import { SCHEDULE_SLATE } from '@/constants/ScheduleColors';
import { Schedules } from '@/database.types';
import dayjs from 'dayjs';
import { useCallback, useMemo } from 'react';
import { AgendaSchedule } from 'react-native-calendars';
import { useScheduleModel } from '../model/useScheduleModel';

export type ScheduleViewModel = {
  id: number;
  userId: string;
  title: string;
  description: string | null;
  startAt: string;
  endAt: string;
  isAllDay: boolean;
  color: string;
  isPublic: boolean;
};

export const useSchedulesViewModel = () => {
  const { schedules, deleteSchedule } = useScheduleModel();
  const DAY_KEY_FORMAT = 'YYYY-MM-DD';

  const scheduleMap = useMemo(() => {
    const viewModelMap = new Map<string, ScheduleViewModel[]>();
    if (!schedules) return viewModelMap;

    schedules.map((schedule: Schedules) => {
      const diff = dayjs(schedule.end_at).diff(dayjs(schedule.start_at), 'day');
      const dayKey = dayjs(schedule.start_at).format(DAY_KEY_FORMAT);
      const viewModel: ScheduleViewModel = {
        id: schedule.id,
        userId: schedule.user_id,
        title: schedule.title,
        description: schedule.description,
        startAt: schedule.start_at,
        endAt: schedule.end_at,
        isAllDay: schedule.is_all_day,
        color: schedule.color !== '' ? schedule.color : SCHEDULE_SLATE,
        isPublic: schedule.is_public,
      };

      if (diff === 0) {
        const existingSchedules = viewModelMap.get(dayKey) ?? [];
        existingSchedules.push(viewModel);
        existingSchedules.sort((a, b) =>
          dayjs(a.startAt).diff(dayjs(b.startAt)),
        );
        viewModelMap.set(dayKey, existingSchedules);
      } else {
        Array(diff)
          .fill(undefined)
          .forEach((_, index) => {
            const targetDayKey = dayjs(schedule.start_at)
              .add(index, 'day')
              .format(DAY_KEY_FORMAT);
            const existingSchedules = viewModelMap.get(targetDayKey) ?? [];
            existingSchedules.push(viewModel);
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
    (scheduleId: number): ScheduleViewModel => {
      const allSchedules = Array.from(scheduleMap.values()).flat();
      const targetSchedule = allSchedules.find(
        (schedule) => schedule.id === scheduleId,
      );
      if (!targetSchedule) throw new Error('Schedule not found');
      return targetSchedule;
    },
    [scheduleMap],
  );

  return { scheduleMap, agendaEntries, getTargetSchedule, deleteSchedule };
};
