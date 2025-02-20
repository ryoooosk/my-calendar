import 'dayjs/locale/ja';
import UpsertScheduleFormContainer from '@/components/pages/UpsertScheduleForm';
import { Spinner } from '@/components/ui/spinner';
import { AuthContext } from '@/hooks/auth';
import { useContext } from 'react';

export default function CreateSchedulePage() {
  const { user } = useContext(AuthContext);

  if (!user) return <Spinner />;
  return <UpsertScheduleFormContainer user={user} selectedSchedule={null} />;
}
