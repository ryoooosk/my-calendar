import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { Settings2 } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import LoginDialog from './LoginDialog';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button, ButtonIcon } from './ui/button';

export default function Header() {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

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
          console.log(session?.user);
          if (!session?.user) {
            setShowAlertDialog(true);
          }
        }}
      >
        <Avatar size="md" className="bg-slate-500">
          <AvatarImage />
        </Avatar>
      </Button>
      <LoginDialog isShow={showAlertDialog} setIsShow={setShowAlertDialog} />

      <Button size="md" variant="link" className="rounded-full p-1">
        <ButtonIcon as={Settings2} className="color-gray-700 w-8 h-8" />
      </Button>
    </View>
  );
}
