import { HStack } from '@/components/ui/hstack';
import { Spinner } from '@/components/ui/spinner';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from 'tailwindcss/colors';

export default function LoadingScreen() {
  return (
    <SafeAreaView className="flex items-center justify-center flex-1">
      <HStack space="sm">
        <Spinner color={colors.sky[600]} />
        <Text className="text-xl">Loading...</Text>
      </HStack>
    </SafeAreaView>
  );
}
