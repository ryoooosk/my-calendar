import { AuthContext } from '@/contexts/AuthContext';
import { ScheduleContext } from '@/contexts/ScheduleContext';
import { useContext } from 'react';
import CalendarListPresenter from './presenter';

export default function CalendarListContainer() {
  const { scheduleMap } = useContext(ScheduleContext);
  const { user } = useContext(AuthContext);

  return (
    <CalendarListPresenter
      scheduleMap={scheduleMap}
      avatarUri={user?.avatar_url ?? null}
    />
  );
}
