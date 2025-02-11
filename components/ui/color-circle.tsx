import { Check } from 'lucide-react-native';
import { View } from 'react-native';
import { Icon } from './icon';

export default function ColorCircle({
  color,
  isSelected,
  className,
}: { color: string; isSelected: boolean; className?: string }) {
  return (
    <View
      className={`relative w-12 h-12 rounded-full border border-gray-200 ${className}`}
      style={{ backgroundColor: color }}
    >
      {isSelected && (
        <Icon
          as={Check}
          className="absolute right-0 bottom-0 bg-zinc-500 rounded-full text-white "
        />
      )}
    </View>
  );
}
