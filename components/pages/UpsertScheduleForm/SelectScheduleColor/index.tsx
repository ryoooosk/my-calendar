import ColorCircle from '@/components/ColorCircle';
import { Icon } from '@/components/ui/icon';
import { SCHEDULE_DEFAULT_COLORS } from '@/constants/ScheduleColors';
import { Palette } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';

export default function SelectScheduleColorContainer({
  selectedColor,
  setSelectedColor,
}: { selectedColor: string; setSelectedColor: (color: string) => void }) {
  return (
    <View className="flex flex-row items-center gap-6 px-4 py-3 bg-white">
      <Icon size="xl" as={Palette} />

      <View className="flex flex-row flex-1 gap-3 ml-3">
        {SCHEDULE_DEFAULT_COLORS.map((color) => {
          return (
            <TouchableOpacity
              key={color}
              onPress={() => setSelectedColor(color)}
            >
              <ColorCircle color={color} isSelected={selectedColor === color} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
