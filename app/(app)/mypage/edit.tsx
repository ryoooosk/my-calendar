import ProfileEditContainer from '@/components/pages/mypage/edit/container';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

export default function ProfileEditPage() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      presentation: 'modal',
      title: 'プロフィール編集',
      headerBackTitle: 'キャンセル',
    });
  }, [navigation]);

  return (
    <View className="flex-1 bg-white">
      <ProfileEditContainer />
    </View>
  );
}
