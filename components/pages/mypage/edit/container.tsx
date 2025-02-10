import { Icon } from '@/components/ui/icon';
import { Users } from '@/database.types';
import { AuthContext } from '@/hooks/auth';
import { supabase } from '@/lib/supabase';
import { router, useNavigation } from 'expo-router';
import { X } from 'lucide-react-native';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Alert, Button, TouchableOpacity } from 'react-native';
import ProfileEditPresenter from './presenter';

export default function ProfileEditContainer() {
  const navigation = useNavigation();

  const { user, setUser } = useContext(AuthContext);

  const [displayName, setDisplayName] = useState<string>('');
  const [userName, setUserName] = useState<string | null>(null);
  const [biography, setBiography] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    setDisplayName(user.display_name);
    setUserName(user.user_name);
    setBiography(user.biography);
  }, [user]);

  const handleSubmit = useCallback(async () => {
    if (!user || !displayName || !userName) return;
    if (displayName === '' || userName === '') {
      Alert.alert('表示名とユーザー名は必須です');
      return;
    }

    // TODO: user_name が重複していないかチェック
    const newUser: Users = {
      ...user,
      display_name: displayName,
      user_name: userName,
      biography,
    };
    const { error } = await supabase
      .from('users')
      .update(newUser)
      .eq('id', user.id);

    if (error) Alert.alert('保存に失敗しました');
    else {
      setUser(newUser);
      router.replace('/mypage');
    }
  }, [user, setUser, displayName, userName, biography]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon size="xl" as={X} />
        </TouchableOpacity>
      ),
      headerRight: () => <Button title="保存" onPress={handleSubmit} />,
    });
  }, [navigation, handleSubmit]);

  return (
    <ProfileEditPresenter
      displayName={displayName}
      setDisplayName={setDisplayName}
      userName={userName}
      setUserName={setUserName}
      biography={biography}
      setBiography={setBiography}
    />
  );
}
