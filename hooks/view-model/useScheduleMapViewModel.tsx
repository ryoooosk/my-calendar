import dayjs from 'dayjs';
import { useCallback, useMemo } from 'react';
import { ScheduleEntity, useScheduleModel } from '../model/useScheduleModel';

export function useScheduleMapViewModel() {
  const { schedules } = useScheduleModel();
  const DAY_KEY_FORMAT = 'YYYY-MM-DD';

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

  const getSchedulesForDay = useCallback(
    (date: string) => {
      const targetDaySchedules = scheduleMap.get(date);
      if (!targetDaySchedules) return [];
      return targetDaySchedules;
    },
    [scheduleMap],
  );

  return {
    scheduleMap,
    getSchedulesForDay,
  };
}
