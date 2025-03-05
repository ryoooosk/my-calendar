import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button, ButtonIcon } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { useRouter } from 'expo-router';
import { Settings2, User } from 'lucide-react-native';
import { Text, View } from 'react-native';

export default function CalendarHeader({
  date,
  avatarUri,
}: { date?: string; avatarUri: string | null }) {
  const router = useRouter();

  return (
    <View className="w-full pb-4 px-3 flex-row justify-between items-center border-b border-gray-300">
      <Button
        size="md"
        variant="link"
        className="rounded-full w-12 h-12"
        onPress={() => router.push('/mypage')}
      >
        <Avatar size="md" className="bg-slate-600">
          {avatarUri ? (
            <AvatarImage source={{ uri: avatarUri }} />
          ) : (
            <Icon as={User} size="md" className="stroke-white" />
          )}
        </Avatar>
      </Button>

      {date && <Text className="text-2xl font-medium">{date}</Text>}

      <Button size="md" variant="link" className="rounded-full p-1">
        <ButtonIcon as={Settings2} className="color-gray-700 w-8 h-8" />
      </Button>
    </View>
  );
}
