import { ScheduleViewModel } from '@/hooks/useScheduleViewModel';
import { createContext, useState } from 'react';

export const ScheduleContext = createContext<{
  selectedSchedule: ScheduleViewModel | null;
  setSelectedSchedule: (schedule: ScheduleViewModel) => void;
}>({
  selectedSchedule: null,
  setSelectedSchedule: () => {},
});

export const ScheduleProvider = ({ children }: { children: JSX.Element }) => {
  const [selectedSchedule, setSelectedSchedule] =
    useState<ScheduleViewModel | null>(null);

  return (
    <ScheduleContext.Provider value={{ selectedSchedule, setSelectedSchedule }}>
      {children}
    </ScheduleContext.Provider>
  );
};
