import { AuthContext } from '@/hooks/auth';
import { useRouter } from 'expo-router';
import { Settings2, User } from 'lucide-react-native';
import { useContext } from 'react';
import { Text, View } from 'react-native';
import { Avatar } from '../../ui/avatar';
import { Button, ButtonIcon } from '../../ui/button';
import { Icon } from '../../ui/icon';

export default function CalendarHeaderPresenter({ date }: { date?: string }) {
  const router = useRouter();
  const user = useContext(AuthContext);

  return (
    <View className="w-full pb-4 flex-row justify-between items-center border-b border-gray-300">
      <Button
        size="md"
        variant="link"
        className="rounded-full w-12 h-12"
        onPress={() => router.push('/mypage')}
      >
        <Avatar size="md" className="bg-slate-600">
          <Icon as={User} size="md" className="stroke-white" />
        </Avatar>
      </Button>

      {date && <Text className="text-2xl font-medium">{date}</Text>}

      <Button size="md" variant="link" className="rounded-full p-1">
        <ButtonIcon as={Settings2} className="color-gray-700 w-8 h-8" />
      </Button>
    </View>
  );
}
