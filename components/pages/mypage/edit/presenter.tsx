import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Input, InputField } from '@/components/ui/input';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { ScrollView, Text, View } from 'react-native';

type ProfileEditPresenterProps = {
  displayName: string;
  setDisplayName: (value: string) => void;
  userName: string | null;
  setUserName: (value: string) => void;
  biography: string | null;
  setBiography: (value: string) => void;
};

export default function ProfileEditPresenter({
  displayName,
  setDisplayName,
  userName,
  setUserName,
  biography,
  setBiography,
}: ProfileEditPresenterProps) {
  return (
    <ScrollView>
      <View className="gap-5 my-5 mx-5">
        <InputFormField
          label={'表示名'}
          value={displayName}
          setValue={setDisplayName}
        />
        <InputFormField
          label={'ユーザー名'}
          value={userName ?? ''}
          setValue={setUserName}
          textPrefix="@"
        />
        <InputFormField
          label={'自己紹介'}
          value={biography ?? ''}
          setValue={setBiography}
          isTextArea={true}
        />
      </View>
    </ScrollView>
  );
}

function InputFormField({
  label,
  value,
  setValue,
  isTextArea,
  textPrefix,
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
  isTextArea?: boolean;
  textPrefix?: string;
}) {
  return (
    <FormControl>
      <View className="flex flex-row justify-center items-center">
        <FormControlLabel className="w-24">
          <FormControlLabelText className="text-lg tracking-wide">
            {label}
          </FormControlLabelText>
        </FormControlLabel>
        {!isTextArea ? (
          <Input className="flex-1">
            {textPrefix && <Text className="ml-2 text-lg">{textPrefix}</Text>}
            <InputField
              className={`text-lg ${textPrefix && 'pl-1'}`}
              value={value}
              onChangeText={(value) => setValue(value)}
            />
          </Input>
        ) : (
          <Textarea className="flex-1 h-24 text-lg">
            <TextareaInput
              value={value}
              onChangeText={(value) => setValue(value)}
            />
          </Textarea>
        )}
      </View>
    </FormControl>
  );
}
