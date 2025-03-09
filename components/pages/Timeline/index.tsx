import { ScheduleContext } from '@/contexts/ScheduleContext';
import { ScheduleEntity } from '@/hooks/model/useScheduleModel';
import dayjs from 'dayjs';
import { useContext, useMemo } from 'react';
import { Event } from 'react-native-calendars/src/timeline/EventBlock';
import TimelinePresenter from './presenter';

export default function TimelineContainer({ date }: { date: string }) {
  const { getSchedulesForDay } = useContext(ScheduleContext);
  const schedules = useMemo(
    () => getSchedulesForDay(date),
    [date, getSchedulesForDay],
  );

  const timeEvents: Event[] = schedules
    .filter((schedule) => !schedule.isAllDay)
    .map((schedule) => {
      const isMultiDay = dayjs(schedule.startAt).isBefore(dayjs(date));

      return {
        id: schedule.id?.toString(),
        start: isMultiDay ? dayjs(date).toISOString() : schedule.startAt,
        end: schedule.endAt,
        isMultiDay,
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
