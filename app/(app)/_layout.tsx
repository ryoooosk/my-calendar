import { AuthContext } from '@/hooks/auth';
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
      <Stack.Screen name="mypage" options={{ title: 'マイページ' }} />
    </Stack>
  );
}
