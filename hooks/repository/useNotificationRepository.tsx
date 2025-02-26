import * as Notifications from 'expo-notifications';
import { useCallback } from 'react';

export function useNotificationRepository() {
  const requestPermissions = useCallback(async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    return status;
  }, []);

  const scheduleNotification = useCallback(
    async (date: Date): Promise<string> => {
      return await Notifications.scheduleNotificationAsync({
        content: {
          title: 'リマインダー',
          body: `${date}の通知です 📅`,
          sound: 'default',
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date,
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
    requestPermissions,
    scheduleNotification,
    forgroundSubscription,
    backgroundSubscription,
    cancelScheduleNotification,
  };
}
