import 'dayjs/locale/ja';
import UpsertScheduleFormContainer from '@/components/pages/UpsertScheduleForm';
import { Spinner } from '@/components/ui/spinner';
import { AuthContext } from '@/contexts/AuthContext';
import { useLocalSearchParams } from 'expo-router';
import { useContext, useEffect, useState } from 'react';

export default function CreateSchedulePage() {
  const { user } = useContext(AuthContext);
  const { date: dateParams } = useLocalSearchParams();

  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    if (!dateParams) return;
    const dateParam = Array.isArray(dateParams) ? dateParams[0] : dateParams;
    setDate(dateParam);
  }, [dateParams]);

  if (!user) return <Spinner />;
  return (
    <UpsertScheduleFormContainer
      user={user}
      selectedDate={date}
      selectedSchedule={null}
    />
  );
}
