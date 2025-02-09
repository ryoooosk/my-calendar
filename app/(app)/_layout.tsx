import { AuthContext } from '@/hooks/auth';
import { DateProvider } from '@/hooks/selectedDate';
import { Redirect, Stack } from 'expo-router';
import { useContext } from 'react';
import { Text } from 'react-native';

export default function AppLayout() {
  const { session, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <DateProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false, title: 'ホーム' }}
        />
        <Stack.Screen name="schedules" options={{ title: '予定' }} />
        <Stack.Screen name="mypage" options={{ title: 'マイページ' }} />
        <Stack.Screen
          name="create-schedule"
          options={{
            title: '新しい予定',
            headerBackTitle: 'キャンセル',
          }}
        />
      </Stack>
    </DateProvider>
  );
}
