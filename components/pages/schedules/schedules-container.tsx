import { DateContext } from '@/hooks/selectedDate';
import {
  ScheduleViewModel,
  useSchedulesViewModel,
} from '@/hooks/useScheduleViewModel';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import { useContext, useMemo } from 'react';
import { View } from 'react-native';
import { Alert, Text, TouchableOpacity } from 'react-native';
import { Agenda, AgendaEntry, AgendaSchedule } from 'react-native-calendars';
import colors from 'tailwindcss/colors';

dayjs.locale('ja');

export default function SchedulesContainer() {
  const schedules: Map<string, ScheduleViewModel[]> = useSchedulesViewModel();
  const { date: selectedDate } = useContext(DateContext);
  const agendaEntries: AgendaSchedule = useMemo(() => {
    const agendaSchedule: AgendaSchedule = {};

    return Array.from(schedules.entries()).reduce(
      (acc, [date, scheduleArray]) => {
        const agendaSchedules = scheduleArray.map((schedule) => ({
          id: schedule.id,
          name: schedule.title,
          height: 70,
          day: `${dayjs(schedule.startAt).format('HH:mm')} - ${dayjs(schedule.endAt).format('HH:mm')}`,
          isAllDay: schedule.isAllDay,
          description: schedule.description,
        }));
        acc[date] = agendaSchedules;
        return acc;
      },
      agendaSchedule,
    );
  }, [schedules]);

  return (
    <Agenda
      items={agendaEntries}
      renderItem={handleRenderItem}
      renderDay={handleRenderDay}
      selected={selectedDate}
      showClosingKnob={true}
      theme={{
        agendaDayNumColor: colors.gray[600],
        agendaDayTextColor: colors.gray[600],
        agendaTodayColor: colors.amber[500],
        agendaKnobColor: colors.sky[500],
      }}
    />
  );
}

// 各日とその最初のagendaを表示する
const handleRenderDay = (
  day: Date | undefined,
  schedule: AgendaEntry & { isAllDay: boolean; description: string },
) => {
  if (!day || !schedule) return;

  const isToday = dayjs(day).isSame(dayjs(), 'day');

  return (
    <View className="w-full flex flex-row">
      <View className="w-16 flex items-center justify-start mt-4 pt-2">
        <Text
          className={`w-10 h-10 text-[1.35rem] text-center leading-10 font-medium text-slate-800 ${isToday && ' bg-amber-500 text-white rounded-full'}`}
        >
          {dayjs(day).format('D')}
        </Text>
        <Text className="text-slate-600">{dayjs(day).format('dd')}</Text>
      </View>

      <ScheduleItem schedule={schedule} isFirstInDay={true} />
    </View>
  );
};

// 最初以外のagendaを表示する
const handleRenderItem = (
  schedule: AgendaEntry & { isAllDay: boolean; description: string },
) => {
  return <ScheduleItem schedule={schedule} isFirstInDay={false} />;
};

function ScheduleItem({
  schedule,
  isFirstInDay,
}: {
  schedule: AgendaEntry & { isAllDay: boolean; description: string };
  isFirstInDay: boolean;
}) {
  return (
    <TouchableOpacity
      key={schedule.name}
      className={`flex-1 flex gap-1 bg-white px-4 py-3 mr-5 mt-4 rounded-xl ${!isFirstInDay && 'ml-16'}`}
      onPress={() => Alert.alert(schedule.name)}
    >
      <Text
        className="text-xl font-medium tracking-wider text-slate-800"
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {schedule.name}
      </Text>
      <Text className="text-[1.13rem] tracking-wide text-slate-800">
        {schedule.isAllDay ? '終日' : schedule.day}
      </Text>
      {schedule.description && (
        <Text
          className="mt-2 text-gray-500 tracking-wide"
          numberOfLines={3}
          ellipsizeMode="tail"
        >
          {schedule.description}
        </Text>
      )}
    </TouchableOpacity>
  );
}
