import { Icon } from '@/components/ui/icon';
import { EditIcon } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { AgendaEntry } from 'react-native-calendars';

export default function ScheduleItem({
  schedule,
  isFirstInDay,
  handleSelectSchedule,
}: {
  schedule: AgendaEntry & {
    id: number;
    isAllDay: boolean;
    description: string;
  };
  isFirstInDay: boolean;
  handleSelectSchedule: (scheduleId: number) => void;
}) {
  return (
    <View
      className={`flex-1 flex flex-row items-center bg-white px-4 py-3 mr-5 mt-4 rounded-xl ${!isFirstInDay && 'ml-16'}`}
    >
      <View className="flex-1 flex gap-1">
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
      </View>

      <TouchableOpacity
        className="p-2"
        onPress={() => handleSelectSchedule(schedule.id)}
      >
        <Icon as={EditIcon} className="w-8 h-8" />
      </TouchableOpacity>
    </View>
  );
}
