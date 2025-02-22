import { Icon } from '@/components/ui/icon';
import { useUserViewModel } from '@/hooks/view-model/useUserViewModel';
import { SaveFormat, manipulateAsync } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from 'expo-router';
import { X } from 'lucide-react-native';
import { useEffect } from 'react';
import { Button, TouchableOpacity } from 'react-native';
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
      handlePickImage={pickImage}
    />
  );
}
