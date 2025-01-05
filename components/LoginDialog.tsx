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
import GoogleSignInButton from './GoogleSignInButton';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

type LoginDialogProps = {
  isShow: boolean;
  setIsShow: (value: boolean) => void;
};

export default function LoginDialog({ isShow, setIsShow }: LoginDialogProps) {
  const appleSignInHandle = () => {
    setIsShow(false);
    appleSignIn();
  };
  const googleSignInHandle = () => {
    setIsShow(false);
    googleSignIn();
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

        <AlertDialogBody className="flex flex-col mt-3 mb-4">
          <LoginForm setIsShow={setIsShow} />
        </AlertDialogBody>

        <AlertDialogFooter className="flex flex-col gap-3 justify-center mt-4">
          {Platform.OS === 'ios' && (
            <AppleSignInButton signInHandle={appleSignInHandle} />
          )}
          <GoogleSignInButton signInHandle={googleSignInHandle} />
          <Link
            className="mt-2"
            href="/signup"
            onPress={() => setIsShow(false)}
          >
            Emailでアカウント作成する
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

const googleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    if (userInfo.data?.idToken) {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: userInfo.data.idToken,
      });
      console.log(error, data);
    } else throw new Error('no ID token present!');
  } catch (error: any) {
    console.error(error);
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
};
