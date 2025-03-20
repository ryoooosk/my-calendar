import {
  ScheduleEntity,
  useScheduleActions,
} from '@/hooks/model/useScheduleActions';
import { useScheduleMapViewModel } from '@/hooks/model/useScheduleMapViewModel';
import { useScheduleState } from '@/hooks/model/useScheduleState';
import { createContext, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const ScheduleContext = createContext<{
  schedules: ScheduleEntity[] | null;
  scheduleMap: Map<string, ScheduleEntity[]>;
  getTargetSchedule: (scheduleId: number) => ScheduleEntity;
  getSchedulesForDay: (date: string) => ScheduleEntity[];
  upsertSchedule: (schedule: ScheduleEntity) => Promise<void>;
  deleteSchedule: (
    scheduleId: number,
    reminderIdentifier?: string,
  ) => Promise<void>;
}>({
  schedules: [],
  scheduleMap: new Map(),
  getTargetSchedule: (scheduleId: number) => {
    throw new Error('getTargetSchedule function must be overridden');
  },
  getSchedulesForDay: (date: string) => {
    throw new Error('getSchedulesForDay function must be overridden');
  },
  upsertSchedule: (schedule: ScheduleEntity) => {
    throw new Error('upsertSchedule function must be overridden');
  },
  deleteSchedule: (scheduleId: number, reminderIdentifier?: string) => {
    throw new Error('deleteSchedule function must be overridden');
  },
});

export const ScheduleProvider = ({
  children,
}: { children: React.ReactNode }) => {
  const { user } = useContext(AuthContext);
  const { schedules, setSchedules, getTargetSchedule } = useScheduleState(
    user?.id,
  );
  const { upsertSchedule, deleteSchedule } = useScheduleActions(
    user?.id,
    setSchedules,
  );
  const { scheduleMap, getSchedulesForDay } =
    useScheduleMapViewModel(schedules);

  return (
    <ScheduleContext.Provider
      value={{
        schedules,
        scheduleMap,
        getTargetSchedule,
        getSchedulesForDay,
        upsertSchedule,
        deleteSchedule,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};
