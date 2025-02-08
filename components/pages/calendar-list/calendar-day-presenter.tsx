import { Text } from '@/components/ui/text';
import { ScheduleViewModel } from '@/hooks/useCalendarSchedules';
import { TouchableOpacity, View } from 'react-native';
import { DateData } from 'react-native-calendars';
import { DayProps } from 'react-native-calendars/src/calendar/day';

type CalendarDayProps = DayProps & {
  date?: DateData | undefined;
  schedules: ScheduleViewModel[];
};

export default function CalendarDayPresenter(props: CalendarDayProps) {
  const { children, state, schedules } = props;

  return (
    <TouchableOpacity
      className={`w-full h-full border-[0.5px] border-gray-100 ${state === 'selected' && 'border-2 border-amber-500'}`}
    >
      <Text
        className={`font-medium text-center tracking-wide ${state === 'today' && 'text-amber-500'} ${state === 'disabled' && 'text-gray-400'}`}
      >
        {children}
      </Text>

      {/* TODO: 連日の予定の場合は日をまたいで表示する */}
      {schedules.length > 0 && (
        <View className="flex flex-col gap-1">
          {schedules.map((schedule) => (
            <Text
              key={schedule.id}
              className="w-full px-1 py-[0.15rem] text-xs font-semibold bg-sky-200 rounded-sm"
              numberOfLines={1}
              ellipsizeMode="clip"
            >
              {schedule.title}
            </Text>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
}
