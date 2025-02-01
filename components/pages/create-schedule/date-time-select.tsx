import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Icon } from '@/components/ui/icon';
import { Switch } from '@/components/ui/switch';
import dayjs from 'dayjs';
import { Clock2 } from 'lucide-react-native';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
import colors from 'tailwindcss/colors';

type DateTimeSelectProps = {
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  isAllDay: boolean;
  setStartDate: (date: dayjs.Dayjs) => void;
  setEndDate: (date: dayjs.Dayjs) => void;
  setIsAllDay: (isAllDay: boolean) => void;
};

export default function DateTimeSelect({
  startDate,
  endDate,
  isAllDay,
  setStartDate,
  setEndDate,
  setIsAllDay,
}: DateTimeSelectProps) {
  const [isOpenStartDay, setIsOpenStartDay] = useState(false);
  const [isOpenEndDay, setIsOpenEndDay] = useState(false);
  const [isOpenStartTime, setIsOpenStartTime] = useState(false);
  const [isOpenEndTime, setIsOpenEndTime] = useState(false);

  const closeAllDatePicker = () => {
    setIsOpenStartDay(false);
    setIsOpenEndDay(false);
    setIsOpenStartTime(false);
    setIsOpenEndTime(false);
  };

  const handlePressDatePicker = (
    type: 'StartDay' | 'StartTime' | 'EndDay' | 'EndTine',
  ) => {
    closeAllDatePicker();

    switch (type) {
      case 'StartDay':
        setIsOpenStartDay(true);
        break;
      case 'StartTime':
        setIsOpenStartTime(true);
        break;
      case 'EndDay':
        setIsOpenEndDay(true);
        break;
      case 'EndTine':
        setIsOpenEndTime(true);
        break;

      default:
        throw new Error('Invalid type');
    }
  };

  const handleChangeDay = (params: { date: DateType }) => {
    const date = dayjs(params.date);

    if (isOpenStartDay) {
      const newDate = startDate
        .set('year', date.year())
        .set('month', date.month())
        .set('date', date.date());
      return setStartDate(newDate);
    }
    if (isOpenEndDay) {
      const newDate = endDate
        .set('year', date.year())
        .set('month', date.month())
        .set('date', date.date());
      return setEndDate(newDate);
    }
  };

  const handleChangeTime = (date: Date) => {
    const newDate = dayjs(date);

    if (isOpenStartTime) {
      const updatedDate = startDate
        .set('hour', newDate.hour())
        .set('minute', newDate.minute());
      return setStartDate(updatedDate);
    }
    if (isOpenEndTime) {
      const updatedDate = endDate
        .set('hour', newDate.hour())
        .set('minute', newDate.minute());
      return setEndDate(updatedDate);
    }
  };

  return (
    <View>
      <View className="flex flex-row items-center gap-6 px-4 py-3 bg-white">
        <Icon size="xl" as={Clock2} />

        <View className="flex flex-1 h-28">
          <View
            className={`flex flex-row flex-1 items-center ${isAllDay ? 'justify-center' : 'justify-between'} rounded-3xl px-2 ${(isOpenStartDay || isOpenStartTime) && 'bg-sky-100'}`}
          >
            <TouchableOpacity onPress={() => handlePressDatePicker('StartDay')}>
              <Text
                className={`text-2xl tracking-widest font-medium p-2 text-sky-500 ${isOpenStartDay && 'underline decoration-amber-400'}`}
              >
                {startDate.locale('ja').format('M月DD日(ddd)')}
              </Text>
            </TouchableOpacity>
            {!isAllDay && (
              <TouchableOpacity
                onPress={() => handlePressDatePicker('StartTime')}
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
            <TouchableOpacity onPress={() => handlePressDatePicker('EndDay')}>
              <Text
                className={`text-2xl tracking-widest font-medium p-2 text-sky-500 ${isOpenEndDay && 'underline decoration-amber-400'}`}
              >
                {endDate.locale('ja').format('M月DD日(ddd)')}
              </Text>
            </TouchableOpacity>
            {!isAllDay && (
              <TouchableOpacity
                onPress={() => handlePressDatePicker('EndTine')}
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
            onToggle={() => {
              setIsAllDay(!isAllDay);
              closeAllDatePicker();
            }}
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
