import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
} from './ui/alert-dialog';
import { Heading } from './ui/heading';
import LoginForm from './LoginForm';
import {} from './ui/button';

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
          <LoginForm />
        </AlertDialogBody>
      </AlertDialogContent>
    </AlertDialog>
  );
}
