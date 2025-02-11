import { DateContext } from '@/hooks/selectedDate';
import {
  ScheduleViewModel,
  useSchedulesViewModel,
} from '@/hooks/useScheduleViewModel';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import { useContext, useMemo } from 'react';
import { AgendaSchedule } from 'react-native-calendars';
import SchedulesPresenter from './presenter';

dayjs.locale('ja');

export default function SchedulesContainer() {
  const schedules: Map<string, ScheduleViewModel[]> = useSchedulesViewModel();
  const { date: selectedDate } = useContext(DateContext);
  const agendaEntries: AgendaSchedule = useMemo(() => {
    const agendaSchedule: AgendaSchedule = {};

    return Array.from(schedules.entries()).reduce(
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
  }, [schedules]);

  return (
    <SchedulesPresenter
      agendaEntries={agendaEntries}
      selectedDate={selectedDate}
    />
  );
}
