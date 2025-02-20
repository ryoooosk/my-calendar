import { AuthContext } from '@/contexts/AuthContext';
import {
  ScheduleViewModel,
  useSchedulesViewModel,
} from '@/hooks/useScheduleViewModel';
import { useContext } from 'react';
import CalendarListPresenter from './presenter';

export default function CalendarListContainer() {
  const scheduleMap: Map<string, ScheduleViewModel[]> = useSchedulesViewModel();
  const { user } = useContext(AuthContext);

  return (
    <CalendarListPresenter
      scheduleMap={scheduleMap}
      avatarUri={user?.avatar_url ?? null}
    />
  );
}
