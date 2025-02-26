import { useNotificationRepository } from '@/hooks/repository/useNotificationRepository';
import * as Notifications from 'expo-notifications';
import { ReactNode, createContext, useEffect, useState } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, // 通知をポップアップ表示
    shouldPlaySound: true, // 通知音を鳴らす
    shouldSetBadge: false, // バッジを変更しない
  }),
});

export const NotificationSubscriptionContext = createContext<{
  permission: Notifications.PermissionStatus | undefined;
}>({ permission: undefined });

export const NotificationSubscriptionProvider = ({
  children,
}: { children: ReactNode }) => {
  const [permission, setPermission] = useState<Notifications.PermissionStatus>(
    Notifications.PermissionStatus.UNDETERMINED,
  );
  const { requestPermissions, forgroundSubscription, backgroundSubscription } =
    useNotificationRepository();

  useEffect(() => {
    const requestPermission = async () => {
      const permission = await requestPermissions();
      setPermission(permission);
    };
    requestPermission();
  }, []);

  useEffect(() => {
    if (permission !== Notifications.PermissionStatus.GRANTED) return;

    const fsubscription = forgroundSubscription();
    const backSubscriotion = backgroundSubscription();

    return () => {
      fsubscription.remove();
      backSubscriotion.remove();
    };
  }, [permission]);

  return (
    <NotificationSubscriptionContext.Provider value={{ permission }}>
      {children}
    </NotificationSubscriptionContext.Provider>
  );
};
