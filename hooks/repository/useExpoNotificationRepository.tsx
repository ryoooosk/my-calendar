import { convertMinuteToDuration } from '@/utils/convertMinuteToDuration';
import * as Notifications from 'expo-notifications';
import { useCallback } from 'react';

export function useExpoNotificationRepository() {
  async function getAllScheduledNotifications() {
    const scheduledNotifications =
      await Notifications.getAllScheduledNotificationsAsync();
    console.log('Scheduled notifications:', scheduledNotifications);
    return scheduledNotifications;
  }

  const requestPermissions = useCallback(async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    return status;
  }, []);

  const scheduleNotification = useCallback(
    async (title: string, date: Date, offset?: number): Promise<string> => {
      const formattedOffset = offset ? convertMinuteToDuration(offset) : null;

      return await Notifications.scheduleNotificationAsync({
        content: {
          title: 'リマインダー',
          body: formattedOffset
            ? `${title}の${formattedOffset}前です`
            : `${title}の時間です 📅`,
          sound: 'default',
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: new Date(date),
        },
      });
    },
    [],
  );

  const forgroundSubscription =
    useCallback((): Notifications.EventSubscription => {
      return Notifications.addNotificationReceivedListener((notification) => {
        // console.log('フォアグラウンドで通知を受信:', notification);
      });
    }, []);

  const backgroundSubscription =
    useCallback((): Notifications.EventSubscription => {
      return Notifications.addNotificationResponseReceivedListener(
        (response) => {
          // console.log('通知をタップ:', response);
        },
      );
    }, []);

  const cancelScheduleNotification = useCallback(
    async (notificationId: string) =>
      await Notifications.cancelScheduledNotificationAsync(notificationId),
    [],
  );

  return {
    getAllScheduledNotifications,
    requestPermissions,
    scheduleNotification,
    forgroundSubscription,
    backgroundSubscription,
    cancelScheduleNotification,
  };
}
