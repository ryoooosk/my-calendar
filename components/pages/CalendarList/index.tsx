import { CurrentDateContext } from '@/contexts/CurrentDateContext';
import { ScheduleContext } from '@/contexts/ScheduleContext';
import { useContext } from 'react';
import CalendarListPresenter from './presenter';

export default function CalendarListContainer() {
  const { scheduleMap } = useContext(ScheduleContext);
  const { setCurrentDate } = useContext(CurrentDateContext);

  return (
    <CalendarListPresenter scheduleMap={scheduleMap} setDate={setCurrentDate} />
  );
}
