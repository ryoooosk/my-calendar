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
  const { getTargetSchedule, deleteSchedule } = useContext(ScheduleContext);

  const scheduleId = (() => {
    const { scheduleId } = useLocalSearchParams();
    const id = Number(Array.isArray(scheduleId) ? scheduleId[0] : scheduleId);

    if (Number.isNaN(id) || id < 1) throw new Error('Invalid schedule id');
    return id;
  })();

  const handleDeleteSchedule = useCallback(() => {
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
  }, [getTargetSchedule, deleteSchedule, scheduleId]);

  if (!user || !getTargetSchedule) return <Spinner />;
  return (
    <View className="flex-1 relative">
      <UpsertScheduleFormContainer
        user={user}
        selectedSchedule={getTargetSchedule(scheduleId)}
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
