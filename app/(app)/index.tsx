import CalendarListPresenter from '@/components/pages/calendar-list/calendar-list-presenter';
import { Button, ButtonIcon } from '@/components/ui/button';
import dayjs from 'dayjs';
import { router } from 'expo-router';
import { PlusIcon } from 'lucide-react-native';
import { CalendarProvider } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CalendarListPage() {
  const handleClick = () => {
    router.push('/create-schedule');
  };

  return (
    <SafeAreaView className="flex-1 relative bg-white">
      <CalendarProvider date={dayjs().format('YYYY-MM-DD')}>
        <CalendarListPresenter />

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
