import { supabase } from '@/lib/supabase';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Link } from 'expo-router';
import { Platform } from 'react-native';
import AppleSignInButton from './AppleSignInButton';
import LoginForm from './LoginForm';
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from './ui/alert-dialog';
import { Heading } from './ui/heading';

type LoginDialogProps = {
  isShow: boolean;
  setIsShow: (value: boolean) => void;
};

export default function LoginDialog({ isShow, setIsShow }: LoginDialogProps) {
  const appleSignInHandle = () => {
    setIsShow(false);
    appleSignIn();
  };

  return (
    <AlertDialog isOpen={isShow} onClose={() => setIsShow(false)} size="md">
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading className="text-typography-950 font-semibold" size="lg">
            ログインする
          </Heading>
        </AlertDialogHeader>

        <AlertDialogBody className="mt-3 mb-4">
          <LoginForm setIsShow={setIsShow} />
        </AlertDialogBody>

        {Platform.OS === 'ios' && (
          <AppleSignInButton signInHandle={appleSignInHandle} />
        )}

        <AlertDialogFooter className="flex justify-center mt-2">
          <Link href="/signup" onPress={() => setIsShow(false)}>
            アカウント作成はこちら
          </Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const appleSignIn = async () => {
  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });
    if (!credential.identityToken) throw new Error('No identityToken.');

    // supabaseのAppleプロパイダーのclientIdにApple Developer Consoleで作成したApp Idを登録必要
    const {
      error,
      data: { user },
    } = await supabase.auth.signInWithIdToken({
      provider: 'apple',
      token: credential.identityToken,
    });
    console.log('Supabase Response:', { error, user });

    if (!error) {
      // User is signed in.)
    }
  } catch (e) {
    if (e.code === 'ERR_REQUEST_CANCELED') {
      // handle that the user canceled the sign-in flow
      console.error('error code', e);
    } else {
      // handle other errors
      console.error('error', e);
    }
  }
};
