import {
  ScheduleEntity,
  useScheduleModel,
} from '@/hooks/model/useScheduleModel';
import { createContext } from 'react';

export const ScheduleContext = createContext<{
  scheduleMap: Map<string, ScheduleEntity[]>;
  getTargetSchedule: (scheduleId: number) => ScheduleEntity;
  getTargetDaySchedules: (date: string) => ScheduleEntity[];
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
  getTargetDaySchedules: (date: string) => {
    throw new Error('getTargetDaySchedules function must be overridden');
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
  const {
    scheduleMap,
    getTargetSchedule,
    getTargetDaySchedules,
    upsertSchedule,
    deleteSchedule,
  } = useScheduleModel();

  return (
    <ScheduleContext.Provider
      value={{
        scheduleMap,
        getTargetSchedule,
        getTargetDaySchedules,
        upsertSchedule,
        deleteSchedule,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};
