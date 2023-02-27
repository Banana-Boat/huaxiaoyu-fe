import {
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Modal,
  Pressable,
  useColorMode,
  VStack,
} from 'native-base';
import {useState} from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';

interface IProps {
  isOpen: boolean;
  close: () => void;
  submit: (audio: string) => void;
}

const AudioModal = ({isOpen, close, submit}: IProps) => {
  const {colorMode} = useColorMode();
  const [audio, setAudio] = useState('');
  const [isBtnTouching, setIsBtnTouching] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={close}>
      <Modal.Content>
        <Modal.Header>发送语音</Modal.Header>
        <Modal.Body>
          <VStack alignItems="center">
            <Box>语音波形</Box>
            <Pressable
              onPressIn={() => setIsBtnTouching(true)}
              onPressOut={() => setIsBtnTouching(false)}
              bgColor={colorMode === 'dark' ? 'warmGray.700' : 'warmGray.200'}
              borderRadius="full"
              style={{width: 60, height: 60}}
              alignItems="center"
              justifyContent="center">
              <Icon
                as={Ionicon}
                name="mic"
                size="4xl"
                color={
                  isBtnTouching
                    ? 'pink.500'
                    : colorMode === 'dark'
                    ? 'warmGray.500'
                    : 'warmGray.400'
                }
              />
            </Pressable>
          </VStack>
          <HStack mt={4} space={2} alignItems="center" justifyContent="center">
            <Button
              onPress={() => submit(audio)}
              variant="solid"
              h={9}
              w={16}
              size="sm"
              rounded={30}
              colorScheme="pink">
              发送
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

export default AudioModal;
