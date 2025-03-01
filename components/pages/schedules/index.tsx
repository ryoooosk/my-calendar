import { DateContext } from '@/contexts/DateContext';

import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import { useScheduleModel } from '@/hooks/model/useScheduleModel';
import { router } from 'expo-router';
import { useCallback, useContext } from 'react';
import { Alert } from 'react-native';
import SchedulesPresenter from './presenter';

dayjs.locale('ja');

export default function SchedulesContainer() {
  const { agendaEntries, getTargetSchedule } = useScheduleModel();
  const { deleteSchedule } = useScheduleModel();
  const { date: selectedDate } = useContext(DateContext);

  const handleSelectSchedule = (scheduleId: number) =>
    router.push(`/schedule/update/${scheduleId}`);
  const handleDeleteSchedule = useCallback(
    (scheduleId: number) => {
      const targetSchedule = getTargetSchedule(scheduleId);

      Alert.alert('予定の削除', `「${targetSchedule.title}」を削除しますか？`, [
        { text: 'キャンセル', onPress: () => {} },
        {
          text: '削除する',
          onPress: async () => {
            await deleteSchedule(scheduleId, targetSchedule.reminderIdentifier);
            router.replace('/');
          },
        },
      ]);
    },
    [getTargetSchedule, deleteSchedule],
  );

  return (
    <SchedulesPresenter
      agendaEntries={agendaEntries}
      selectedDate={selectedDate}
      handleSelectSchedule={handleSelectSchedule}
      handleDeleteSchedule={handleDeleteSchedule}
    />
  );
}
