import {
  ScheduleEntity,
  useScheduleModel,
} from '@/hooks/model/useScheduleModel';
import { createContext } from 'react';
import { AgendaSchedule } from 'react-native-calendars';

export const ScheduleContext = createContext<{
  scheduleMap: Map<string, ScheduleEntity[]>;
  agendaEntries: AgendaSchedule;
  getTargetSchedule: (scheduleId: number) => ScheduleEntity;
  upsertSchedule: (schedule: ScheduleEntity) => Promise<void>;
  deleteSchedule: (
    scheduleId: number,
    reminderIdentifier?: string,
  ) => Promise<void>;
}>({
  scheduleMap: new Map(),
  agendaEntries: {},
  getTargetSchedule: (scheduleId: number) => {
    throw new Error('getTargetSchedule function must be overridden');
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
    agendaEntries,
    getTargetSchedule,
    upsertSchedule,
    deleteSchedule,
  } = useScheduleModel();

  return (
    <ScheduleContext.Provider
      value={{
        scheduleMap,
        agendaEntries,
        getTargetSchedule,
        upsertSchedule,
        deleteSchedule,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};
