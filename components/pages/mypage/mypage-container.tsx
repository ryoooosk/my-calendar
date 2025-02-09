import { Avatar } from '@/components/ui/avatar';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { AuthContext } from '@/hooks/auth';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';
import { LogOut, Pencil, Share, UserIcon } from 'lucide-react-native';
import { useContext } from 'react';
import { View } from 'react-native';

export default function MyPageContainer() {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const logOutHandle = () => {
    supabase.auth.signOut().then(() => {
      router.replace('/login');
    });
  };

  return (
    <VStack space="xl" className="mt-6 px-3">
      <HStack space="lg" className="">
        <Avatar size="xl" className="bg-slate-600">
          <Icon as={UserIcon} size="xl" className="stroke-white" />
        </Avatar>

        <VStack className="flex gap-1">
          <Heading size="xl">{user?.display_name}</Heading>
          <Text className="text-gray-600">@{user?.user_name}</Text>
        </VStack>
      </HStack>

      {user?.biography && (
        <Text size="lg" className="text-gray-950">
          {user?.biography}
        </Text>
      )}

      <View className="flex flex-row gap-3">
        <Button variant="solid" size="md" className="rounded-full w-1/2">
          <ButtonIcon as={Pencil} />
          <ButtonText>編集する</ButtonText>
        </Button>

        <Button
          variant="outline"
          size="md"
          className="rounded-full w-1/2"
          onPress={logOutHandle}
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
