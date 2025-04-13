import dayjs from 'dayjs';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { Timeline } from 'react-native-calendars';
import { Event } from 'react-native-calendars/src/timeline/EventBlock';
import colors from 'tailwindcss/colors';
import 'dayjs/locale/ja';
import { ScheduleEntity } from '@/hooks/model/useScheduleState';

export default function TimelinePresenter({
  date,
  dayEvents,
  timeEvents,
}: { date: string; dayEvents: ScheduleEntity[]; timeEvents: Event[] }) {
  const TIME_LINE_LEFT_INSET = 60;
  const TIME_LINE_RIGHT_INSET = 12;

  return (
    <>
      <View className="flex flex-row items-center py-3 bg-white border-b border-gray-300">
        <View
          className="flex flex-col items-center"
          style={{ width: TIME_LINE_LEFT_INSET }}
        >
          <Text className="text-gray-700 text-base">
            {dayjs(date).locale('ja').format('dd')}
          </Text>
          <Text className="text-xl font-medium tracking-widest">
            {dayjs(date).format('DD')}
          </Text>
        </View>

        <View
          className="flex flex-col gap-1 flex-1"
          style={{ marginRight: TIME_LINE_RIGHT_INSET }}
        >
          {dayEvents.length > 0 || timeEvents.length > 0 ? (
            dayEvents.map((event) => (
              <TouchableOpacity
                key={event.id}
                className="p-1 rounded-md"
                style={{ backgroundColor: event.color }}
                onPress={() => router.push(`/schedule/update/${event.eventId}`)}
              >
                <Text className="px-3 tracking-wide font-medium text-base">
                  {event.title}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text className="ml-2 text-lg text-gray-800 tracking-wide">
              予定がありません
            </Text>
          )}
        </View>
      </View>

      <Timeline
        date={date}
        events={timeEvents}
        showNowIndicator={true}
        scrollToNow={true}
        format24h={true}
        overlapEventsSpacing={8}
        timelineLeftInset={TIME_LINE_LEFT_INSET}
        rightEdgeSpacing={TIME_LINE_RIGHT_INSET}
        theme={{
          event: {
            paddingLeft: 12,
            paddingTop: 8,
            paddingBottom: 8,
            borderRadius: 4,
          },
          eventTitle: {
            fontSize: 16,
            fontWeight: 'bold',
          },
          eventSummary: {
            display: 'none',
          },
          eventTimes: {
            marginTop: 8,
            fontSize: 14,
          },
          timeLabel: {
            fontSize: 12,
            color: colors.gray[600],
            letterSpacing: 0.2,
          },
          line: {
            color: colors.red[500],
          },
        }}
        onEventPress={(event) => {
          router.push(`/schedule/update/${event.id}`);
        }}
      />
    </>
  );
}
