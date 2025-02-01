import { Divider } from '@/components/ui/divider/divider';
import dayjs from 'dayjs';
import { useNavigation, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import 'dayjs/locale/ja';
import DateTimeSelect from '@/components/pages/create-schedule/date-time-select';
import ScheduleDescriptionInput from '@/components/pages/create-schedule/schedule-description-input';
import ScheduleTitleInput from '@/components/pages/create-schedule/schedule-title-input';
import { supabase } from '@/lib/supabase';
import { roundedDateInFiveMinute } from '@/utils/date.logic';

export default function CreateSchedulePage() {
  const router = useRouter();
  const navigation = useNavigation();

  // TODO: アプリケーション全体で管理したい
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw new Error(error.message);
      setUserId(data.user.id);
    };

    fetchSession();
  }, []);

  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(roundedDateInFiveMinute(dayjs()));
  const [endDate, setEndDate] = useState(
    roundedDateInFiveMinute(dayjs().add(1, 'hour')),
  );
  const [isAllDay, setIsAllDay] = useState(false);
  const [description, setDescription] = useState('');

  const handleSubmit = useCallback(async () => {
    if (!userId) throw new Error('User ID is not found');

    if (endDate.isBefore(startDate)) {
      return Alert.alert('終了日時は開始日時より後に設定してください');
    }

    const data = {
      user_id: userId,
      title,
      start_at: !isAllDay
        ? startDate.toDate().toISOString()
        : startDate.startOf('day').toDate().toISOString(),
      end_at: !isAllDay
        ? endDate.toDate().toISOString()
        : endDate.endOf('day').toDate().toISOString(),
      is_all_day: isAllDay,
      description,
    };

    await supabase.from('schedules').insert(data);
    router.replace('/');
  }, [userId, title, startDate, endDate, isAllDay, description]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSubmit}>
          <Text className="text-xl font-medium text-sky-600 tracking-wide">
            作成
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, handleSubmit]);

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
      <ScheduleDescriptionInput
        description={description}
        setDescription={setDescription}
      />
    </View>
  );
}
