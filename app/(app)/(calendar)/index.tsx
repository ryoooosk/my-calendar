import CalendarListContainer from '@/components/pages/CalendarList';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CalendarListPage() {
  return (
    <SafeAreaView className="flex-1 relative bg-white">
      <CalendarListContainer />
    </SafeAreaView>
  );
}
