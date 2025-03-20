import { SCHEDULE_DEFAULT_SELECTED_COLOR } from '@/constants/ScheduleColors';
import { ScheduleContext } from '@/contexts/ScheduleContext';
import { Users } from '@/database.types';
import { ScheduleEntity } from '@/hooks/model/useScheduleActions';
import { roundedDateInFiveMinute } from '@/utils/date.logic';
import dayjs from 'dayjs';
import { router } from 'expo-router';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

export const useUpsertScheduleForm = (
  selectedSchedule: ScheduleEntity | null,
  user: Users,
  selectedDate: string | null,
) => {
  const { upsertSchedule } = useContext(ScheduleContext);
  const [id, setId] = useState<number | undefined>(undefined);
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(roundedDateInFiveMinute(dayjs()));
  const [endDate, setEndDate] = useState(
    roundedDateInFiveMinute(dayjs().add(1, 'hour')),
  );
  const [isAllDay, setIsAllDay] = useState(false);
  const [color, setColor] = useState<string>(SCHEDULE_DEFAULT_SELECTED_COLOR);
  const [reminderId, setReminderId] = useState<number | undefined>(undefined);
  const [reminderIdentifier, setReminderIdentifier] = useState<
    string | undefined
  >(undefined);
  const [reminderOffset, setReminderOffset] = useState<number | null>(null);
  const [description, setDescription] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedSchedule) return;
    setId(selectedSchedule.id);
    setTitle(selectedSchedule.title);
    setStartDate(dayjs(selectedSchedule.startAt));
    setEndDate(dayjs(selectedSchedule.endAt));
    setIsAllDay(selectedSchedule.isAllDay);
    setDescription(selectedSchedule.description ?? '');
    setColor(selectedSchedule.color);
    setReminderId(selectedSchedule.reminderId);
    setReminderIdentifier(selectedSchedule.reminderIdentifier);
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
      const entity: ScheduleEntity = {
        id,
        userId: user.id,
        title,
        startAt: !isAllDay
          ? startDate.toDate().toISOString()
          : startDate.startOf('day').toDate().toISOString(),
        endAt: !isAllDay
          ? endDate.toDate().toISOString()
          : endDate.endOf('day').toDate().toISOString(),
        isAllDay,
        reminderId,
        reminderIdentifier,
        reminderOffset,
        color,
        description,
        isPublic: true,
      };
      await upsertSchedule(entity);
      router.replace('/');
    } catch (e) {
      console.error(e);
      Alert.alert('スケジュールの登録に失敗しました');
    }
  }, [
    user,
    id,
    title,
    startDate,
    endDate,
    isAllDay,
    description,
    reminderId,
    reminderIdentifier,
    reminderOffset,
    color,
    upsertSchedule,
  ]);

  return {
    id,
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
