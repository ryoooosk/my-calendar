import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Database } from '@/database.types';
import { supabase } from '@/lib/supabase';
import { useNavigation } from 'expo-router';
import { LogOut, Pencil, Share, User } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

export default function MyPage() {
  const navigation = useNavigation();
  const [user, setUser] = useState<
    Database['public']['Tables']['profiles']['Row'] | null
  >(null);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session?.user.id)
        .single();

      if (error) console.error(error);
      else setUser(data);

      if (!data?.avatar_url) return;
      const { data: avatarData } = supabase.storage
        .from('avatars')
        .getPublicUrl(data?.avatar_url);
      if (avatarData) setAvatarUrl(avatarData.publicUrl);
    };

    fetchData();
  }, []);

  const logOutHandle = () => {
    supabase.auth.signOut();
    navigation.navigate('index');
  };

  return (
    <VStack space="xl" className="mt-6 px-3">
      <HStack space="lg" className="">
        <Avatar size="xl" className="bg-slate-600">
          {avatarUrl ? (
            <AvatarImage source={{ uri: avatarUrl }} />
          ) : (
            <Icon as={User} size="xl" className="stroke-white" />
          )}
        </Avatar>

        <VStack className="flex gap-1">
          <Heading size="xl">{user?.display_name}</Heading>
          <Text className="text-gray-600">@{user?.username}</Text>
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
