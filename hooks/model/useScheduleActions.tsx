import { useScheduleRepository } from '../repository/useScheduleRepository';
import { ScheduleEntity } from './useScheduleState';

export function useScheduleActions(
  setSchedules: React.Dispatch<React.SetStateAction<ScheduleEntity[]>>,
) {
  const { createSchedule, updateSchedule, deleteSchedule } =
    useScheduleRepository();

  async function upsertScheduleAction(
    calendarId: string,
    entity: ScheduleEntity,
  ): Promise<ScheduleEntity> {
    if (!entity.id || !entity.eventId) {
      const createdEntity = await createSchedule(calendarId, entity);
      setSchedules((prev) => {
        return [
          ...prev,
          {
            ...entity,
            id: createdEntity.id,
            eventId: createdEntity.eventId,
          },
        ];
      });

      return createdEntity;
    }

    const updatedEntity = await updateSchedule(entity);
    setSchedules((prev) => {
      const newEntites = prev.map((entity) => {
        if (entity.eventId !== updatedEntity.eventId) return entity;

        return { ...entity, ...updatedEntity };
      });
      return newEntites;
    });

    return updatedEntity;
  }

  async function deleteScheduleAction(
    id: ScheduleEntity['id'],
    eventId: ScheduleEntity['eventId'],
  ): Promise<void> {
    await deleteSchedule(id, eventId);
    setSchedules((prev) => {
      const newEvents = prev.filter((e) => e.eventId !== eventId);
      return newEvents;
    });
  }

  return {
    upsertScheduleAction,
    deleteScheduleAction,
  };
}
