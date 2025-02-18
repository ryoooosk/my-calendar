import { Divider } from '@/components/ui/divider/divider';
import { SCHEDULE_DEFAULT_SELECTED_COLOR } from '@/constants/schedule-colors';
import { InsertSchedules, Users } from '@/database.types';
import { ScheduleViewModel } from '@/hooks/useScheduleViewModel';
import { supabase } from '@/lib/supabase';
import { roundedDateInFiveMinute } from '@/utils/date.logic';
import dayjs from 'dayjs';
import { useNavigation, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import DateTimeSelect from './date-time-selct';
import ScheduleDescriptionInput from './schedule-description-input';
import ScheduleTitleInput from './schedule-title-input';
import SelectScheduleColorContainer from './select-schedule-color';

export default function UpsertScheduleFormContainer({
  user,
  selectedSchedule,
}: { user: Users; selectedSchedule: ScheduleViewModel | null }) {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    if (!selectedSchedule) return;

    setId(selectedSchedule.id);
    setTitle(selectedSchedule.title);
    setStartDate(dayjs(selectedSchedule.startAt));
    setEndDate(dayjs(selectedSchedule.endAt));
    setIsAllDay(selectedSchedule.isAllDay);
    setDescription(selectedSchedule.description ?? '');
    setColor(selectedSchedule.color);
  }, [selectedSchedule]);

  const [id, setId] = useState<number | undefined>(undefined);
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(roundedDateInFiveMinute(dayjs()));
  const [endDate, setEndDate] = useState(
    roundedDateInFiveMinute(dayjs().add(1, 'hour')),
  );
  const [isAllDay, setIsAllDay] = useState(false);
  const [description, setDescription] = useState('');

  const [color, setColor] = useState<string>(SCHEDULE_DEFAULT_SELECTED_COLOR);

  const handleSubmit = useCallback(async () => {
    if (endDate.isBefore(startDate)) {
      return Alert.alert('終了日時は開始日時より後に設定してください');
    }

    const data: InsertSchedules = {
      id,
      user_id: user.id,
      title,
      start_at: !isAllDay
        ? startDate.toDate().toISOString()
        : startDate.startOf('day').toDate().toISOString(),
      end_at: !isAllDay
        ? endDate.toDate().toISOString()
        : endDate.endOf('day').toDate().toISOString(),
      is_all_day: isAllDay,
      description,
      color,
    };

    await supabase.from('schedules').upsert(data);
    router.replace('/');
  }, [user, id, title, startDate, endDate, isAllDay, description, color]);

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
    <View className="flex-1">
      <ScheduleTitleInput title={title} setTitle={setTitle} />
      <Divider />
      <DateTimeSelect
        startDate={startDate}
        endDate={endDate}
        isAllDay={isAllDay}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setIsAllDay={setIsAllDay}
      />
      <Divider />
      <SelectScheduleColorContainer
        selectedColor={color}
        setSelectedColor={setColor}
      />
      <ScheduleDescriptionInput
        description={description}
        setDescription={setDescription}
      />
    </View>
  );
}
