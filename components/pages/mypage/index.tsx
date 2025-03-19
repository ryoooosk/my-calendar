import { Users } from '@/database.types';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import MyPagePresenter from './presenter';

export default function MyPageContainer({ user }: { user: Users }) {
  const router = useRouter();

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const logOutHandle = () => {
    supabase.auth.signOut().then(() => {
      router.replace('/login');
    });
  };
  const deleteAccountHandle = (isSubmit: boolean) => {
    if (!isSubmit) return setIsAlertOpen(false);

    // TODO: ユーザー削除ロジックを実行する
  };

  return (
    <View>
      <MyPagePresenter
        user={user}
        logOut={logOutHandle}
        isAlertOpen={isAlertOpen}
        setIsAlertOpen={setIsAlertOpen}
        deleteAccountHandle={deleteAccountHandle}
      />
    </View>
  );
}
