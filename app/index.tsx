import Calendars from '@/components/Calendar';
import Header from '@/components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomePage() {
  return (
    <SafeAreaView>
      <Header />
      <Calendars />
    </SafeAreaView>
  );
}
