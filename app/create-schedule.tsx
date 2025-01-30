import { Divider } from '@/components/ui/divider/divider';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Icon } from '@/components/ui/icon';
import { Input, InputField } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import dayjs from 'dayjs';
import { Link, useNavigation } from 'expo-router';
import { Clock2, History, LetterText } from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import 'dayjs/locale/ja';
import { roundedDateInFiveMinute } from '@/utils/date.logic';
import DatePicker from 'react-native-date-picker';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
import colors from 'tailwindcss/colors';

export default function CreateSchedulePage() {
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(roundedDateInFiveMinute(dayjs()));
  const [endDate, setEndDate] = useState(
    roundedDateInFiveMinute(dayjs().add(1, 'hour')),
  );
  const [isAllDay, setIsAllDay] = useState(false);
  const [description, setDescription] = useState('');

  const handleSubmit = useCallback(() => {
    const data = {
      title,
      startDate: startDate.toDate(),
      endDate: endDate.toDate(),
      isAllDay,
      description,
    };

    Alert.alert(JSON.stringify(data));
  }, [title, startDate, endDate, isAllDay, description]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSubmit}>
          <Text className="text-xl font-medium text-sky-600 tracking-wide">
            作成
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, handleSubmit]);

  const [isOpenStartDay, setIsOpenStartDay] = useState(false);
  const [isOpenEndDay, setIsOpenEndDay] = useState(false);
  const [isOpenStartTime, setIsOpenStartTime] = useState(false);
  const [isOpenEndTime, setIsOpenEndTime] = useState(false);

  const handlePressDatePicker = (
    type: 'StartDay' | 'StartTime' | 'EndDay' | 'EndTine',
  ) => {
    setIsOpenStartDay(false);
    setIsOpenEndDay(false);
    setIsOpenStartTime(false);
    setIsOpenEndTime(false);

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
    <View className="flex-1">
      <View className="flex flex-row items-center justify-between px-4 py-2 bg-white">
        <FormControl className="flex-1 pl-11">
          <FormControlLabel className="hidden">
            <FormControlLabelText>タイトル</FormControlLabelText>
          </FormControlLabel>

          <Input size="xl" variant="plane" className="">
            <InputField
              type="text"
              value={title}
              onChangeText={(text: string) => setTitle(text)}
              placeholder="タイトルを入力"
            />
          </Input>
        </FormControl>

        <Link href="/" className="p-1">
          <Icon size="xl" as={History} />
        </Link>
      </View>

      <Divider />

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
            onToggle={() => setIsAllDay(!isAllDay)}
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

      <Divider />

      <View className="flex flex-row items-center gap-4 px-4 py-2 mt-5 bg-white">
        <Icon size="xl" as={LetterText} />

        <FormControl className="flex-1">
          <FormControlLabel className="hidden">
            <FormControlLabelText>コメント</FormControlLabelText>
          </FormControlLabel>

          <Textarea className="border-0">
            <TextareaInput
              onChangeText={(text: string) => setDescription(text)}
              placeholder="コメントを入力"
            />
          </Textarea>
        </FormControl>
      </View>
    </View>
  );
}
