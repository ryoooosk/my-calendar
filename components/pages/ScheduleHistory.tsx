import { Card } from '@/components/ui/card';
import { ScheduleContext } from '@/contexts/ScheduleContext';
import { ScheduleEntity } from '@/hooks/model/useScheduleState';
import dayjs from 'dayjs';
import { useContext } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';

export default function ScheduleHistory({
  selectSchedule,
}: { selectSchedule: (schedule: ScheduleEntity) => void }) {
  const { schedules } = useContext(ScheduleContext);

  return (
    <FlatList
      data={schedules}
      keyExtractor={(schedule) => schedule.eventId?.toString() ?? ''}
      renderItem={({ item: schedule }) => (
        <TouchableOpacity
          key={schedule.eventId}
          className="mb-3"
          onPress={() => selectSchedule(schedule)}
        >
          <Card variant="elevated">
            <Text className="text-lg font-medium tracking-wide">
              {schedule.title}
            </Text>
            <Text className="tracking-wide">
              {dayjs(schedule.startAt).format('HH:mm')} 〜
              {dayjs(schedule.endAt).format('HH:mm')}
            </Text>
          </Card>
        </TouchableOpacity>
      )}
    />
  );
}
