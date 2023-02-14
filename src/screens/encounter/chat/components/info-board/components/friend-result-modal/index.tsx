import {Box, Button, Modal, Text} from 'native-base';
import {FriendApplyResultType} from '~stores/chat/types';

interface IProps {
  isOpen: boolean;
  result: FriendApplyResultType;
  close: () => void;
}

const FriendResultModal: React.FC<IProps> = ({isOpen, result, close}) => {
  return (
    <Modal isOpen={isOpen}>
      <Modal.Content>
        <Modal.Header>好友申请</Modal.Header>
        <Modal.Body>
          {result === FriendApplyResultType.SUCCESS && (
            <Text>对方同意了你的好友申请，恭喜你们已经成为朋友</Text>
          )}
          {result === FriendApplyResultType.FAIL && (
            <Text>对方拒绝了你的好友申请，再聊聊看？</Text>
          )}
          <Box mt={4} alignItems="center" justifyContent="center">
            <Button
              onPress={close}
              variant="solid"
              height={9}
              size="sm"
              rounded={30}
              colorScheme="pink">
              知道了
            </Button>
          </Box>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default FriendResultModal;
