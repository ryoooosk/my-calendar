import { supabase } from '@/lib/supabase';
import { useState } from 'react';
import { Alert, View } from 'react-native';
import { Button, ButtonText } from '../../ui/button';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from '../../ui/form-control';
import { Input, InputField } from '../../ui/input';

export default function LoginForm({
  setIsShow,
}: { setIsShow: (value: boolean) => void }) {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  async function signInWithEmail() {
    const { error } = await supabase.auth.signInWithPassword({
      email: emailValue,
      password: passwordValue,
    });

    if (error) Alert.alert(error.message);
    else setIsShow(false);
  }

  return (
    <View className="flex gap-3">
      <FormControl size="lg" isRequired={true}>
        <FormControlLabel>
          <FormControlLabelText>メールアドレス</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1">
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
        <Input className="my-1">
          <InputField
            type="password"
            placeholder="password"
            value={passwordValue}
            onChangeText={(text) => setPasswordValue(text)}
          />
        </Input>
      </FormControl>

      <Button
        action="secondary"
        className="mt-2 h-11"
        onPress={() => signInWithEmail()}
      >
        <ButtonText>ログイン</ButtonText>
      </Button>
    </View>
  );
}
