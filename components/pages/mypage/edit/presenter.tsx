import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Icon } from '@/components/ui/icon';
import { Input, InputField } from '@/components/ui/input';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { AlertCircleIcon, User } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

type ProfileEditPresenterProps = {
  imageUri?: string;
  displayName: string;
  setDisplayName: (value: string) => void;
  userName: string | null;
  setUserName: (value: string) => void;
  biography: string | null;
  setBiography: (value: string) => void;
};

export default function ProfileEditPresenter({
  imageUri,
  displayName,
  setDisplayName,
  userName,
  setUserName,
  biography,
  setBiography,
}: ProfileEditPresenterProps) {
  return (
    <ScrollView>
      <TouchableOpacity className="flex justify-center items-center mt-5 mb-3">
        <Avatar size="xl" className="bg-slate-400">
          {imageUri ? (
            <AvatarImage source={{ uri: '' }} />
          ) : (
            <Icon as={User} size="xl" />
          )}
        </Avatar>
        <Text className="mt-1 text-zinc-800 text-lg tracking-wider">
          写真を変更
        </Text>
      </TouchableOpacity>

      <View className="gap-5 my-5 mx-5">
        <InputFormField
          label={'表示名'}
          value={displayName}
          setValue={setDisplayName}
          isRequired={true}
        />
        <InputFormField
          label={'ユーザー名'}
          value={userName ?? ''}
          setValue={setUserName}
          textPrefix="@"
          isRequired={true}
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
  isRequired = false,
  textPrefix,
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
  isTextArea?: boolean;
  isRequired?: boolean;
  textPrefix?: string;
}) {
  const [isInValid, setIsInValid] = useState(false);

  return (
    <FormControl isInvalid={isInValid} isRequired={isRequired}>
      <View className="flex flex-row justify-center items-center">
        <FormControlLabel className="w-24">
          <FormControlLabelText className="text-lg tracking-wide">
            {label}
          </FormControlLabelText>
        </FormControlLabel>
        <View className="flex-1">
          {!isTextArea ? (
            <Input className="flex-1">
              {textPrefix && <Text className="ml-2 text-lg">{textPrefix}</Text>}
              <InputField
                className={`text-lg ${textPrefix && 'pl-1'}`}
                value={value}
                onChangeText={(value) => {
                  if (isRequired && value === '') setIsInValid(true);
                  setValue(value);
                }}
              />
            </Input>
          ) : (
            <Textarea className="flex-1 h-24 text-lg">
              <TextareaInput
                value={value}
                onChangeText={(value) => {
                  if (isRequired && value === '') setIsInValid(true);
                  setValue(value);
                }}
              />
            </Textarea>
          )}
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>必須項目です</FormControlErrorText>
          </FormControlError>
        </View>
      </View>
    </FormControl>
  );
}
