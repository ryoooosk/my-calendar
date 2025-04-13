import { SCHEDULE_DEFAULT_SELECTED_COLOR } from '@/constants/ScheduleColors';
import { InsertSchedules, Schedules } from '@/database.types';
import { supabase } from '@/lib/supabase';
import * as Calendar from 'expo-calendar';
import { Alert } from 'react-native';
import { ScheduleEntity } from '../model/useScheduleState';

export function useScheduleRepository() {
  async function findManySchedule(
    userId: string,
    calendarId: ScheduleEntity['calendarId'],
    startDate: Date,
    endDate: Date,
  ): Promise<ScheduleEntity[]> {
    try {
      const entities: ScheduleEntity[] = await Promise.all([
        Calendar.getEventsAsync([calendarId], startDate, endDate),
        supabase
          .from('schedules')
          .select('event_id,id,color')
          .eq('user_id', userId),
      ]).then(([events, schedules]) => {
        const entities = events.map((event) =>
          convertEventToEntity(event, userId),
        );
        if (!schedules.data) return entities;

        const result = mergeScheduleToEntity(schedules.data, entities);
        return result;
      });

      return entities;
    } catch (error) {
      console.error('Error fetching events:', error);
      Alert.alert('スケジュールの取得に失敗しました');
      throw error;
    }
  }

  async function createSchedule(
    calendarId: ScheduleEntity['calendarId'],
    entity: Omit<ScheduleEntity, 'id' | 'eventId'>,
  ): Promise<
    Omit<ScheduleEntity, 'id' | 'eventId'> & { id: number; eventId: string }
  > {
    try {
      const event: Omit<Calendar.Event, 'id' | 'eventId'> =
        convertEntityToEvent(entity);
      const eventId = await Calendar.createEventAsync(calendarId, event);
      const { data, error } = await supabase
        .from('schedules')
        .insert(convertEntityToSchedule({ ...entity, eventId }))
        .select('id,color')
        .single();
      if (!data?.id || error)
        throw new Error('Failed to create schedule in database');

      const result = { ...entity, id: data.id, eventId, color: data.color };
      return result;
    } catch (error) {
      console.error('Error creating event:', error);
      Alert.alert('スケジュールの作成に失敗しました');
      throw error;
    }
  }

  async function updateSchedule(
    entity: ScheduleEntity,
    recurringEventOptions?: Calendar.RecurringEventOptions,
  ): Promise<ScheduleEntity> {
    if (!entity.eventId || !entity.id)
      throw new Error(
        'Event ID and Schedule ID are required to update schedule',
      );

    try {
      const event = convertEntityToEvent(entity);
      const eventId = await Calendar.updateEventAsync(
        entity.eventId,
        event,
        recurringEventOptions,
      );

      const schedule = convertEntityToSchedule(entity);
      const { data, error } = await supabase
        .from('schedules')
        .update(schedule)
        .eq('event_id', entity.eventId)
        .select('id,color')
        .single();
      if (!data?.id || error) throw error;

      const result = { ...entity, color: data.color };
      return result;
    } catch (error) {
      console.error('Error updating event:', error);
      Alert.alert('スケジュールの更新に失敗しました');
      throw error;
    }
  }

  async function deleteSchedule(
    eventId: string,
    option?: Calendar.RecurringEventOptions,
  ): Promise<void> {
    try {
      await Calendar.deleteEventAsync(eventId, option);
      await supabase.from('schedules').delete().eq('event_id', eventId);
      return;
    } catch (error) {
      console.error('Error deleting event:', error);
      Alert.alert('スケジュールの削除に失敗しました');
      throw error;
    }
  }

  return {
    findManySchedule,
    createSchedule,
    updateSchedule,
    deleteSchedule,
  };
}

function convertEventToEntity(
  event: Calendar.Event,
  userId: string,
): ScheduleEntity {
  const entity: ScheduleEntity = {
    eventId: event.id,
    userId,
    calendarId: event.calendarId,
    title: event.title,
    description: event.notes,
    startAt: event.startDate.toLocaleString(),
    endAt: event.endDate.toLocaleString(),
    isAllDay: event.allDay,
    color: SCHEDULE_DEFAULT_SELECTED_COLOR,
    reminderOffset: event.alarms?.[0]?.relativeOffset
      ? Math.abs(event.alarms[0].relativeOffset)
      : undefined,
  };

  return entity;
}

function convertEntityToSchedule(entity: ScheduleEntity): InsertSchedules {
  if (!entity.eventId)
    throw new Error('Event ID is required to convert entity to schedule');

  const schedule: InsertSchedules = {
    event_id: entity.eventId,
    user_id: entity.userId,
    title: entity.title,
    notes: entity.description,
    start_date: new Date(entity.startAt).toISOString(),
    end_date: new Date(entity.endAt).toISOString(),
    is_all_day: entity.isAllDay,
    color: entity.color,
  };

  return schedule;
}

function mergeScheduleToEntity(
  schedules: Partial<Schedules>[],
  entities: ScheduleEntity[],
): ScheduleEntity[] {
  return entities.map((entity) => {
    const targetSchedule = schedules.find(
      (schedule) => schedule?.event_id === entity.eventId,
    );

    const newEntity = {
      ...entity,
      id: targetSchedule?.id,
      color: targetSchedule?.color ?? SCHEDULE_DEFAULT_SELECTED_COLOR,
    };
    return newEntity;
  });
}

function convertEntityToEvent(
  entity: ScheduleEntity,
): Omit<Calendar.Event, 'id'> & { id?: string } {
  return {
    id: entity.eventId,
    calendarId: entity.calendarId,
    title: entity.title,
    notes: entity.description ?? '',
    startDate: new Date(entity.startAt),
    endDate: new Date(entity.endAt),
    allDay: entity.isAllDay,
    location: '',
    timeZone: 'Asia/Tokyo',
    recurrenceRule: null,
    alarms: [
      {
        relativeOffset: entity.reminderOffset
          ? -entity.reminderOffset
          : undefined,
      },
    ],
    availability: Calendar.Availability.NOT_SUPPORTED,
    status: Calendar.EventStatus.NONE,
  };
}
