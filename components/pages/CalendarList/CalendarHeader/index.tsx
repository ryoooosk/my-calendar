import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button, ButtonIcon } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';
import { ChevronLeft, Menu, User } from 'lucide-react-native';
import { View } from 'react-native';

export default function CalendarHeader({
  date,
  avatarUri,
  canGoBack = false,
}: { date: string; avatarUri: string | null; canGoBack?: boolean }) {
  return (
    <View className="w-full pb-3 pl-3 pr-4 flex-row justify-between items-center border-b border-gray-300">
      <View className="flex-row items-center gap-3">
        <Button
          className="w-10 h-10 bg-transparent px-2 rounded-full"
          action="secondary"
          onPress={() => {
            if (canGoBack) router.back();
          }}
        >
          {canGoBack ? (
            <ButtonIcon className="w-9 h-9" as={ChevronLeft} />
          ) : (
            <ButtonIcon className="w-8 h-8" as={Menu} />
          )}
        </Button>
        <Text className="text-2xl font-medium">{date}</Text>
      </View>

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
