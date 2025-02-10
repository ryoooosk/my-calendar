import { Users } from '@/database.types';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';
import MyPagePresenter from './presenter';

export default function MyPageContainer({ user }: { user: Users }) {
  const router = useRouter();
  const logOutHandle = () => {
    supabase.auth.signOut().then(() => {
      router.replace('/login');
    });
  };

  return <MyPagePresenter user={user} logOut={logOutHandle} />;
}
