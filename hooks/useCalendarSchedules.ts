import { Schedules } from '@/database.types';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useFetchSchedules } from './useFetchSchedules';

export type ScheduleViewModel = {
  id: number;
  userId: string;
  title: string;
  description: string | null;
  startAt: string;
  endAt: string;
  isAllDay: boolean;
  isPublic: boolean;
};

export const useCalendarSchedules = () => {
  const schedules = useFetchSchedules();
  const DAY_KEY_FORMAT = 'YYYY-MM-DD';

  const viewModel = useMemo(() => {
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

  return viewModel;
};
