import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { useNavigation } from 'expo-router';
import { Settings2, User } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button, ButtonIcon } from './ui/button';
import { Icon } from './ui/icon';
import LoginDialog from './pages/signin/LoginDialog';

export default function Header() {
  const navigation = useNavigation();
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      if (!session?.user) return;

      const { data: user } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();
      if (!user?.avatar_url) return;

      const { data: avatarData } = supabase.storage
        .from('avatars')
        .getPublicUrl(user.avatar_url);
      if (avatarData) setAvatarUrl(avatarData.publicUrl);
    };

    fetchUser();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View className="px-4 py-3 flex-row justify-between items-center">
      <Button
        size="md"
        variant="link"
        className="rounded-full w-12 h-12"
        onPress={() => {
          if (!session?.user) setShowAlertDialog(true);
          else navigation.navigate('mypage');
        }}
      >
        {avatarUrl ? (
          <Avatar size="md" className="bg-slate-500">
            <AvatarImage source={{ uri: avatarUrl }} />
          </Avatar>
        ) : (
          <Avatar size="md" className="bg-slate-600">
            <Icon as={User} size="md" className="stroke-white" />
          </Avatar>
        )}
      </Button>
      <LoginDialog isShow={showAlertDialog} setIsShow={setShowAlertDialog} />

      <Button size="md" variant="link" className="rounded-full p-1">
        <ButtonIcon as={Settings2} className="color-gray-700 w-8 h-8" />
      </Button>
    </View>
  );
}
