import UpsertScheduleFormContainer from '@/components/pages/upsert-schedule-form';
import { Spinner } from '@/components/ui/spinner';
import { ScheduleContext } from '@/context/ScheduleContext';
import { AuthContext } from '@/hooks/auth';
import { useContext } from 'react';

export default function UpdateSchedule() {
  const { user } = useContext(AuthContext);
  const { selectedSchedule } = useContext(ScheduleContext);

  if (!user) return <Spinner />;
  return (
    <UpsertScheduleFormContainer
      user={user}
      selectedSchedule={selectedSchedule}
    />
  );
}
