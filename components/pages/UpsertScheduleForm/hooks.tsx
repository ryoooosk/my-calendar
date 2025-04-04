import { SCHEDULE_DEFAULT_SELECTED_COLOR } from '@/constants/ScheduleColors';
import { ScheduleContext } from '@/contexts/ScheduleContext';
import { Users } from '@/database.types';
import { ScheduleEntity } from '@/hooks/model/useScheduleState';
import { roundedDateInFiveMinute } from '@/utils/date.logic';
import dayjs from 'dayjs';
import { router } from 'expo-router';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

export const useUpsertScheduleForm = (
  selectedSchedule: ScheduleEntity | null,
  user: Users,
  selectedDate: string | undefined,
) => {
  const { calendarId, upsertScheduleAction } = useContext(ScheduleContext);
  const [eventId, setEventId] = useState<ScheduleEntity['eventId']>(undefined);
  const [title, setTitle] = useState<ScheduleEntity['title']>('');
  const [startDate, setStartDate] = useState<dayjs.Dayjs>(
    roundedDateInFiveMinute(dayjs()),
  );
  const [endDate, setEndDate] = useState<dayjs.Dayjs>(
    roundedDateInFiveMinute(dayjs().add(1, 'hour')),
  );
  const [isAllDay, setIsAllDay] = useState<ScheduleEntity['isAllDay']>(false);
  const [color, setColor] = useState<ScheduleEntity['color']>(
    SCHEDULE_DEFAULT_SELECTED_COLOR,
  );
  const [reminderOffset, setReminderOffset] =
    useState<ScheduleEntity['reminderOffset']>(null);
  const [description, setDescription] =
    useState<ScheduleEntity['description']>(null);

  useEffect(() => {
    if (!selectedSchedule) return;
    setEventId(selectedSchedule.eventId);
    setTitle(selectedSchedule.title);
    setStartDate(dayjs(selectedSchedule.startAt));
    setEndDate(dayjs(selectedSchedule.endAt));
    setIsAllDay(selectedSchedule.isAllDay);
    setDescription(selectedSchedule.description ?? '');
    setColor(selectedSchedule.color);
    setReminderOffset(selectedSchedule.reminderOffset ?? null);
  }, [selectedSchedule]);

  useEffect(() => {
    if (!selectedDate) return;
    if (selectedSchedule) throw new Error('invalid selectedSchedule');

    const selectedDayjs = dayjs(selectedDate);
    setStartDate((prev) => prev.set('date', selectedDayjs.date()));
    setEndDate((prev) => prev.set('date', selectedDayjs.date()));
  }, [selectedDate]);

  const handleSubmit = useCallback(async () => {
    if (endDate.isBefore(startDate)) {
      return Alert.alert('終了日時は開始日時より後に設定してください');
    }

    const isReminderBeforeNow =
      reminderOffset &&
      dayjs(startDate).subtract(reminderOffset, 'minute').isBefore(dayjs());
    if (isReminderBeforeNow) {
      return Alert.alert('リマインダーは現在時刻より後に設定してください');
    }

    try {
      if (!calendarId) throw new Error('calendarId is null');

      const entity: ScheduleEntity = {
        id: selectedSchedule?.id,
        eventId,
        user_id: user.id,
        calendarId,
        title,
        description,
        startAt: startDate.toISOString(),
        endAt: endDate.toISOString(),
        isAllDay,
        color,
        reminderOffset,
      };
      await upsertScheduleAction(calendarId, entity);
      router.replace('/');
    } catch (e) {
      console.error(e);
      Alert.alert('スケジュールの登録に失敗しました');
    }
  }, [
    user,
    eventId,
    title,
    startDate,
    endDate,
    isAllDay,
    description,
    reminderOffset,
    color,
    upsertScheduleAction,
  ]);

  return {
    eventId,
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
    handleSubmit,
  };
};
