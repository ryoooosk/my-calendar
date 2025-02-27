import { Icon } from '@/components/ui/icon';
import {
  Menu,
  MenuItem,
  MenuItemLabel,
  MenuSeparator,
} from '@/components/ui/menu';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Bell, ChevronsUpDown } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';

dayjs.extend(duration);

export default function ScheduleRemainderSelect({
  remainderOffset,
  setRemainderOffset,
}: {
  remainderOffset: number | null;
  setRemainderOffset: (offset: number | null) => void;
}) {
  const defaultOffsetMinutes = [30, 60, 1440, 10080];
  const formatOffset = (offset: number) => {
    const dur = dayjs.duration(offset, 'minutes');
    if (dur.asWeeks() >= 1) return `${dur.asWeeks()}週間前`;
    if (dur.asDays() >= 1) return `${dur.asDays()}日前`;
    return `${offset}分前`;
  };

  return (
    <View className="flex flex-row items-center gap-6 px-4 py-1 bg-white">
      <Icon size="xl" as={Bell} />

      <Menu
        offset={5}
        selectionMode="single"
        placement="bottom right"
        className="border-slate-200 rounded-xl bg-gray-100 p-0"
        trigger={({ ...triggerProps }) => {
          return (
            <TouchableOpacity
              {...triggerProps}
              className="flex-1 flex flex-row justify-between items-center px-3 py-3"
            >
              {remainderOffset ? (
                <Text className="text-xl text-gray-800 tracking-wider">
                  {formatOffset(remainderOffset)}
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
          className="mb-3 bg-white rounded-t-xl"
          textValue="なし"
          onPress={() => setRemainderOffset(null)}
        >
          <MenuItemLabel className="text-lg">なし</MenuItemLabel>
        </MenuItem>
        {defaultOffsetMinutes.map((offset, index) => (
          <React.Fragment key={offset}>
            <MenuItem
              key={offset}
              textValue={formatOffset(offset)}
              className={`bg-white ${index === defaultOffsetMinutes.length - 1 && 'rounded-b-xl'}`}
              onPress={() => setRemainderOffset(offset)}
            >
              <MenuItemLabel className="text-lg">
                {formatOffset(offset)}
              </MenuItemLabel>
            </MenuItem>
            {index !== defaultOffsetMinutes.length - 1 && <MenuSeparator />}
          </React.Fragment>
        ))}
      </Menu>
    </View>
  );
}
