import { Text, TouchableOpacity } from 'react-native';
import { AgendaEntry } from 'react-native-calendars';

export default function ScheduleItem({
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
