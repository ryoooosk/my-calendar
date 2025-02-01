import { GoogleSigninButton } from '@react-native-google-signin/google-signin';

export default function GoogleSignInButton({
  signInHandle,
}: { signInHandle: () => void }) {
  return (
    <GoogleSigninButton
      style={{ width: '100%' }}
      size={GoogleSigninButton.Size.Wide}
      onPress={signInHandle}
    />
  );
}
