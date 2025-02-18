import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Icon } from '@/components/ui/icon';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { LetterText } from 'lucide-react-native';
import { View } from 'react-native';

type ScheduleDescriptionInputProps = {
  description: string;
  setDescription: (description: string) => void;
};

export default function ScheduleDescriptionInput({
  description,
  setDescription,
}: ScheduleDescriptionInputProps) {
  return (
    <View className="flex flex-row items-center gap-4 px-4 py-2 mt-5 bg-white">
      <Icon size="xl" as={LetterText} />

      <FormControl className="flex-1">
        <FormControlLabel className="hidden">
          <FormControlLabelText>コメント</FormControlLabelText>
        </FormControlLabel>

        <Textarea className="border-0">
          <TextareaInput
            value={description}
            onChangeText={(text: string) => setDescription(text)}
            placeholder="コメントを入力"
          />
        </Textarea>
      </FormControl>
    </View>
  );
}
