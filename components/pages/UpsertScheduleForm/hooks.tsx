import { SCHEDULE_DEFAULT_SELECTED_COLOR } from '@/constants/ScheduleColors';
import { Users } from '@/database.types';
import { ScheduleEntity } from '@/hooks/model/useScheduleModel';
import { useSchedulesViewModel } from '@/hooks/view-model/useScheduleViewModel';
import { roundedDateInFiveMinute } from '@/utils/date.logic';
import dayjs from 'dayjs';
import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

export const useUpsertScheduleForm = (
  selectedSchedule: ScheduleEntity | null,
  user: Users,
) => {
  const { handleUpsertSchedule } = useSchedulesViewModel();
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
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!selectedSchedule) return;
    setId(selectedSchedule.id);
    setTitle(selectedSchedule.title);
    setStartDate(dayjs(selectedSchedule.startAt));
    setEndDate(dayjs(selectedSchedule.endAt));
    setIsAllDay(selectedSchedule.isAllDay);
    setDescription(selectedSchedule.description ?? '');
    setColor(selectedSchedule.color);
    setReminderId(selectedSchedule.reminderIds?.[0]);
    setReminderIdentifier(selectedSchedule.reminderIdentifier?.[0]);
    setReminderOffset(selectedSchedule.reminderOffset?.[0] ?? null);
  }, [selectedSchedule]);

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

    await handleUpsertSchedule(
      id,
      user.id,
      title,
      isAllDay,
      startDate,
      endDate,
      reminderId,
      reminderIdentifier,
      reminderOffset,
      color,
      description,
    );

    router.replace('/');
  }, [
    user,
    id,
    title,
    startDate,
    endDate,
    isAllDay,
    description,
    reminderOffset,
    color,
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
