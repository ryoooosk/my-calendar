import CalendarListContainer from '@/components/pages/CalendarList';
import { Button, ButtonIcon } from '@/components/ui/button';
import { router } from 'expo-router';
import { PlusIcon } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CalendarListPage() {
  const handleClick = () => {
    router.push('/schedule/create');
  };

  return (
    <SafeAreaView className="flex-1 relative bg-white">
      <CalendarListContainer />

      <Button
        className="absolute right-5 bottom-12 w-16 h-16 rounded-full"
        onPress={handleClick}
      >
        <ButtonIcon className="w-11 h-11" as={PlusIcon} />
      </Button>
    </SafeAreaView>
  );
}
