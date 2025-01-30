import dayjs from 'dayjs';

export const roundedDateInFiveMinute = (date: dayjs.Dayjs) => {
  return date.minute(Math.floor(date.minute() / 5) * 5);
};
