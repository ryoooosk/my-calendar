import { Icon } from '@/components/ui/icon';
import { AuthContext } from '@/contexts/AuthContext';
import { Users } from '@/database.types';
import { supabase } from '@/lib/supabase';
import dayjs from 'dayjs';
import { SaveFormat, manipulateAsync } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { router, useNavigation } from 'expo-router';
import { X } from 'lucide-react-native';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Alert, Button, TouchableOpacity } from 'react-native';
import ProfileEditPresenter from './presenter';

export default function ProfileEditContainer() {
  const navigation = useNavigation();

  const { user, setUser } = useContext(AuthContext);

  const [currentImageUri, setCurrentImageUri] = useState<string | null>(null);
  const [newImageUri, setNewImageUri] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string>('');
  const [userName, setUserName] = useState<string | null>(null);
  const [biography, setBiography] = useState<string | null>(null);

  const [isInValid, setIsInValid] = useState(false);
  const handleSetDisplayName = (value: string) => {
    if (!value || value === '') setIsInValid(true);
    setDisplayName(value);
  };
  const handleSetUserName = (value: string) => {
    if (!value || value === '') setIsInValid(true);
    setUserName(value);
  };

  useEffect(() => {
    if (!user) return;
    setCurrentImageUri(user.avatar_url);
    setDisplayName(user.display_name);
    setUserName(user.user_name);
    setBiography(user.biography);
  }, [user]);

  const pickImage = async () => {
    try {
      // No permissions request is necessary for launching the image library
      const selected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        exif: false,
      });
      if (selected.canceled) return;

      const result = await manipulateAsync(
        selected.assets[0].uri,
        [{ resize: { width: 500 } }],
        { compress: 1, format: SaveFormat.PNG },
      );
      setNewImageUri(result.uri);
    } catch (error) {
      console.error('Image manipulation failed:', error);
    }
  };

  const handleSubmit = useCallback(async () => {
    if (!user) return;
    if (isInValid) return Alert.alert('入力内容が不正です');

    try {
      const avatarUri = newImageUri
        ? await uploadAvatarImage(user.id, user.avatar_url, newImageUri)
        : null;

      // TODO: user_name が重複していないかチェック
      const newUser: Users = {
        ...user,
        display_name: displayName,
        user_name: userName,
        biography,
        avatar_url: avatarUri ?? currentImageUri,
      };
      const { error } = await supabase
        .from('users')
        .update(newUser)
        .eq('id', user.id);
      if (error) throw error;

      setUser(newUser);
      router.back();
    } catch (error) {
      console.error('Failed to update user:', error);
      Alert.alert('保存に失敗しました');
    }
  }, [user, setUser, displayName, userName, biography, isInValid, newImageUri]);

  const uploadAvatarImage = async (
    userId: Users['id'],
    currentImageUri: string | null,
    newImageUri: string,
  ): Promise<string> => {
    const fileExt = newImageUri.split('.').pop();
    const contentType = `image/${fileExt}`;
    const filePath = `${userId}_${dayjs().format('YYYYMMDD-HHmmss')}.${fileExt}`;

    const arraybuffer = await fetch(newImageUri).then((res) =>
      res.arrayBuffer(),
    );

    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(filePath, arraybuffer, { contentType });
    if (error || !data) throw error;

    if (currentImageUri) await deleteCurrentAvatarImage(currentImageUri);

    const {
      data: { publicUrl },
    } = supabase.storage.from('avatars').getPublicUrl(data.path);
    return publicUrl;
  };

  const deleteCurrentAvatarImage = async (currentImageUri: string) => {
    const targetPath = currentImageUri.split('/').pop();
    if (!targetPath) throw new Error('Failed to get target path');

    const { data, error } = await supabase.storage
      .from('avatars')
      .remove([targetPath]);
    if (!data?.length || error)
      console.error('Failed to remove old avatar:', error);
  };

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
      imageUri={newImageUri ?? currentImageUri}
      displayName={displayName}
      setDisplayName={handleSetDisplayName}
      userName={userName}
      setUserName={handleSetUserName}
      biography={biography}
      setBiography={setBiography}
      handlePickImage={pickImage}
    />
  );
}
