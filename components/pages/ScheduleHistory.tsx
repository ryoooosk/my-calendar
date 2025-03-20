import { Card } from '@/components/ui/card';
import { ScheduleContext } from '@/contexts/ScheduleContext';
import { ScheduleEntity } from '@/hooks/model/useScheduleActions';
import { useContext } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';

export default function ScheduleHistory({
  selectSchedule,
}: { selectSchedule: (schedule: ScheduleEntity) => void }) {
  const { schedules } = useContext(ScheduleContext);

  return (
    <FlatList
      data={schedules}
      keyExtractor={(schedule) => schedule.id?.toString() ?? ''}
      renderItem={({ item: schedule }) => (
        <TouchableOpacity
          key={schedule.id}
          className="mb-4"
          onPress={() => selectSchedule(schedule)}
        >
          <Card variant="outline">
            <Text className="text-base font-medium tracking-wide">
              {schedule.title}
            </Text>
          </Card>
        </TouchableOpacity>
      )}
    />
  );
}
