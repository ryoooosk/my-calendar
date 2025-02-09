import { DateProvider } from '@/hooks/selectedDate';
import { Stack } from 'expo-router';

export default function CalendarLayout() {
  return (
    <DateProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false, title: 'ホーム' }}
        />
        <Stack.Screen name="schedules" options={{ title: '予定' }} />
        <Stack.Screen
          name="create-schedule"
          options={{ title: '新しい予定' }}
        />
      </Stack>
    </DateProvider>
  );
}
