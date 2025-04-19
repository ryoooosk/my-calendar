import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Users } from '@/database.types';
import { router } from 'expo-router';
import { LogOut, Pencil, Share, UserIcon } from 'lucide-react-native';
import { View } from 'react-native';

export default function MyPagePresenter({
  user,
  logOut,
}: { user: Users; logOut: () => void }) {
  return (
    <VStack space="xl" className="mt-6 px-3">
      <HStack space="lg" className="">
        <Avatar size="xl" className="bg-slate-600">
          {user.avatar_url ? (
            <AvatarImage source={{ uri: user.avatar_url }} />
          ) : (
            <Icon as={UserIcon} size="xl" className="stroke-white" />
          )}
        </Avatar>

        <VStack className="flex gap-1">
          <Heading size="xl">{user?.display_name}</Heading>
          <Text className="text-gray-500">@{user?.user_name}</Text>
        </VStack>
      </HStack>

      <View className="min-h-7 mx-1">
        {user?.biography && (
          <Text size="lg" className="tracking-wide">
            {user?.biography}
          </Text>
        )}
      </View>

      <View className="flex flex-row gap-3">
        <Button
          variant="solid"
          size="md"
          className="rounded-full w-1/2"
          onPress={() => router.push('/mypage/edit')}
        >
          <ButtonIcon as={Pencil} />
          <ButtonText>編集する</ButtonText>
        </Button>

        <Button
          variant="outline"
          size="md"
          className="rounded-full w-1/2"
          onPress={logOut}
        >
          <ButtonIcon as={LogOut} />
          <ButtonText>ログアウト</ButtonText>
        </Button>
      </View>

      <Button variant="outline" size="md" className="rounded-full flex-grow">
        <ButtonIcon as={Share} />
        <ButtonText>共有する</ButtonText>
      </Button>
    </VStack>
  );
}
