import MyPageContainer from '@/components/pages/mypage/mypage-container';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';

export default function MyPage() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: 'マイページ' });
  }, [navigation]);

  return <MyPageContainer />;
}
