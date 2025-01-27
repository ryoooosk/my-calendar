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
import { Link } from 'expo-router';
import { Clock2, History, LetterText } from 'lucide-react-native';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

export default function CreateSchedule() {
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs().add(1, 'hour'));
  const startDay = startDate.locale('ja').format('M月DD日(ddd)');
  const startTime = startDate.format('HH:mm');
  const endDay = endDate.locale('ja').format('M月DD日(ddd)');
  const endTime = endDate.format('HH:mm');

  return (
    <View className="flex-1">
      <View className="flex flex-row items-center justify-between px-4 py-2 bg-white">
        <FormControl className="flex-1 pl-11">
          <FormControlLabel className="hidden">
            <FormControlLabelText>タイトル</FormControlLabelText>
          </FormControlLabel>

          <Input size="xl" variant="plane" className="">
            <InputField placeholder="タイトルを入力" />
          </Input>
        </FormControl>

        <Link href="/" className="p-1">
          <Icon size="xl" as={History} />
        </Link>
      </View>

      <Divider />

      <View className="flex flex-row items-center gap-7 px-4 py-3 bg-white">
        <Icon size="xl" as={Clock2} />

        <View className="flex flex-1">
          <View className="flex flex-row items-center justify-between">
            <TouchableOpacity>
              <Text className="text-2xl tracking-widest font-medium p-2 text-sky-500">
                {startDay}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text className="text-3xl tracking-widest font-medium p-2 text-sky-500">
                {startTime}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex flex-row items-center justify-between">
            <TouchableOpacity>
              <Text className="text-2xl tracking-widest font-medium p-2 text-sky-500">
                {endDay}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text className="text-3xl tracking-widest font-medium p-2 text-sky-500">
                {endTime}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <FormControl className="flex items-center">
          <FormControlLabel>
            <FormControlLabelText className="text-slate-600">
              終日
            </FormControlLabelText>
          </FormControlLabel>

          <Switch />
        </FormControl>
      </View>

      <Divider />

      <View className="flex flex-row items-center gap-4 px-4 py-2 mt-5 bg-white">
        <Icon size="xl" as={LetterText} />

        <FormControl className="flex-1">
          <FormControlLabel className="hidden">
            <FormControlLabelText>コメント</FormControlLabelText>
          </FormControlLabel>

          <Textarea className="border-0">
            <TextareaInput placeholder="コメントを入力" />
          </Textarea>
        </FormControl>
      </View>
    </View>
  );
}
