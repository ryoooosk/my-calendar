import { AuthContext } from '@/contexts/AuthContext';
import { DateProvider } from '@/contexts/DateContext';
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
          <DateProvider>
            <Stack>
              <Stack.Screen
                name="(calendar)"
                options={{ headerShown: false, title: 'ホーム' }}
              />
              <Stack.Screen
                name="schedule/create"
                options={{ title: '新しい予定' }}
              />
              <Stack.Screen
                name="schedule/update/[scheduleId]"
                options={{ title: '予定を編集' }}
              />
              <Stack.Screen
                name="mypage/index"
                options={{ title: 'マイページ' }}
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
          </DateProvider>
        </ScheduleProvider>
      ) : (
        <LoadingScreen />
      )}
    </NotificationSubscriptionProvider>
  );
}
