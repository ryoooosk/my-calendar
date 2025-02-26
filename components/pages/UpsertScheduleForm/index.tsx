import { Users } from '@/database.types';
import { ScheduleViewModel } from '@/hooks/view-model/useScheduleViewModel';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useUpsertScheduleForm } from './hooks';
import UpsertScheduleFormContainerPresenter from './presenter';

export default function UpsertScheduleFormContainer({
  user,
  selectedSchedule,
}: { user: Users; selectedSchedule: ScheduleViewModel | null }) {
  const navigation = useNavigation();
  const {
    id,
    title,
    setTitle,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    isAllDay,
    setIsAllDay,
    color,
    setColor,
    description,
    setDescription,
    handleSubmit,
  } = useUpsertScheduleForm(selectedSchedule, user);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSubmit}>
          <Text className="text-xl font-medium text-sky-600 tracking-wide">
            {id ? '更新' : '作成'}
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, handleSubmit, id]);

  return (
    <UpsertScheduleFormContainerPresenter
      {...{
        title,
        setTitle,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        isAllDay,
        setIsAllDay,
        color,
        setColor,
        description,
        setDescription,
      }}
    />
  );
}
