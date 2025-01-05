import * as AppleAuthentication from 'expo-apple-authentication';

export default function AppleSignInButton({
  signInHandle,
}: { signInHandle: () => void }) {
  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
      cornerRadius={5}
      style={{ width: '100%', height: 40 }}
      onPress={signInHandle}
    />
  );
}
