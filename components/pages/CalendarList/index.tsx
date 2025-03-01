import { AuthContext } from '@/contexts/AuthContext';
import { useScheduleModel } from '@/hooks/model/useScheduleModel';
import { useContext } from 'react';
import CalendarListPresenter from './presenter';

export default function CalendarListContainer() {
  const { scheduleMap } = useScheduleModel();
  const { user } = useContext(AuthContext);

  return (
    <CalendarListPresenter
      scheduleMap={scheduleMap}
      avatarUri={user?.avatar_url ?? null}
    />
  );
}
