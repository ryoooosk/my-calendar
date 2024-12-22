import { useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from './ui/form-control';
import { Input, InputField } from './ui/input';
import { View } from 'react-native';
import { Button, ButtonText } from './ui/button';

export default function LoginForm() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const handleSubmit = () => {
    const data = {
      email: emailValue,
      password: passwordValue,
    };
    console.log(data);
  };

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

      <Button action="secondary" className="mt-2 h-11" onPress={handleSubmit}>
        <ButtonText>ログイン</ButtonText>
      </Button>
      <Button variant="outline" action="secondary" className="mt-2 h-11">
        <ButtonText className="color-slate-700">
          アカウント発行はこちら
        </ButtonText>
      </Button>
    </View>
  );
}
