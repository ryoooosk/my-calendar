import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { useRouter } from 'expo-router';
import { User } from 'lucide-react-native';
import { Text, View } from 'react-native';

export default function CalendarHeader({
  date,
  avatarUri,
}: { date?: string; avatarUri: string | null }) {
  const router = useRouter();

  return (
    <View className="w-full pb-4 px-5 flex-row justify-between items-center border-b border-gray-300">
      {date && <Text className="text-2xl font-medium">{date}</Text>}

      <Button
        size="md"
        variant="link"
        className="rounded-full w-11 h-11"
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
    </View>
  );
}
