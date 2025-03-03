import UpsertScheduleFormContainer from '@/components/pages/UpsertScheduleForm';
import { Spinner } from '@/components/ui/spinner';
import { AuthContext } from '@/contexts/AuthContext';
import { ScheduleContext } from '@/contexts/ScheduleContext';
import { useLocalSearchParams } from 'expo-router';
import { useContext, useMemo } from 'react';

export default function UpdateSchedulePage() {
  const { user } = useContext(AuthContext);
  const { scheduleMap } = useContext(ScheduleContext);

  const scheduleId = (() => {
    const { scheduleId } = useLocalSearchParams();
    const id = Number(Array.isArray(scheduleId) ? scheduleId[0] : scheduleId);

    if (Number.isNaN(id) || id < 1) throw new Error('Invalid schedule id');
    return id;
  })();

  const getTargetSchedule = useMemo(() => {
    // TODO:  重複を含むのでもっと効率の良い取得にしたい
    const allSchedules = Array.from(scheduleMap.values()).flat();
    const targetSchedule = allSchedules.find(
      (schedule) => schedule.id === scheduleId,
    );

    if (!targetSchedule) return;
    return targetSchedule;
  }, [scheduleId, scheduleMap]);

  if (!user || !getTargetSchedule) return <Spinner />;
  return (
    <UpsertScheduleFormContainer
      user={user}
      selectedSchedule={getTargetSchedule}
    />
  );
}
