import {Button, HStack, Modal, Text} from 'native-base';
import React from 'react';

interface IProps {
  isOpen: boolean;
  close: () => void;
  deleteId: number;
  deleteBtnHandle: (opponentId: number) => void;
}

const DeleteConfirmModal = ({
  isOpen,
  close,
  deleteBtnHandle,
  deleteId,
}: IProps) => {
  return (
    <Modal isOpen={isOpen} closeOnOverlayClick={false} onClose={close}>
      <Modal.Content>
        <Modal.Header>再次确认</Modal.Header>
        <Modal.Body>
          <Text mb={4}>你确定要将 她/他 删除吗？</Text>

          <HStack space={2} alignItems="center" justifyContent="center">
            <Button
              onPress={() => deleteBtnHandle(deleteId)}
              variant="solid"
              h={9}
              w={16}
              size="sm"
              rounded={30}
              colorScheme="pink">
              确认
            </Button>
            <Button
              onPress={close}
              rounded={30}
              w={16}
              variant="ghost"
              colorScheme="warmGray">
              取消
            </Button>
          </HStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default DeleteConfirmModal;
