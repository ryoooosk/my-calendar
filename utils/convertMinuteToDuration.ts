import dayjs from 'dayjs';

export const convertMinuteToDuration = (offset: number): string => {
  const dur = dayjs.duration(offset, 'minutes');

  if (dur.asWeeks() >= 1) return `${dur.asWeeks()}週間`;
  if (dur.asDays() >= 1) return `${dur.asDays()}日`;
  if (dur.asHours() >= 1) return `${dur.asHours()}時間`;
  return `${offset}分`;
};
