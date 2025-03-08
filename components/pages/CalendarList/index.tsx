import { DateContext } from '@/contexts/DateContext';
import { ScheduleContext } from '@/contexts/ScheduleContext';
import { useContext } from 'react';
import CalendarListPresenter from './presenter';

export default function CalendarListContainer() {
  const { scheduleMap } = useContext(ScheduleContext);
  const { setDate } = useContext(DateContext);

  return <CalendarListPresenter scheduleMap={scheduleMap} setDate={setDate} />;
}
