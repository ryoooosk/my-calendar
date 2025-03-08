import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button, ButtonIcon } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { router } from 'expo-router';
import { ChevronLeft, Menu, User } from 'lucide-react-native';
import { Text, View } from 'react-native';

export default function CalendarHeader({
  date,
  avatarUri,
  canGoBack = false,
}: { date: string; avatarUri: string | null; canGoBack?: boolean }) {
  return (
    <View className="w-full pb-3 pl-3 pr-4 flex-row justify-between items-center border-b border-gray-300">
      <View className="flex-row items-center gap-3">
        <Button
          className="bg-transparent px-2 rounded-full"
          action="secondary"
          onPress={() => {
            if (canGoBack) router.back();
          }}
        >
          {canGoBack ? (
            <ButtonIcon className="w-7 h-7 color-slate-700" as={ChevronLeft} />
          ) : (
            <ButtonIcon className="w-7 h-7 color-slate-700" as={Menu} />
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
