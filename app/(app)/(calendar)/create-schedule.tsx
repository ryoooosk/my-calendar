import 'dayjs/locale/ja';
import CreateScheduleFormContainer from '@/components/pages/create-schedule/create-schedule-form';
import { Spinner } from '@/components/ui/spinner';
import { AuthContext } from '@/hooks/auth';
import { useContext } from 'react';

export default function CreateSchedulePage() {
  const { user } = useContext(AuthContext);

  if (!user) return <Spinner />;
  return <CreateScheduleFormContainer user={user} />;
}
