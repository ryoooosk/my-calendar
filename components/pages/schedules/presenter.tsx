import dayjs from 'dayjs';
import { Text } from 'react-native';
import { View } from 'react-native';
import { Agenda, AgendaEntry, AgendaSchedule } from 'react-native-calendars';
import colors from 'tailwindcss/colors';
import ScheduleItem from './schedule-item';

dayjs.locale('ja');

export default function SchedulesPresenter({
  agendaEntries,
  handleSelectSchedule,
  selectedDate,
  handleDeleteSchedule,
}: {
  agendaEntries: AgendaSchedule;
  handleSelectSchedule: (scheduleId: number) => void;
  selectedDate: string;
  handleDeleteSchedule: (scheduleId: number) => void;
}) {
  return (
    <Agenda
      items={agendaEntries}
      renderItem={(
        schedule: AgendaEntry & {
          id: number;
          isAllDay: boolean;
          description: string;
        },
      ) =>
        handleRenderItem(schedule, handleSelectSchedule, handleDeleteSchedule)
      }
      renderDay={(
        day: Date | undefined,
        schedule: AgendaEntry & {
          id: number;
          isAllDay: boolean;
          description: string;
        },
      ) =>
        handleRenderDay(
          day,
          schedule,
          handleSelectSchedule,
          handleDeleteSchedule,
        )
      }
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

// 最初以外のagendaを表示する
const handleRenderItem = (
  schedule: AgendaEntry & {
    id: number;
    isAllDay: boolean;
    description: string;
  },
  handleSelectSchedule: (scheduleId: number) => void,
  handleDeleteSchedule: (scheduleId: number) => void,
) => {
  return (
    <ScheduleItem
      schedule={schedule}
      isFirstInDay={false}
      handleSelectSchedule={handleSelectSchedule}
      handleDeleteSchedule={handleDeleteSchedule}
    />
  );
};

// 各日とその最初のagendaを表示する
const handleRenderDay = (
  day: Date | undefined,
  schedule: AgendaEntry & {
    id: number;
    isAllDay: boolean;
    description: string;
  },
  handleSelectSchedule: (scheduleId: number) => void,
  handleDeleteSchedule: (scheduleId: number) => void,
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

      <ScheduleItem
        schedule={schedule}
        isFirstInDay={true}
        handleSelectSchedule={handleSelectSchedule}
        handleDeleteSchedule={handleDeleteSchedule}
      />
    </View>
  );
};
