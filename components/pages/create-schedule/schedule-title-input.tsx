import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Icon } from '@/components/ui/icon';
import { Input, InputField } from '@/components/ui/input';
import { Link } from 'expo-router';
import { History } from 'lucide-react-native';
import { View } from 'react-native';

type ScheduleTitleInputProps = {
  title: string;
  setTitle: (title: string) => void;
};

export default function ScheduleTitleInput({
  title,
  setTitle,
}: ScheduleTitleInputProps) {
  return (
    <View className="flex flex-row items-center justify-between px-4 py-2 bg-white">
      <FormControl className="flex-1 pl-11">
        <FormControlLabel className="hidden">
          <FormControlLabelText>タイトル</FormControlLabelText>
        </FormControlLabel>

        <Input size="xl" variant="plane" className="">
          <InputField
            type="text"
            value={title}
            onChangeText={(text: string) => setTitle(text)}
            placeholder="タイトルを入力"
          />
        </Input>
      </FormControl>

      <Link href="/" className="p-1">
        <Icon size="xl" as={History} />
      </Link>
    </View>
  );
}
