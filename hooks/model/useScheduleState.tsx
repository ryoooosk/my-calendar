import { AuthContext } from '@/contexts/AuthContext';
import { Users } from '@/database.types';
import dayjs from 'dayjs';
import { PermissionStatus } from 'expo-calendar';
import { useContext, useEffect, useState } from 'react';
import { useCalendarRepository } from '../repository/useCalendarRepository';
import { useScheduleRepository } from '../repository/useScheduleRepository';

export type ScheduleEntity = {
  id?: number;
  eventId?: string;
  userId: Users['id'];
  calendarId: string;
  title: string;
  description: string | null;
  startAt: string;
  endAt: string;
  isAllDay: boolean;
  color: string;
  reminderOffset?: number | null;
};

export function useScheduleState() {
  const { user } = useContext(AuthContext);
  const { requestPermission, findDefaultCalendar } = useCalendarRepository();
  const { findManySchedule } = useScheduleRepository();

  const [calendarId, setCalendarId] = useState<string | null>(null);
  const [schedules, setSchedules] = useState<ScheduleEntity[]>([]);

  useEffect(() => {
    if (!user) return;

    (async () => {
      const status = await requestPermission();
      if (status !== PermissionStatus.GRANTED) return;

      const calendar = await findDefaultCalendar();
      if (!calendar) throw new Error('No default calendar found');

      setCalendarId(calendar.id);
      const oneYearAgo = dayjs().subtract(1, 'year').toDate();
      const oneYearLater = dayjs().add(1, 'year').toDate();
      const entities = await findManySchedule(
        user?.id,
        calendar.id,
        oneYearAgo,
        oneYearLater,
      );
      setSchedules(entities);
    })();
  }, [user]);

  function getTargetSchedule(
    eventId: NonNullable<ScheduleEntity['eventId']>,
  ): ScheduleEntity {
    const targetSchedule = schedules?.find(
      (schedule) => schedule.eventId === eventId,
    );
    if (!targetSchedule) throw new Error('Schedule not found');
    return targetSchedule;
  }

  return {
    calendarId,
    schedules,
    setSchedules,
    getTargetSchedule,
  };
}
