import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button, ButtonIcon } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { DateContext } from '@/hooks/selectedDate';
import { ScheduleViewModel } from '@/hooks/view-model/useScheduleViewModel';
import dayjs from 'dayjs';
import { router, useRouter } from 'expo-router';
import { Settings2, User } from 'lucide-react-native';
import { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { CalendarList, DateData, LocaleConfig } from 'react-native-calendars';
import { DayProps } from 'react-native-calendars/src/calendar/day';
import colors from 'tailwindcss/colors';

export default function CalendarListPresenter({
  scheduleMap,
  avatarUri,
}: {
  scheduleMap: Map<string, ScheduleViewModel[]>;
  avatarUri: string | null;
}) {
  const FUTURE_MONTH_RANGE = 24;
  const PAST_MONTH_RANGE = 24;

  const handleGetTargetSchedules = (dateString: string | undefined) => {
    if (!dateString) return [];
    return scheduleMap.get(dateString) ?? [];
  };

  return (
    <CalendarList
      calendarStyle={{ height: '100%', paddingLeft: 0, paddingRight: 0 }}
      style={{
        height: '100%',
        width: '100%',
        paddingLeft: 0,
        paddingRight: 0,
        backgroundColor: colors.white,
      }}
      pagingEnabled={true}
      horizontal={true}
      hideExtraDays={false}
      firstDay={1}
      futureScrollRange={FUTURE_MONTH_RANGE}
      pastScrollRange={PAST_MONTH_RANGE}
      renderHeader={(date: string) => {
        return (
          <CalendarHeaderPresenter
            date={dayjs(date).format('YYYY年M月')}
            avatarUri={avatarUri}
          />
        );
      }}
      dayComponent={(
        day: DayProps & {
          date?: DateData;
        },
      ) => {
        const targetSchedules = handleGetTargetSchedules(day.date?.dateString);
        return <CalendarDayPresenter {...day} schedules={targetSchedules} />;
      }}
      theme={{
        calendarBackground: 'transparent',
        textMonthFontSize: 18,
        textMonthFontWeight: 400,
        textSectionTitleColor: colors.slate[800],
        textDayHeaderFontWeight: 500,
        textDayFontSize: 16,
        textDayFontWeight: 400,
        selectedDayTextColor: colors.white,
        selectedDayBackgroundColor: colors.amber[400],
        'stylesheet.calendar.main': {
          container: {
            flex: 1,
          },
          monthView: {
            flex: 1,
          },
          week: {
            flex: 1,
            flexDirection: 'row',
          },
        },
      }}
    />
  );
}

function CalendarHeaderPresenter({
  date,
  avatarUri,
}: { date?: string; avatarUri: string | null }) {
  const router = useRouter();

  return (
    <View className="w-full pb-4 flex-row justify-between items-center border-b border-gray-300">
      <Button
        size="md"
        variant="link"
        className="rounded-full w-12 h-12"
        onPress={() => router.push('/mypage')}
      >
        <Avatar size="md" className="bg-slate-600">
          {avatarUri ? (
            <AvatarImage source={{ uri: avatarUri }} />
          ) : (
            <Icon as={User} size="md" className="stroke-white" />
          )}
        </Avatar>
      </Button>

      {date && <Text className="text-2xl font-medium">{date}</Text>}

      <Button size="md" variant="link" className="rounded-full p-1">
        <ButtonIcon as={Settings2} className="color-gray-700 w-8 h-8" />
      </Button>
    </View>
  );
}

type CalendarDayProps = DayProps & {
  date?: DateData | undefined;
  schedules: ScheduleViewModel[];
};

function CalendarDayPresenter(props: CalendarDayProps) {
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

LocaleConfig.locales.jp = {
  monthNames: [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
  ],
  monthNamesShort: [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
  ],
  dayNames: [
    '日曜日',
    '月曜日',
    '火曜日',
    '水曜日',
    '木曜日',
    '金曜日',
    '土曜日',
  ],
  dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
};
LocaleConfig.defaultLocale = 'jp';
