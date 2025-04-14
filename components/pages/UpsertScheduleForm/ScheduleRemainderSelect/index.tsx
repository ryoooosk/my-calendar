import { Icon } from '@/components/ui/icon';
import {
  Menu,
  MenuItem,
  MenuItemLabel,
  MenuSeparator,
} from '@/components/ui/menu';
import { Text } from '@/components/ui/text';
import { ScheduleEntity } from '@/hooks/model/useScheduleState';
import { convertMinuteToDuration } from '@/utils/convertMinuteToDuration';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Bell, ChevronsUpDown } from 'lucide-react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';

dayjs.extend(duration);

export default function ScheduleRemainderSelect({
  reminderOffset,
  setRemainderOffset,
}: {
  reminderOffset: ScheduleEntity['reminderOffset'];
  setRemainderOffset: React.Dispatch<React.SetStateAction<number | undefined>>;
}) {
  const defaultOffsetMinutes = [30, 60, 1440, 10080];

  return (
    <View className="flex flex-row items-center gap-6 px-4 py-1">
      <Icon size="xl" as={Bell} />

      <Menu
        offset={5}
        selectionMode="single"
        placement="bottom right"
        className="rounded-xl p-0"
        trigger={({ ...triggerProps }) => {
          return (
            <TouchableOpacity
              {...triggerProps}
              className="flex-1 flex flex-row justify-between items-center px-3 py-3"
            >
              {reminderOffset ? (
                <Text className="text-xl tracking-wider">
                  {convertMinuteToDuration(reminderOffset)}前
                </Text>
              ) : (
                <Text className="text-lg text-gray-500 tracking-wide">
                  通知を追加する
                </Text>
              )}
              <Icon size="lg" as={ChevronsUpDown} />
            </TouchableOpacity>
          );
        }}
      >
        <MenuItem
          className="bg-gray-50 dark:bg-stone-900 mb-3 rounded-t-xl rounded-b-none"
          textValue="なし"
          onPress={() => setRemainderOffset(undefined)}
        >
          <MenuItemLabel className="text-lg text-gray-700 dark:text-gray-100">
            なし
          </MenuItemLabel>
        </MenuItem>
        {defaultOffsetMinutes.map((offset, index) => (
          <React.Fragment key={offset}>
            <MenuItem
              key={offset}
              textValue={`${convertMinuteToDuration(offset)}前`}
              className={`bg-gray-50 dark:bg-stone-900 rounded-none ${index === defaultOffsetMinutes.length - 1 && 'rounded-b-xl'}`}
              onPress={() => setRemainderOffset(offset)}
            >
              <MenuItemLabel className="text-lg text-gray-700 dark:text-gray-100">
                {convertMinuteToDuration(offset)}前
              </MenuItemLabel>
            </MenuItem>
            {index !== defaultOffsetMinutes.length - 1 && <MenuSeparator />}
          </React.Fragment>
        ))}
      </Menu>
    </View>
  );
}
