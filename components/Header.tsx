import { View } from 'react-native';
import { Avatar, AvatarImage } from './ui/avatar';
import { Settings2 } from 'lucide-react-native';
import { Button, ButtonIcon } from './ui/button';
import {} from './ui/alert-dialog';
import LoginDialog from './LoginDialog';
import { useState } from 'react';

export default function Header() {
  const [showAlertDialog, setShowAlertDialog] = useState(false);

  return (
    <View className="px-4 py-3 flex-row justify-between items-center">
      <Button
        size="md"
        variant="link"
        className="rounded-full w-12 h-12"
        onPress={() => setShowAlertDialog(true)}
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
