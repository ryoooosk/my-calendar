import {
  ScheduleEntity,
  useScheduleModel,
} from '@/hooks/model/useScheduleModel';
import { useScheduleMapViewModel } from '@/hooks/view-model/useScheduleMapViewModel';
import { createContext } from 'react';

export const ScheduleContext = createContext<{
  scheduleMap: Map<string, ScheduleEntity[]>;
  getTargetSchedule: (scheduleId: number) => ScheduleEntity;
  getSchedulesForDay: (date: string) => ScheduleEntity[];
  upsertSchedule: (schedule: ScheduleEntity) => Promise<void>;
  deleteSchedule: (
    scheduleId: number,
    reminderIdentifier?: string,
  ) => Promise<void>;
}>({
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
  const { getTargetSchedule, upsertSchedule, deleteSchedule } =
    useScheduleModel();
  const { scheduleMap, getSchedulesForDay } = useScheduleMapViewModel();

  return (
    <ScheduleContext.Provider
      value={{
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
