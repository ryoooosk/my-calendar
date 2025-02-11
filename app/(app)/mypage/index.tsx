import MyPageContainer from '@/components/pages/mypage/container';
import { Spinner } from '@/components/ui/spinner';
import { AuthContext } from '@/hooks/auth';
import { useContext } from 'react';

export default function MyPage() {
  const { user } = useContext(AuthContext);

  if (!user) return <Spinner />;
  return <MyPageContainer user={user} />;
}
