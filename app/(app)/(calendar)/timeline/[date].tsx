import TimelineContainer from '@/components/pages/Timeline';
import { useLocalSearchParams } from 'expo-router';

export default function TimelinePage() {
  const { date } = useLocalSearchParams();
  const dateString = Array.isArray(date) ? date[0] : date;

  return <TimelineContainer date={dateString} />;
}
