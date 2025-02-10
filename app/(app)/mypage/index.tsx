import MyPageContainer from '@/components/pages/mypage/container';
import { Spinner } from '@/components/ui/spinner';
import { AuthContext } from '@/hooks/auth';
import { useNavigation } from 'expo-router';
import { useContext, useEffect } from 'react';

export default function MyPage() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ title: 'マイページ' });
  }, [navigation]);

  const { user } = useContext(AuthContext);

  if (!user) return <Spinner />;
  return <MyPageContainer user={user} />;
}
