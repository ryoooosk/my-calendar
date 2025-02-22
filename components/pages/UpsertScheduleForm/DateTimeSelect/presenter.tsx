import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Icon } from '@/components/ui/icon';
import { Switch } from '@/components/ui/switch';
import dayjs from 'dayjs';
import { Clock2 } from 'lucide-react-native';
import { Text } from 'react-native';
import { TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
import colors from 'tailwindcss/colors';
import { DateTimePickerType } from './hooks';

type DateTimeSelectPresenterProps = {
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  isAllDay: boolean;
  isOpenStartDay: boolean;
  isOpenEndDay: boolean;
  isOpenStartTime: boolean;
  isOpenEndTime: boolean;
  handlePressDatePicker: (type: DateTimePickerType) => void;
  handleChangeDay: (params: { date: DateType }) => void;
  handleChangeTime: (date: Date) => void;
  handleSetIsAllDay: (isAllDay: boolean) => void;
};

export default function DateTimeSelectPresenter({
  startDate,
  endDate,
  isAllDay,
  isOpenStartDay,
  isOpenEndDay,
  isOpenStartTime,
  isOpenEndTime,
  handlePressDatePicker,
  handleChangeDay,
  handleChangeTime,
  handleSetIsAllDay,
}: DateTimeSelectPresenterProps) {
  return (
    <View>
      <View className="flex flex-row items-center gap-6 px-4 py-3 bg-white">
        <Icon size="xl" as={Clock2} />

        <View className="flex flex-1 h-28">
          <View
            className={`flex flex-row flex-1 items-center ${isAllDay ? 'justify-center' : 'justify-between'} rounded-3xl px-2 ${(isOpenStartDay || isOpenStartTime) && 'bg-sky-100'}`}
          >
            <TouchableOpacity
              onPress={() => handlePressDatePicker(DateTimePickerType.StartDay)}
            >
              <Text
                className={`text-2xl tracking-widest font-medium p-2 text-sky-500 ${isOpenStartDay && 'underline decoration-amber-400'}`}
              >
                {startDate.locale('ja').format('M月DD日(ddd)')}
              </Text>
            </TouchableOpacity>
            {!isAllDay && (
              <TouchableOpacity
                onPress={() =>
                  handlePressDatePicker(DateTimePickerType.StartTime)
                }
              >
                <Text
                  className={`text-3xl tracking-widest font-medium p-2 text-sky-500 ${isOpenStartTime && 'underline decoration-amber-400'}`}
                >
                  {startDate.format('HH:mm')}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View
            className={`flex flex-row flex-1 items-center ${isAllDay ? 'justify-center' : 'justify-between'} rounded-3xl px-2 ${(isOpenEndDay || isOpenEndTime) && 'bg-sky-100'}`}
          >
            <TouchableOpacity
              onPress={() => handlePressDatePicker(DateTimePickerType.EndDay)}
            >
              <Text
                className={`text-2xl tracking-widest font-medium p-2 text-sky-500 ${isOpenEndDay && 'underline decoration-amber-400'}`}
              >
                {endDate.locale('ja').format('M月DD日(ddd)')}
              </Text>
            </TouchableOpacity>
            {!isAllDay && (
              <TouchableOpacity
                onPress={() =>
                  handlePressDatePicker(DateTimePickerType.EndTime)
                }
              >
                <Text
                  className={`text-3xl tracking-widest font-medium p-2 text-sky-500 ${isOpenEndTime && 'underline decoration-amber-400'}`}
                >
                  {endDate.format('HH:mm')}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <FormControl className="flex items-center">
          <FormControlLabel>
            <FormControlLabelText className="text-slate-600">
              終日
            </FormControlLabelText>
          </FormControlLabel>

          <Switch
            trackColor={{ false: colors.gray[300], true: colors.amber[400] }}
            value={isAllDay}
            onToggle={handleSetIsAllDay}
          />
        </FormControl>
      </View>

      {(isOpenStartDay || isOpenEndDay) && (
        <View className="flex items-center p-2 bg-white">
          <DateTimePicker
            mode="single"
            date={isOpenStartDay ? startDate.toDate() : endDate.toDate()}
            locale="ja"
            firstDayOfWeek={1}
            initialView="day"
            height={360}
            calendarTextStyle={{
              fontSize: 15,
              color: colors.slate[700],
            }}
            headerContainerStyle={{ padding: 0 }}
            headerTextStyle={{
              color: colors.slate[600],
              fontSize: 16,
              fontWeight: '500',
              letterSpacing: 0.5,
            }}
            headerButtonColor={colors.sky[600]}
            headerButtonStyle={{
              borderWidth: 1,
              borderColor: colors.slate[300],
              padding: 6,
              borderRadius: 8,
            }}
            weekDaysContainerStyle={{
              borderBottomColor: colors.slate[300],
            }}
            weekDaysTextStyle={{
              fontSize: 15,
              color: colors.slate[700],
            }}
            selectedItemColor={colors.amber[400]}
            selectedTextStyle={{ fontSize: 17, fontWeight: '700' }}
            onChange={handleChangeDay}
          />
        </View>
      )}
      {(isOpenStartTime || isOpenEndTime) && (
        <View className="h-80 flex items-center justify-center bg-white">
          <DatePicker
            date={isOpenStartTime ? startDate.toDate() : endDate.toDate()}
            mode="time"
            minuteInterval={5}
            onDateChange={handleChangeTime}
          />
        </View>
      )}
    </View>
  );
}
