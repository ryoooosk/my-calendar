import {
  ScheduleViewModel,
  useSchedulesViewModel,
} from '@/hooks/useScheduleViewModel';
import CalendarListPresenter from './presenter';

export default function CalendarListContainer() {
  const scheduleMap: Map<string, ScheduleViewModel[]> = useSchedulesViewModel();

  return <CalendarListPresenter scheduleMap={scheduleMap} />;
}
