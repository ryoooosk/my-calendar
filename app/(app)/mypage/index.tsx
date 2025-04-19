import MyPageContainer from '@/components/pages/Mypage';
import { Spinner } from '@/components/ui/spinner';
import { AuthContext } from '@/contexts/AuthContext';
import { useContext } from 'react';

export default function MyPage() {
  const { user } = useContext(AuthContext);

  if (!user) return <Spinner />;
  return <MyPageContainer user={user} />;
}
