import { Text, TouchableOpacity } from 'react-native';
import { DateData } from 'react-native-calendars';
import { DayProps } from 'react-native-calendars/src/calendar/day';

type CalendarDayProps = DayProps & {
  date?: DateData | undefined;
};

export default function CalendarDayPresenter(props: CalendarDayProps) {
  const { date, children, state } = props;

  return (
    <TouchableOpacity
      className={`w-full h-full border-[0.5px] border-gray-100 ${state === 'selected' && 'border-2 border-amber-500'} px-1`}
    >
      <Text
        className={`font-medium text-center tracking-wide ${state === 'today' && 'text-amber-500'} ${state === 'disabled' && 'text-gray-400'}`}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}
