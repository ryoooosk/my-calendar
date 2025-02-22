import dayjs from 'dayjs';
import { useDateTimeSelect } from './hooks';
import DateTimeSelectPresenter from './presenter';

type DateTimeSelectProps = {
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  isAllDay: boolean;
  setStartDate: (date: dayjs.Dayjs) => void;
  setEndDate: (date: dayjs.Dayjs) => void;
  setIsAllDay: (isAllDay: boolean) => void;
};

export default function DateTimeSelect({
  startDate,
  endDate,
  isAllDay,
  setStartDate,
  setEndDate,
  setIsAllDay,
}: DateTimeSelectProps) {
  const {
    isOpenStartDay,
    isOpenEndDay,
    isOpenStartTime,
    isOpenEndTime,
    handlePressDatePicker,
    handleChangeDay,
    handleChangeTime,
    handleSetIsAllDay,
  } = useDateTimeSelect({
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    isAllDay,
    setIsAllDay,
  });

  return (
    <DateTimeSelectPresenter
      startDate={startDate}
      endDate={endDate}
      isAllDay={isAllDay}
      isOpenStartDay={isOpenStartDay}
      isOpenEndDay={isOpenEndDay}
      isOpenStartTime={isOpenStartTime}
      isOpenEndTime={isOpenEndTime}
      handlePressDatePicker={handlePressDatePicker}
      handleChangeDay={handleChangeDay}
      handleChangeTime={handleChangeTime}
      handleSetIsAllDay={handleSetIsAllDay}
    />
  );
}
