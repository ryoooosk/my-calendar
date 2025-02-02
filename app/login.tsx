import { supabase } from '@/lib/supabase';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Link, useRouter } from 'expo-router';
import { Platform, SafeAreaView } from 'react-native';
import AppleSignInButton from '../components/pages/signin/AppleSignInButton';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import GoogleSignInButton from '../components/pages/signin/GoogleSignInButton';
import { Heading } from '@/components/ui/heading';
import LoginForm from '../components/pages/signin/LoginForm';
import { View } from 'react-native';
import { Divider } from '@/components/ui/divider/divider';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/hooks/auth';

export default function LoginPage() {
  const router = useRouter();
  const user = useContext(AuthContext);
  useEffect(() => {
    if (user) router.replace('/');
  }, [user]);

  const appleSignInHandle = () => {
    appleSignIn();
  };
  const googleSignInHandle = () => {
    googleSignIn();
  };

  return (
    <SafeAreaView className="flex-1 flex justify-center bg-sky-600">
      <View className="flex gap-4 p-5 mx-7 rounded-xl bg-slate-50">
        <Heading className="font-semibold mb-3" size="xl">
          MyCalenderにようこそ
        </Heading>

        <LoginForm />

        <Divider className="my-3" />

        <View className="flex gap-4">
          {Platform.OS === 'ios' && (
            <AppleSignInButton signInHandle={appleSignInHandle} />
          )}
          <GoogleSignInButton signInHandle={googleSignInHandle} />
          <Link
            className="mt-2 mx-1 text-base font-medium tracking-wide"
            href="/signup"
            onPress={() => router.push('/signup')}
          >
            Emailアカウントを作成する
          </Link>
        </View>
      </View>
    </SafeAreaView>
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
