import { Button, ButtonIcon } from '@/components/ui/button';
import { DateProvider } from '@/contexts/DateContext';
import { Stack, router } from 'expo-router';
import { PlusIcon } from 'lucide-react-native';
import { View } from 'react-native';

export default function CalendarLayout() {
  const handleClick = () => {
    router.push('/schedule/create');
  };

  return (
    <DateProvider>
      <View className="relative flex-1">
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

        <Button
          className="absolute right-5 bottom-12 w-16 h-16 rounded-full"
          onPress={handleClick}
        >
          <ButtonIcon className="w-11 h-11" as={PlusIcon} />
        </Button>
      </View>
    </DateProvider>
  );
}
