import { View } from 'react-native';

export const Divider = ({ className }: { className?: string }) => {
  return <View className={`h-[1px] bg-slate-300 ${className}`} />;
};
