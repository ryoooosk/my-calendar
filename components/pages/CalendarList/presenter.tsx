import { ScheduleEntity } from '@/hooks/model/useScheduleState';
import { CalendarList, DateData, LocaleConfig } from 'react-native-calendars';
import { DayProps } from 'react-native-calendars/src/calendar/day';
import colors from 'tailwindcss/colors';
import CalendarDay from './CalendarDay';

export default function CalendarListPresenter({
  scheduleMap,
  setDate,
}: {
  scheduleMap: Map<string, ScheduleEntity[]>;
  setDate: (date: string) => void;
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
      }}
      renderHeader={() => null}
      pagingEnabled={true}
      horizontal={true}
      hideExtraDays={false}
      firstDay={1}
      futureScrollRange={FUTURE_MONTH_RANGE}
      pastScrollRange={PAST_MONTH_RANGE}
      dayComponent={(
        day: DayProps & {
          date?: DateData;
        },
      ) => {
        const targetSchedules = handleGetTargetSchedules(day.date?.dateString);
        return <CalendarDay {...day} schedules={targetSchedules} />;
      }}
      onVisibleMonthsChange={(months) => setDate(months[0].dateString)}
      theme={{
        calendarBackground: 'transparent',
        textMonthFontSize: 18,
        textMonthFontWeight: 400,
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
