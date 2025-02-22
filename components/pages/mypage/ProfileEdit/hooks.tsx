import {
  ImageResult,
  SaveFormat,
  manipulateAsync,
} from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export const useProfileEdit = () => {
  const handlePickImage = async (): Promise<ImageResult | undefined> => {
    try {
      const selectedImage = await pickImageFromLibray();
      if (selectedImage.canceled) return;

      const result = await resizeImage(selectedImage.assets[0].uri);
      return result;
    } catch (error) {
      console.error('Image manipulation failed:', error);
      Alert.alert('画像の取得に失敗しました');
    }
  };

  return { handlePickImage };
};

async function resizeImage(imageUri: string) {
  const result = await manipulateAsync(imageUri, [{ resize: { width: 500 } }], {
    compress: 1,
    format: SaveFormat.PNG,
  });
  return result;
}

async function pickImageFromLibray(): Promise<ImagePicker.ImagePickerResult> {
  // No permissions request is necessary for launching the image library
  const selected = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
    exif: false,
  });
  return selected;
}
