import UpsertScheduleFormContainer from '@/components/pages/UpsertScheduleForm';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { AuthContext } from '@/contexts/AuthContext';
import { ScheduleContext } from '@/contexts/ScheduleContext';
import { router, useLocalSearchParams } from 'expo-router';
import { Trash2 } from 'lucide-react-native';
import { useCallback, useContext } from 'react';
import { Alert, View } from 'react-native';

export default function UpdateSchedulePage() {
  const { user } = useContext(AuthContext);
  const { getTargetSchedule, deleteScheduleAction } =
    useContext(ScheduleContext);

  const scheduleEventId = (() => {
    const { scheduleEventId } = useLocalSearchParams();
    const id = Array.isArray(scheduleEventId)
      ? scheduleEventId[0]
      : scheduleEventId;
    return id;
  })();

  const handleDeleteSchedule = useCallback(() => {
    const targetSchedule = getTargetSchedule(scheduleEventId);
    Alert.alert('予定の削除', `「${targetSchedule.title}」を削除しますか？`, [
      { text: 'キャンセル', onPress: () => {} },
      {
        text: '削除する',
        onPress: async () => {
          if (!targetSchedule.eventId) throw new Error('Event ID is missing');
          await deleteScheduleAction(targetSchedule.eventId);
          router.replace('/');
        },
      },
    ]);
  }, [getTargetSchedule, deleteScheduleAction, scheduleEventId]);

  if (!user || !getTargetSchedule) return <Spinner />;
  return (
    <View className="flex-1 relative bg-gray-50 dark:bg-black">
      <UpsertScheduleFormContainer
        user={user}
        selectedSchedule={getTargetSchedule(scheduleEventId)}
      />

      <View className="absolute bottom-12 w-full flex items-center justify-center">
        <Button
          className="rounded-md bg-red-100"
          action="negative"
          onPress={handleDeleteSchedule}
        >
          <ButtonText className="text-base text-red-600 tracking-wide">
            このスケジュールを削除する
          </ButtonText>
          <ButtonIcon className="text-red-600" as={Trash2} />
        </Button>
      </View>
    </View>
  );
}
