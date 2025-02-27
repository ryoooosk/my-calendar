import { Divider } from '@/components/Divider';
import dayjs from 'dayjs';
import { View } from 'react-native';
import DateTimeSelect from './DateTimeSelect';
import ScheduleDescriptionInput from './ScheduleDescriptionInput';
import ScheduleRemainderSelect from './ScheduleRemainderSelect';
import ScheduleTitleInput from './ScheduleTitleInput';
import SelectScheduleColorContainer from './SelectScheduleColor';

type UpsertScheduleFormContainerPresenterProps = {
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
  remainderOffset: number | null;
  setRemainderOffset: (offset: number | null) => void;
  description: string;
  setDescription: (description: string) => void;
};

export default function UpsertScheduleFormContainerPresenter({
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
  remainderOffset,
  setRemainderOffset,
  description,
  setDescription,
}: UpsertScheduleFormContainerPresenterProps) {
  return (
    <View className="flex-1">
      <ScheduleTitleInput title={title} setTitle={setTitle} />
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
        remainderOffset={remainderOffset}
        setRemainderOffset={setRemainderOffset}
      />
      <ScheduleDescriptionInput
        description={description}
        setDescription={setDescription}
      />
    </View>
  );
}
