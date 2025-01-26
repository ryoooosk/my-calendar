import Calendars from '@/components/Calendar';
import Header from '@/components/Header';
import { Button, ButtonIcon } from '@/components/ui/button';
import { router } from 'expo-router';
import { PlusIcon } from 'lucide-react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomePage() {
  const handleClick = () => {
    router.push('/create-schedule');
  };

  return (
    <SafeAreaView className="flex-1 relative">
      <Header />
      <Calendars />

      <Button
        className="absolute right-8 bottom-16 w-20 h-20 rounded-full"
        onPress={handleClick}
      >
        <ButtonIcon className="w-14 h-14" as={PlusIcon} />
      </Button>
    </SafeAreaView>
  );
}
