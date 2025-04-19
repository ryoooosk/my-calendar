import CalendarHeader from '@/components/pages/CalendarList/CalendarHeader';
import { Button, ButtonIcon } from '@/components/ui/button';
import { AuthContext } from '@/contexts/AuthContext';
import { CurrentDateContext } from '@/contexts/CurrentDateContext';
import dayjs from 'dayjs';
import {
  Stack,
  router,
  useGlobalSearchParams,
  useNavigation,
} from 'expo-router';
import { PlusIcon } from 'lucide-react-native';
import { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';

export default function CalendarLayout() {
  const { user } = useContext(AuthContext);
  const { currentDate } = useContext(CurrentDateContext);
  const navigation = useNavigation();
  const params = useGlobalSearchParams();

  const [visibleMonth, setVisibleMonth] = useState<string>(
    dayjs().format('YYYY年M月'),
  );
  const [canGoBack, setCanGoBack] = useState(false);

  const handleClick = () => {
    const date = Array.isArray(params.date) ? params.date[0] : params.date;
    router.push({ pathname: '/schedule/create', params: { date } });
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
    if (!currentDate) return;
    handleSetVisibleMonth(currentDate);
  }, [currentDate]);

  return (
    <SafeAreaView className="relative flex-1">
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
