import {AlertDialog, Button} from 'native-base';
import {useRef} from 'react';

interface IProps {
  isOpen: boolean;
  toggleIsOpen: (flag: boolean) => void;
  quit: () => void;
}

const QuitAlert: React.FC<IProps> = ({isOpen, toggleIsOpen, quit}) => {
  const cancelRef = useRef(null);

  return (
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen}>
      <AlertDialog.Content>
        <AlertDialog.Header>退出提醒</AlertDialog.Header>
        <AlertDialog.Body>
          退出聊天后将不能再次向 她/他 发起聊天，你确定要退出吗？
        </AlertDialog.Body>
        <AlertDialog.Footer pb={2} pt={1}>
          <Button.Group>
            <Button
              onPress={() => toggleIsOpen(false)}
              variant="ghost"
              colorScheme="gray">
              取消
            </Button>
            <Button onPress={quit} variant="ghost" colorScheme="danger">
              确定
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default QuitAlert;
