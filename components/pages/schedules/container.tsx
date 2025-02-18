import { DateContext } from '@/hooks/selectedDate';
import {
  ScheduleViewModel,
  useSchedulesViewModel,
} from '@/hooks/useScheduleViewModel';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import { ScheduleContext } from '@/context/ScheduleContext';
import { router } from 'expo-router';
import { useCallback, useContext, useMemo } from 'react';
import { AgendaSchedule } from 'react-native-calendars';
import SchedulesPresenter from './presenter';

dayjs.locale('ja');

export default function SchedulesContainer() {
  const scheduleMap: Map<string, ScheduleViewModel[]> = useSchedulesViewModel();
  const { date: selectedDate } = useContext(DateContext);
  const { setSelectedSchedule } = useContext(ScheduleContext);

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

  const handleSelectSchedule = useCallback(
    (scheduleId: number) => {
      // TODO:  重複を含むのでもっと効率の良い取得にする
      const allSchedules = Array.from(scheduleMap.values()).flat();
      const targetSchedule = allSchedules.find(
        (schedule) => schedule.id === scheduleId,
      );
      if (!targetSchedule) throw new Error('Schedule not found');
      setSelectedSchedule(targetSchedule);

      router.push('/update-schedule');
    },
    [scheduleMap],
  );

  return (
    <SchedulesPresenter
      agendaEntries={agendaEntries}
      selectedDate={selectedDate}
      handleSelectSchedule={handleSelectSchedule}
    />
  );
}
