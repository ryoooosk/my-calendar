import MyPageContainer from '@/components/pages/Mypage';
import { Spinner } from '@/components/ui/spinner';
import { AuthContext } from '@/contexts/AuthContext';
import { useContext } from 'react';
import { View } from 'react-native';

export default function MyPage() {
  const { user } = useContext(AuthContext);

  if (!user) return <Spinner />;
  return (
    <View className="flex-1 bg-white px-3">
      <MyPageContainer user={user} />
    </View>
  );
}
