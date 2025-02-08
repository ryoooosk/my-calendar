import { AuthContext } from '@/hooks/auth';
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
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: 'ホーム' }}
      />
      <Stack.Screen name="mypage" options={{ title: 'マイページ' }} />
      <Stack.Screen
        name="create-schedule"
        options={{
          title: '新しい予定',
          headerBackTitle: 'キャンセル',
        }}
      />
    </Stack>
  );
}
