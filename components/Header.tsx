import { View } from 'react-native';
import { Avatar, AvatarImage } from './ui/avatar';
import { Settings2 } from 'lucide-react-native';
import { Button, ButtonIcon } from './ui/button';

export default function Header() {
  return (
    <View className="px-4 py-3 flex-row justify-between items-center">
      <Avatar size="md">
        <AvatarImage />
      </Avatar>

      <Button size="md" variant="link" className="rounded-full p-1">
        <ButtonIcon as={Settings2} className="color-gray-700 w-8 h-8" />
      </Button>
    </View>
  );
}
