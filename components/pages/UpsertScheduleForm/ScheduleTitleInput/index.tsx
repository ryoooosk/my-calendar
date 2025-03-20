import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Input, InputField } from '@/components/ui/input';

type ScheduleTitleInputProps = {
  title: string;
  setTitle: (title: string) => void;
};

export default function ScheduleTitleInput({
  title,
  setTitle,
}: ScheduleTitleInputProps) {
  return (
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
  );
}
