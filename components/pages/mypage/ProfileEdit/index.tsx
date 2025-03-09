import { Icon } from '@/components/ui/icon';
import { AuthContext } from '@/contexts/AuthContext';
import { useNavigation } from 'expo-router';
import { X } from 'lucide-react-native';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Alert, Button, TouchableOpacity } from 'react-native';
import { useProfileEdit } from './hooks';
import ProfileEditPresenter from './presenter';

export default function ProfileEditContainer() {
  const navigation = useNavigation();

  const { user, updateUser } = useContext(AuthContext);
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

  const { handlePickImage } = useProfileEdit();

  const handleEditImage = async () => {
    const result = await handlePickImage();
    if (!result) return;
    setNewImageUri(result.uri);
  };

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

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon size="xl" as={X} />
        </TouchableOpacity>
      ),
      headerRight: () => <Button title="保存" onPress={handleUpdateUser} />,
    });
  }, [navigation, handleUpdateUser]);

  return (
    <ProfileEditPresenter
      imageUri={newImageUri ?? currentImageUri}
      displayName={displayName}
      setDisplayName={handleSetDisplayName}
      userName={userName}
      setUserName={handleSetUserName}
      biography={biography}
      setBiography={setBiography}
      handleEditImage={handleEditImage}
    />
  );
}
