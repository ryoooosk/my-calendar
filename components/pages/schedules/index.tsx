import { DateContext } from '@/hooks/selectedDate';
import { useSchedulesViewModel } from '@/hooks/view-model/useScheduleViewModel';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import { router } from 'expo-router';
import { useContext } from 'react';
import { Alert } from 'react-native';
import SchedulesPresenter from './presenter';

dayjs.locale('ja');

export default function SchedulesContainer() {
  const { agendaEntries, getTargetSchedule, deleteSchedule } =
    useSchedulesViewModel();
  const { date: selectedDate } = useContext(DateContext);

  const handleSelectSchedule = (scheduleId: number) =>
    router.push(`/schedule/update/${scheduleId}`);
  const handleDeleteSchedule = (scheduleId: number) => {
    const targetSchedule = getTargetSchedule(scheduleId);

    Alert.alert('予定の削除', `「${targetSchedule.title}」を削除しますか？`, [
      { text: 'キャンセル', onPress: () => {} },
      {
        text: '削除する',
        onPress: async () => {
          await deleteSchedule(scheduleId);
          router.replace('/');
        },
      },
    ]);
  };

  return (
    <SchedulesPresenter
      agendaEntries={agendaEntries}
      selectedDate={selectedDate}
      handleSelectSchedule={handleSelectSchedule}
      handleDeleteSchedule={handleDeleteSchedule}
    />
  );
}
