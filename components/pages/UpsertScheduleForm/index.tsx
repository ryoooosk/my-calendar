import { Users } from '@/database.types';

import { ScheduleEntity } from '@/hooks/model/useScheduleState';
import dayjs, { Dayjs } from 'dayjs';
import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useUpsertScheduleForm } from './hooks';
import UpsertScheduleFormContainerPresenter from './presenter';

export default function UpsertScheduleFormContainer({
  user,
  selectedDate,
  selectedSchedule,
}: {
  user: Users;
  selectedDate: string | null;
  selectedSchedule: ScheduleEntity | null;
}) {
  const navigation = useNavigation();

  const {
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
  } = useUpsertScheduleForm(selectedSchedule, user, selectedDate);
  const [isOpenScheduleHistory, setIsOpenScheduleHistory] = useState(false);
  const applyTemplateSchedule = (schedule: ScheduleEntity) => {
    setTitle(schedule.title);
    setStartDate((prev: Dayjs) =>
      prev
        .set('hour', dayjs(schedule.startAt).hour())
        .set('minute', dayjs(schedule.startAt).minute()),
    );
    setEndDate((prev: Dayjs) =>
      prev
        .set('hour', dayjs(schedule.endAt).hour())
        .set('minute', dayjs(schedule.endAt).minute()),
    );
    setIsAllDay(schedule.isAllDay);
    setColor(schedule.color);
    setReminderOffset(schedule.reminderOffset ?? null);
    setDescription(schedule.description);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSubmit}>
          <Text className="text-xl font-medium text-sky-600 tracking-wide">
            {id ? '更新' : '作成'}
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, handleSubmit, id]);

  return (
    <>
      <UpsertScheduleFormContainerPresenter
        {...{
          isNew: !id,
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
          handleOpenScheduleHistory: (isOpen: boolean) =>
            setIsOpenScheduleHistory(isOpen),
          applyTemplateSchedule,
        }}
      />
    </>
  );
}
