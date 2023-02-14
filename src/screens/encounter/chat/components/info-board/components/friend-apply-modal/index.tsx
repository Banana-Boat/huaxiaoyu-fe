import {Button, HStack, Modal, Text} from 'native-base';

interface IProps {
  isOpen: boolean;
  reject: () => void;
  approve: () => void;
}

const FriendApplyModal: React.FC<IProps> = ({isOpen, reject, approve}) => {
  return (
    <Modal isOpen={isOpen}>
      <Modal.Content>
        <Modal.Header>好友申请</Modal.Header>
        <Modal.Body>
          <Text>对方向你发来了好友申请，你的回复是？</Text>
          <HStack mt={4} space={2} alignItems="center" justifyContent="center">
            <Button
              onPress={approve}
              variant="solid"
              height={9}
              size="sm"
              rounded={30}
              colorScheme="pink">
              同意申请
            </Button>
            <Button
              onPress={reject}
              rounded={30}
              variant="ghost"
              colorScheme="warmGray">
              狠心拒绝
            </Button>
          </HStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default FriendApplyModal;
