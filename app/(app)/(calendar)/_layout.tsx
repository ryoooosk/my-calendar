import { DateProvider } from '@/contexts/DateContext';
import { Stack } from 'expo-router';

export default function CalendarLayout() {
  return (
    <DateProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false, title: 'ホーム' }}
        />
        <Stack.Screen
          name="timeline/[date]"
          options={{ title: 'タイムライン' }}
        />
      </Stack>
    </DateProvider>
  );
}
