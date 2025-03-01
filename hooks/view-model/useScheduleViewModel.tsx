import dayjs from 'dayjs';
import { useCallback, useMemo } from 'react';
import { AgendaSchedule } from 'react-native-calendars';
import { ScheduleEntity, useScheduleModel } from '../model/useScheduleModel';

export const useSchedulesViewModel = () => {
  const { schedules } = useScheduleModel();
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

  return {
    scheduleMap,
    agendaEntries,
    getTargetSchedule,
  };
};
