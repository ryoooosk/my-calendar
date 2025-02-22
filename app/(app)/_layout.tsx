import { AuthContext } from '@/contexts/AuthContext';
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
  );
}
