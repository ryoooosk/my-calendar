import { AuthContext } from '@/hooks/auth';
import { useRouter } from 'expo-router';
import { Settings2, User } from 'lucide-react-native';
import { useContext, useState } from 'react';
import { View } from 'react-native';
import { Avatar } from './ui/avatar';
import { Button, ButtonIcon } from './ui/button';
import { Icon } from './ui/icon';

export default function Header() {
  const router = useRouter();
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const user = useContext(AuthContext);

  return (
    <View className="px-4 py-3 flex-row justify-between items-center">
      <Button
        size="md"
        variant="link"
        className="rounded-full w-12 h-12"
        onPress={() => {
          if (!user) setShowAlertDialog(true);
          else router.push('/mypage');
        }}
      >
        <Avatar size="md" className="bg-slate-600">
          <Icon as={User} size="md" className="stroke-white" />
        </Avatar>
      </Button>

      <Button size="md" variant="link" className="rounded-full p-1">
        <ButtonIcon as={Settings2} className="color-gray-700 w-8 h-8" />
      </Button>
    </View>
  );
}
