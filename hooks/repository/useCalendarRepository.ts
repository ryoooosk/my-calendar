import * as Calendar from 'expo-calendar';
import { Alert } from 'react-native';

export function useCalendarRepository() {
  async function requestPermission(): Promise<Calendar.PermissionStatus> {
    try {
      const { status }: Calendar.PermissionResponse =
        await Calendar.requestCalendarPermissionsAsync();
      return status;
    } catch (error) {
      Alert.alert('カレンダーの権限を取得できませんでした');
      throw error;
    }
  }

  async function findManyCalendars(
    entityType: Calendar.EntityTypes = Calendar.EntityTypes.EVENT,
  ): Promise<Calendar.Calendar[]> {
    try {
      const calendars: Calendar.Calendar[] =
        await Calendar.getCalendarsAsync(entityType);
      return calendars;
    } catch (error) {
      Alert.alert('カレンダーの取得に失敗しました');
      throw error;
    }
  }

  async function findDefaultCalendar(): Promise<Calendar.Calendar> {
    try {
      return await Calendar.getDefaultCalendarAsync();
    } catch (error) {
      Alert.alert('デフォルトのカレンダーの取得に失敗しました');
      throw error;
    }
  }

  return { requestPermission, findManyCalendars, findDefaultCalendar };
}
