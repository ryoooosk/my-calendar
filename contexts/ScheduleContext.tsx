import { useScheduleActions } from '@/hooks/model/useScheduleActions';
import { useScheduleMapViewModel } from '@/hooks/model/useScheduleMapViewModel';
import {
  ScheduleEntity,
  useScheduleState,
} from '@/hooks/model/useScheduleState';
import { createContext } from 'react';

export const ScheduleContext = createContext<{
  calendarId: string | null;
  schedules: ScheduleEntity[] | null;
  scheduleMap: Map<string, ScheduleEntity[]>;
  getSchedulesForDay: (date: string) => ScheduleEntity[];
  getTargetSchedule: (
    scheduleId: NonNullable<ScheduleEntity['eventId']>,
  ) => ScheduleEntity;
  upsertScheduleAction: (
    calendarId: string,
    schedule: ScheduleEntity,
  ) => Promise<ScheduleEntity>;
  deleteScheduleAction: (
    eventId: NonNullable<ScheduleEntity['eventId']>,
  ) => Promise<void>;
}>({
  calendarId: null,
  schedules: [],
  scheduleMap: new Map(),
  getTargetSchedule: () => {
    throw new Error('getTargetSchedule function must be overridden');
  },
  getSchedulesForDay: () => {
    throw new Error('getSchedulesForDay function must be overridden');
  },
  upsertScheduleAction: () => {
    throw new Error('createEventAction function must be overridden');
  },
  deleteScheduleAction: () => {
    throw new Error('deleteSchedule function must be overridden');
  },
});

export const ScheduleProvider = ({
  children,
}: { children: React.ReactNode }) => {
  const { calendarId, schedules, setSchedules, getTargetSchedule } =
    useScheduleState();
  const { upsertScheduleAction, deleteScheduleAction } =
    useScheduleActions(setSchedules);
  const { scheduleMap, getSchedulesForDay } =
    useScheduleMapViewModel(schedules);

  return (
    <ScheduleContext.Provider
      value={{
        calendarId,
        schedules,
        scheduleMap,
        getTargetSchedule,
        getSchedulesForDay,
        upsertScheduleAction,
        deleteScheduleAction,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};
