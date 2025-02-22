import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import { DateType } from 'react-native-ui-datepicker';

type UseDateTimeSelectProps = {
  startDate: dayjs.Dayjs;
  setStartDate: (date: dayjs.Dayjs) => void;
  endDate: dayjs.Dayjs;
  setEndDate: (date: dayjs.Dayjs) => void;
  isAllDay: boolean;
  setIsAllDay: (isAllDay: boolean) => void;
};

export const useDateTimeSelect = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  isAllDay,
  setIsAllDay,
}: UseDateTimeSelectProps) => {
  const [isOpenStartDay, setIsOpenStartDay] = useState(false);
  const [isOpenEndDay, setIsOpenEndDay] = useState(false);
  const [isOpenStartTime, setIsOpenStartTime] = useState(false);
  const [isOpenEndTime, setIsOpenEndTime] = useState(false);

  const closeAllDatePicker = useCallback(() => {
    setIsOpenStartDay(false);
    setIsOpenEndDay(false);
    setIsOpenStartTime(false);
    setIsOpenEndTime(false);
  }, []);

  const handlePressDatePicker = useCallback(
    (type: 'StartDay' | 'StartTime' | 'EndDay' | 'EndTine') => {
      closeAllDatePicker();

      switch (type) {
        case 'StartDay':
          setIsOpenStartDay(true);
          break;
        case 'StartTime':
          setIsOpenStartTime(true);
          break;
        case 'EndDay':
          setIsOpenEndDay(true);
          break;
        case 'EndTine':
          setIsOpenEndTime(true);
          break;

        default:
          throw new Error('Invalid type');
      }
    },
    [closeAllDatePicker],
  );

  const handleChangeDay = (params: { date: DateType }) => {
    const date = dayjs(params.date);

    if (isOpenStartDay) {
      const newDate = startDate
        .set('year', date.year())
        .set('month', date.month())
        .set('date', date.date());
      return setStartDate(newDate);
    }
    if (isOpenEndDay) {
      const newDate = endDate
        .set('year', date.year())
        .set('month', date.month())
        .set('date', date.date());
      return setEndDate(newDate);
    }
  };

  const handleChangeTime = (date: Date) => {
    const newDate = dayjs(date);

    if (isOpenStartTime) {
      const updatedDate = startDate
        .set('hour', newDate.hour())
        .set('minute', newDate.minute());
      return setStartDate(updatedDate);
    }
    if (isOpenEndTime) {
      const updatedDate = endDate
        .set('hour', newDate.hour())
        .set('minute', newDate.minute());
      return setEndDate(updatedDate);
    }
  };

  const handleSetIsAllDay = () => {
    setIsAllDay(!isAllDay);
    closeAllDatePicker();
  };

  return {
    isOpenStartDay,
    isOpenEndDay,
    isOpenStartTime,
    isOpenEndTime,
    closeAllDatePicker,
    handlePressDatePicker,
    handleChangeDay,
    handleChangeTime,
    handleSetIsAllDay,
  };
};
