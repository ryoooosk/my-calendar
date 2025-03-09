import { AuthContext } from '@/contexts/AuthContext';
import { Users } from '@/database.types';
import dayjs from 'dayjs';
import { router } from 'expo-router';
import { useContext } from 'react';
import {
  SupabaseStorageUploadResponse,
  useSupabaseStorageRepository,
} from '../repository/useSupabaseStorageRepository';
import { useUserRepository } from '../repository/useUserRepository';

export function useUserModel() {
  const { updateUser: updateUserRepository } = useUserRepository();
  const { getPublicUrl, uploadToStorage, deleteFromStorage } =
    useSupabaseStorageRepository();
  const { user, setUser } = useContext(AuthContext);

  const updateUser = async (
    newImageUri: string | null,
    displayName: string,
    userName: string | null,
    biography: string | null,
    currentImageUri: string | null,
  ): Promise<void> => {
    if (!user) throw new Error('User is not found');

    const avatarUri = newImageUri
      ? await uploadUserAvatar(
          user.id,
          user.avatar_url,
          newImageUri,
          getPublicUrl,
          uploadToStorage,
          deleteFromStorage,
        )
      : null;

    // TODO: user_name が重複していないかチェック
    const newUser: Users = {
      ...user,
      display_name: displayName,
      user_name: userName,
      biography,
      avatar_url: avatarUri ?? currentImageUri,
    };
    const error = await updateUserRepository(newUser);
    if (error) throw error;

    setUser(newUser);
    router.back();
  };

  return {
    user,
    updateUser,
  };
}

async function uploadUserAvatar(
  userId: Users['id'],
  currentImageUri: string | null,
  newImageUri: string,
  getPublicUrl: (bucket: string, path: string) => string,
  uploadToStorage: (
    bucket: string,
    path: string,
    fileBody: ArrayBuffer,
    contentType: string,
  ) => Promise<SupabaseStorageUploadResponse>,
  deleteFromStorage: (bucket: string, path: string) => Promise<void>,
): Promise<string> {
  const fileExt = newImageUri.split('.').pop();
  const contentType = `image/${fileExt}`;
  const filePath = `${userId}_${dayjs().format('YYYYMMDD-HHmmss')}.${fileExt}`;
  const arraybuffer = await fetch(newImageUri).then((res) => res.arrayBuffer());

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
}
