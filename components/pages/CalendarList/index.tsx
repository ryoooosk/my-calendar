import { AuthContext } from '@/contexts/AuthContext';
import { ScheduleContext } from '@/contexts/ScheduleContext';
import dayjs from 'dayjs';
import { useContext, useState } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarListPresenter from './presenter';

export default function CalendarListContainer() {
  const { scheduleMap } = useContext(ScheduleContext);
  const { user } = useContext(AuthContext);

  const [visibleMonth, setVisibleMonth] = useState<string>(
    dayjs().format('YYYY年M月'),
  );

  const handleSetVisibleMonth = (date: string) => {
    const displayMonth = dayjs(date).format('YYYY年M月');
    setVisibleMonth(displayMonth);
  };

  return (
    <>
      <CalendarHeader
        date={visibleMonth}
        avatarUri={user?.avatar_url ?? null}
      />
      <CalendarListPresenter
        scheduleMap={scheduleMap}
        handleSetVisibleMonth={handleSetVisibleMonth}
      />
    </>
  );
}
