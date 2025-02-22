import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useUserModel } from '../model/useUserModel';

export const useUserViewModel = () => {
  const { user, updateUser } = useUserModel();

  const [currentImageUri, setCurrentImageUri] = useState<string | null>(null);
  const [newImageUri, setNewImageUri] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string>('');
  const [userName, setUserName] = useState<string | null>(null);
  const [biography, setBiography] = useState<string | null>(null);

  const [isInValid, setIsInValid] = useState(false);

  useEffect(() => {
    if (!user) return;
    setCurrentImageUri(user.avatar_url);
    setDisplayName(user.display_name);
    setUserName(user.user_name);
    setBiography(user.biography);
  }, [user]);

  const handleSetDisplayName = (value: string) => {
    if (!value || value === '') setIsInValid(true);
    setDisplayName(value);
  };

  const handleSetUserName = (value: string) => {
    if (!value || value === '') setIsInValid(true);
    setUserName(value);
  };

  const handleUpdateUser = useCallback(async () => {
    if (isInValid) return Alert.alert('入力内容が不正です');

    try {
      await updateUser(
        newImageUri,
        displayName,
        userName,
        biography,
        currentImageUri,
      );
    } catch (error) {
      console.error(error);
      Alert.alert('保存に失敗しました');
    }
  }, [
    isInValid,
    updateUser,
    newImageUri,
    displayName,
    userName,
    biography,
    currentImageUri,
  ]);

  return {
    displayName,
    userName,
    biography,
    setBiography,
    newImageUri,
    currentImageUri,
    setNewImageUri,
    handleUpdateUser,
    handleSetDisplayName,
    handleSetUserName,
  };
};
