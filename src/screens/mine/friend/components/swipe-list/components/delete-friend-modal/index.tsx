import {
  Button,
  FormControl,
  HStack,
  Input,
  Modal,
  Text,
  WarningOutlineIcon,
} from 'native-base';
import React, {useCallback, useState} from 'react';

interface IProps {
  isOpen: boolean;
  close: () => void;
  submit: (phoneNum: string) => void;
}

const PhoneNumInputModal = ({isOpen, close, submit}: IProps) => {
  const [phoneNum, setPhoneNum] = useState('');
  const [error, setError] = useState('');

  const validate = useCallback(() => {
    let res = true;

    if (phoneNum && !/^1\d{10}$/.test(phoneNum)) {
      setError('电话号码格式有误');
      res = false;
    } else setError('');

    return res;
  }, [phoneNum, error]);

  const submitBtnHandle = useCallback(() => {
    if (!validate()) return;

    submit(phoneNum);
  }, [phoneNum]);

  return (
    <Modal isOpen={isOpen} onClose={close}>
      <Modal.Content>
        <Modal.Header>填写手机号码</Modal.Header>
        <Modal.Body>
          <Text mb={4}>您还未记录手机号码，请先填写</Text>

          <FormControl isInvalid={error !== ''}>
            <Input
              value={phoneNum ?? ''}
              onChangeText={phoneNum => setPhoneNum(phoneNum)}
              size="md"
              placeholder="手机号码"
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              {error}
            </FormControl.ErrorMessage>
          </FormControl>
          <HStack mt={4} space={2} alignItems="center" justifyContent="center">
            <Button
              onPress={submitBtnHandle}
              variant="solid"
              h={9}
              w={16}
              size="sm"
              rounded={30}
              colorScheme="pink">
              提交
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

export default PhoneNumInputModal;
