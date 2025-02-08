import { Button, ButtonIcon } from '@/components/ui/button';
import { router } from 'expo-router';
import { PlusIcon } from 'lucide-react-native';

import MyCalendarList from '@/components/my-calendar-list';
import dayjs from 'dayjs';
import { CalendarProvider } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomePage() {
  const handleClick = () => {
    router.push('/create-schedule');
  };

  return (
    <SafeAreaView className="flex-1 relative bg-white">
      <CalendarProvider date={dayjs().format('YYYY-MM-DD')}>
        <MyCalendarList />

        <Button
          className="absolute right-5 bottom-5 w-16 h-16 rounded-full"
          onPress={handleClick}
        >
          <ButtonIcon className="w-11 h-11" as={PlusIcon} />
        </Button>
      </CalendarProvider>
    </SafeAreaView>
  );
}
