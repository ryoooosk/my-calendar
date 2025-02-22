import { Icon } from '@/components/ui/icon';
import { useUserViewModel } from '@/hooks/view-model/useUserViewModel';
import { useNavigation } from 'expo-router';
import { X } from 'lucide-react-native';
import { useEffect } from 'react';
import { Button, TouchableOpacity } from 'react-native';
import { useProfileEdit } from './hooks';
import ProfileEditPresenter from './presenter';

export default function ProfileEditContainer() {
  const navigation = useNavigation();
  const {
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
  } = useUserViewModel();
  const { handlePickImage } = useProfileEdit();

  const handleEditImage = async () => {
    const result = await handlePickImage();
    if (!result) return;
    setNewImageUri(result.uri);
  };

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
