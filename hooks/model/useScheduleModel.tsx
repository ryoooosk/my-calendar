import { Schedules } from '@/database.types';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useScheduleRepository } from '../repository/useScheduleRepository';

export const useScheduleModel = () => {
  const { user } = useContext(AuthContext);
  const { fetchSchedules, deleteSchedule } = useScheduleRepository();
  const [schedules, setSchedules] = useState<Schedules[] | null>(null);

  useEffect(() => {
    if (!user) return;

    fetchSchedules(user.id).then((schedules) => {
      setSchedules(schedules);
    });
  }, [user]);

  return { schedules, deleteSchedule };
};
