import { Divider } from '@/components/Divider';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { ScheduleEntity } from '@/hooks/model/useScheduleState';
import dayjs from 'dayjs';
import { HistoryIcon } from 'lucide-react-native';
import { Modal, TouchableOpacity, View } from 'react-native';
import ScheduleHistory from '../ScheduleHistory';
import DateTimeSelect from './DateTimeSelect';
import ScheduleDescriptionInput from './ScheduleDescriptionInput';
import ScheduleRemainderSelect from './ScheduleRemainderSelect';
import ScheduleTitleInput from './ScheduleTitleInput';
import SelectScheduleColorContainer from './SelectScheduleColor';

type UpsertScheduleFormContainerPresenterProps = {
  isNew: boolean;
  title: string;
  setTitle: (title: string) => void;
  startDate: dayjs.Dayjs;
  setStartDate: (date: dayjs.Dayjs) => void;
  endDate: dayjs.Dayjs;
  setEndDate: (date: dayjs.Dayjs) => void;
  isAllDay: boolean;
  setIsAllDay: (isAllDay: boolean) => void;
  color: string;
  setColor: (color: string) => void;
  reminderOffset: ScheduleEntity['reminderOffset'];
  setReminderOffset: React.Dispatch<React.SetStateAction<number | undefined>>;
  description: string | null;
  setDescription: (description: string) => void;
  isOpenScheduleHistory: boolean;
  handleOpenScheduleHistory: (isOpen: boolean) => void;
  applyTemplateSchedule: (schedule: ScheduleEntity) => void;
};

export default function UpsertScheduleFormContainerPresenter({
  isNew,
  title,
  setTitle,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  isAllDay,
  setIsAllDay,
  color,
  setColor,
  reminderOffset,
  setReminderOffset,
  description,
  setDescription,
  isOpenScheduleHistory,
  handleOpenScheduleHistory,
  applyTemplateSchedule,
}: UpsertScheduleFormContainerPresenterProps) {
  const selectTemplateSchedule = (schedule: ScheduleEntity) => {
    applyTemplateSchedule(schedule);
    handleOpenScheduleHistory(false);
  };

  return (
    <>
      <View className="flex-1">
        <View className="flex flex-row items-center justify-between px-4 py-2">
          <ScheduleTitleInput title={title} setTitle={setTitle} />
          {isNew && (
            <TouchableOpacity
              className="flex flex-col items-center justify-center p-1"
              onPress={() => handleOpenScheduleHistory(true)}
            >
              <Icon size="xl" as={HistoryIcon} />
              <Text className="text-sm tracking-wide">履歴</Text>
            </TouchableOpacity>
          )}
        </View>
        <Divider />
        <DateTimeSelect
          startDate={startDate}
          endDate={endDate}
          isAllDay={isAllDay}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setIsAllDay={setIsAllDay}
        />
        <Divider />
        <SelectScheduleColorContainer
          selectedColor={color}
          setSelectedColor={setColor}
        />
        <Divider />
        <ScheduleRemainderSelect
          reminderOffset={reminderOffset}
          setRemainderOffset={setReminderOffset}
        />
        <ScheduleDescriptionInput
          description={description}
          setDescription={setDescription}
        />
      </View>

      <Modal
        visible={isOpenScheduleHistory}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View className="flex-1 p-4 gap-4 dark:bg-black">
          <View className="p-1">
            <TouchableOpacity onPress={() => handleOpenScheduleHistory(false)}>
              <Text className="text-lg text-sky-600">キャンセル</Text>
            </TouchableOpacity>
          </View>
          <ScheduleHistory selectSchedule={selectTemplateSchedule} />
        </View>
      </Modal>
    </>
  );
}
