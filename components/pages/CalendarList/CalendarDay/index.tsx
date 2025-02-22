import { DateContext } from '@/contexts/DateContext';
import { ScheduleViewModel } from '@/hooks/view-model/useScheduleViewModel';
import { router } from 'expo-router';
import { useContext } from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { DateData } from 'react-native-calendars';
import { DayProps } from 'react-native-calendars/src/calendar/day';

type CalendarDayProps = DayProps & {
  date?: DateData | undefined;
  schedules: ScheduleViewModel[];
};

export default function CalendarDay(props: CalendarDayProps) {
  const { date, children, state, schedules } = props;
  const { setDate } = useContext(DateContext);
  const handlePressDay = (date?: string) => {
    if (!date) return;

    setDate(date);
    router.push('/schedules');
  };

  return (
    <TouchableOpacity
      className={`w-full h-full border-[0.5px] border-gray-100 ${state === 'selected' && 'border-2 border-amber-500'}`}
      onPress={() => handlePressDay(date?.dateString)}
    >
      <Text
        className={`font-medium text-center tracking-wide ${state === 'today' && 'text-amber-500'} ${state === 'disabled' && 'text-gray-400'}`}
      >
        {children}
      </Text>

      {/* TODO: 連日の予定の場合は日をまたいで表示する */}
      {schedules.map((schedule) => (
        <View
          key={schedule.id}
          className="w-full mb-[0.2rem] py-[0.15rem] px-[0.2rem] rounded-sm overflow-hidden"
          style={{ backgroundColor: schedule.color }}
        >
          <Text
            className="text-[0.85rem] tracking-wide font-bold"
            numberOfLines={1}
            ellipsizeMode="clip"
          >
            {schedule.title}
          </Text>
        </View>
      ))}
    </TouchableOpacity>
  );
}
