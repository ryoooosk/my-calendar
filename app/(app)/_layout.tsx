import { AuthContext } from '@/contexts/AuthContext';
import { CurrentDateProvider } from '@/contexts/CurrentDateContext';
import { NotificationSubscriptionProvider } from '@/contexts/NotificationSubscriptionContext';
import { ScheduleProvider } from '@/contexts/ScheduleContext';
import { Redirect, Stack } from 'expo-router';
import { useContext } from 'react';
import LoadingScreen from '../loading-screen';

export default function AppLayout() {
  const { session, isLoading } = useContext(AuthContext);

  if (!session && !isLoading) return <Redirect href="/login" />;
  return (
    <NotificationSubscriptionProvider>
      {session ? (
        <ScheduleProvider>
          <CurrentDateProvider>
            <Stack>
              <Stack.Screen
                name="(calendar)"
                options={{
                  headerShown: false,
                  title: 'ホーム',
                }}
              />
              <Stack.Screen
                name="schedule/create"
                options={{ title: '新しい予定', headerBackTitle: '戻る' }}
              />
              <Stack.Screen
                name="schedule/update/[scheduleId]"
                options={{ title: '予定を編集', headerBackTitle: '戻る' }}
              />
              <Stack.Screen
                name="mypage/index"
                options={{ title: 'マイページ', headerBackTitle: '戻る' }}
              />
              <Stack.Screen
                name="mypage/edit"
                options={{
                  presentation: 'modal',
                  title: 'プロフィール編集',
                  headerBackTitle: 'キャンセル',
                }}
              />
            </Stack>
          </CurrentDateProvider>
        </ScheduleProvider>
      ) : (
        <LoadingScreen />
      )}
    </NotificationSubscriptionProvider>
  );
}
