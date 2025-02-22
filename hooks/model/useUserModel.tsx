import { AuthContext } from '@/contexts/AuthContext';
import { Users } from '@/database.types';
import dayjs from 'dayjs';
import { router } from 'expo-router';
import { useContext } from 'react';
import { Alert } from 'react-native';
import { useSupabaseStorageRepository } from '../repository/useSupabaseStorageRepository';
import { useUserRepository } from '../repository/useUserRepository';

export const useUserModel = () => {
  const { updateUser: updateUserRepository } = useUserRepository();
  const { user, setUser } = useContext(AuthContext);
  const { getPublicUrl, uploadToStorage, deleteFromStorage } =
    useSupabaseStorageRepository();

  const updateUser = async (
    newImageUri: string | null,
    displayName: string,
    userName: string | null,
    biography: string | null,
    currentImageUri: string | null,
  ): Promise<void> => {
    if (!user) throw new Error('User is not found');

    try {
      const avatarUri = newImageUri
        ? await uploadUserAvatar(user.id, user.avatar_url, newImageUri)
        : null;

      // TODO: user_name が重複していないかチェック
      const newUser: Users = {
        ...user,
        display_name: displayName,
        user_name: userName,
        biography,
        avatar_url: avatarUri ?? currentImageUri,
      };
      await updateUserRepository(newUser);

      setUser(newUser);
      router.back();
    } catch (error) {
      console.error('Failed to update user:', error);
      Alert.alert('保存に失敗しました');
    }
  };

  const uploadUserAvatar = async (
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

    const data = await uploadToStorage(
      'avatars',
      filePath,
      arraybuffer,
      contentType,
    );

    if (currentImageUri) {
      const targetPath = currentImageUri.split('/').pop();
      if (!targetPath) throw new Error('Failed to get target path');
      await deleteFromStorage('avatars', targetPath);
    }

    const publicUrl = getPublicUrl('avatars', data.path);
    return publicUrl;
  };

  return {
    user,
    updateUser,
  };
};
