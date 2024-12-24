import { Link } from 'expo-router';
import LoginForm from './LoginForm';
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from './ui/alert-dialog';
import { Heading } from './ui/heading';

type LoginDialogProps = {
  isShow: boolean;
  setIsShow: (value: boolean) => void;
};

export default function LoginDialog({ isShow, setIsShow }: LoginDialogProps) {
  return (
    <AlertDialog isOpen={isShow} onClose={() => setIsShow(false)} size="md">
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading className="text-typography-950 font-semibold" size="lg">
            ログインする
          </Heading>
        </AlertDialogHeader>

        <AlertDialogBody className="mt-3 mb-4">
          <LoginForm setIsShow={setIsShow} />
        </AlertDialogBody>

        <AlertDialogFooter className="flex justify-center mt-2">
          <Link href="/signup" onPress={() => setIsShow(false)}>
            アカウント作成はこちら
          </Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
