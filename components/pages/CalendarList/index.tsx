import { AuthContext } from '@/contexts/AuthContext';
import { useSchedulesViewModel } from '@/hooks/view-model/useScheduleViewModel';
import { useContext } from 'react';
import CalendarListPresenter from './presenter';

export default function CalendarListContainer() {
  const { scheduleMap } = useSchedulesViewModel();
  const { user } = useContext(AuthContext);

  return (
    <CalendarListPresenter
      scheduleMap={scheduleMap}
      avatarUri={user?.avatar_url ?? null}
    />
  );
}
