import CalendarHeader from '@/components/pages/CalendarList/CalendarHeader';
import { Button, ButtonIcon } from '@/components/ui/button';
import { AuthContext } from '@/contexts/AuthContext';
import { DateContext } from '@/contexts/DateContext';
import dayjs from 'dayjs';
import { Stack, router, useNavigation } from 'expo-router';
import { PlusIcon } from 'lucide-react-native';
import { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';

export default function CalendarLayout() {
  const { user } = useContext(AuthContext);
  const { date, setDate } = useContext(DateContext);
  const navigation = useNavigation();

  const [visibleMonth, setVisibleMonth] = useState<string>(
    dayjs().format('YYYY年M月'),
  );
  const [canGoBack, setCanGoBack] = useState(false);

  const handleClick = () => {
    router.push('/schedule/create');
  };
  const handleSetVisibleMonth = (date: string) => {
    const displayMonth = dayjs(date).format('YYYY年M月');
    setVisibleMonth(displayMonth);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      setCanGoBack(router.canGoBack());
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    handleSetVisibleMonth(date);
  }, [date, setDate]);

  return (
    <SafeAreaView className="relative flex-1 bg-white">
      <CalendarHeader
        date={visibleMonth}
        avatarUri={user?.avatar_url ?? null}
        canGoBack={canGoBack}
      />

      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false, title: 'ホーム' }}
        />
        <Stack.Screen
          name="timeline/[date]"
          options={{ title: 'タイムライン', headerShown: false }}
        />
      </Stack>

      <Button
        className="absolute right-5 bottom-12 w-16 h-16 rounded-full"
        onPress={handleClick}
      >
        <ButtonIcon className="w-11 h-11" as={PlusIcon} />
      </Button>
    </SafeAreaView>
  );
}
