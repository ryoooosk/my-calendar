import { LucideIcon } from 'lucide-react-native';
import { Text, View } from 'react-native';
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from './ui/alert-dialog';
import { Button, ButtonText } from './ui/button';
import { Icon } from './ui/icon';

export type AlertDeleteDialogProps = {
  isAlertOpen: boolean;
  icon?: LucideIcon;
  headerText?: string;
  bodyText?: string;
  submitLabel: string;
  submitActionHandle: (isSubmit: boolean) => void;
};

export default function AlertDeleteDialog({
  isAlertOpen,
  icon,
  headerText,
  bodyText,
  submitLabel,
  submitActionHandle,
}: AlertDeleteDialogProps) {
  return (
    <AlertDialog isOpen={isAlertOpen}>
      <AlertDialogBackdrop />
      <AlertDialogContent className="gap-4 items-center">
        {icon && (
          <View className="rounded-full h-[52px] w-[52px] bg-background-error items-center justify-center">
            <Icon as={icon} size="lg" className="stroke-error-500" />
          </View>
        )}
        <AlertDialogHeader>
          <Text className="text-lg font-medium tracking-wide">
            {headerText}
          </Text>
        </AlertDialogHeader>
        {bodyText && (
          <AlertDialogBody>
            <Text className="tracking-wide text-gray-800">{bodyText}</Text>
          </AlertDialogBody>
        )}
        <AlertDialogFooter className="mt-5">
          <Button
            variant="outline"
            action="secondary"
            onPress={() => submitActionHandle(false)}
          >
            <ButtonText>キャンセル</ButtonText>
          </Button>
          <Button action="negative" onPress={() => submitActionHandle(true)}>
            <ButtonText>{submitLabel}</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
