import { Button, ButtonText } from '@/components/ui/button';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { useState } from 'react';
import { Alert, View } from 'react-native';

export default function Signup() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  async function signUpWithEmail() {
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: emailValue,
      password: passwordValue,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert('Please check your inbox for email verification!');
  }

  return (
    <View className="flex gap-4 px-6 py-2 mt-4">
      <Heading size="xl" className="pb-2">
        Emailで登録する
      </Heading>

      <FormControl size="lg" isRequired={true}>
        <FormControlLabel>
          <FormControlLabelText>メールアドレス</FormControlLabelText>
        </FormControlLabel>
        <Input size="lg" className="my-1">
          <InputField
            type="text"
            placeholder="email"
            value={emailValue}
            onChangeText={(text) => setEmailValue(text)}
          />
        </Input>
      </FormControl>

      <FormControl size="lg" isRequired={true}>
        <FormControlLabel>
          <FormControlLabelText>パスワード</FormControlLabelText>
        </FormControlLabel>
        <Input size="lg" className="my-1">
          <InputField
            type="password"
            placeholder="password"
            value={passwordValue}
            onChangeText={(text) => setPasswordValue(text)}
          />
        </Input>
      </FormControl>

      <Button size="xl" className="mt-4" onPress={() => signUpWithEmail()}>
        <ButtonText>登録する</ButtonText>
      </Button>
    </View>
  );
}
