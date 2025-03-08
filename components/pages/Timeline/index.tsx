import { ScheduleContext } from '@/contexts/ScheduleContext';
import { ScheduleEntity } from '@/hooks/model/useScheduleModel';
import { useContext, useMemo } from 'react';
import { Event } from 'react-native-calendars/src/timeline/EventBlock';
import TimelinePresenter from './presenter';

export default function TimelineContainer({ date }: { date: string }) {
  const { getTargetDaySchedules } = useContext(ScheduleContext);
  const schedules = useMemo(
    () => getTargetDaySchedules(date),
    [date, getTargetDaySchedules],
  );

  const timeEvents: Event[] = schedules
    .filter((schedule) => !schedule.isAllDay)
    .map((schedule) => {
      return {
        id: schedule.id?.toString(),
        start: schedule.startAt,
        end: schedule.endAt,
        title: schedule.title,
        summary: schedule.description ?? undefined,
        color: schedule.color,
      };
    });
  const dayEvents: ScheduleEntity[] = schedules.filter(
    (schedule) => schedule.isAllDay,
  );

  return (
    <TimelinePresenter
      date={date}
      dayEvents={dayEvents}
      timeEvents={timeEvents}
    />
  );
}
