import { AuthContext } from '@/contexts/AuthContext';
import { NotificationSubscriptionProvider } from '@/contexts/NotificationSubscriptionContext';
import { ScheduleProvider } from '@/contexts/ScheduleContext';
import { Redirect, Stack } from 'expo-router';
import { useContext } from 'react';
import LoadingScreen from '../loading-screen';

export default function AppLayout() {
  const { session, isLoading } = useContext(AuthContext);

  if (isLoading && !session) {
    return <LoadingScreen />;
  }
  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <NotificationSubscriptionProvider>
      <ScheduleProvider>
        <Stack>
          <Stack.Screen
            name="(calendar)"
            options={{ headerShown: false, title: 'ホーム' }}
          />
          <Stack.Screen name="mypage/index" options={{ title: 'マイページ' }} />
          <Stack.Screen
            name="mypage/edit"
            options={{
              presentation: 'modal',
              title: 'プロフィール編集',
              headerBackTitle: 'キャンセル',
            }}
          />
        </Stack>
      </ScheduleProvider>
    </NotificationSubscriptionProvider>
  );
}
