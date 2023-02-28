import {
  Button,
  HStack,
  Icon,
  Modal,
  Pressable,
  Toast,
  useColorMode,
  VStack,
} from 'native-base';
import {useCallback, useEffect, useRef, useState} from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AudioRecord from 'react-native-audio-record';
import RNFS from 'react-native-fs';

const AudioFileName = 'audio.wav';

const options = {
  sampleRate: 16000, // default 44100
  channels: 1, // 1 or 2, default 1
  bitsPerSample: 8, // 8 or 16, default 16
  wavFile: AudioFileName,
};

interface IProps {
  isOpen: boolean;
  close: () => void;
  submit: (audio: string) => void;
}

const AudioModal = ({isOpen, close, submit}: IProps) => {
  const {colorMode} = useColorMode();

  const [audio, setAudio] = useState('');
  const [isBtnTouching, setIsBtnTouching] = useState(false);
  const timer = useRef(-1);

  // 避免warning
  useEffect(() => {
    AudioRecord.init(options);
    AudioRecord.on('data', () => {});
  }, []);

  const onPressIn = useCallback(() => {
    setIsBtnTouching(true);
    try {
      AudioRecord.start();
      timer.current = setTimeout(async () => {
        Toast.show({description: '单条语音不可超过40秒', duration: 2000});

        setIsBtnTouching(false);
        const url = await AudioRecord.stop();
        const res = await RNFS.readFile(url, 'base64');
        setAudio(res);

        clearTimeout(timer.current);
      }, 40000);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const onPressOut = useCallback(async () => {
    setIsBtnTouching(false);
    try {
      const url = await AudioRecord.stop();
      const res = await RNFS.readFile(url, 'base64');
      setAudio(res);
    } catch (err) {
      console.log(err);
    }
    clearTimeout(timer.current);
  }, []);

  return (
    <Modal isOpen={isOpen} closeOnOverlayClick={false}>
      <Modal.Content>
        <Modal.Header>发送语音</Modal.Header>
        <Modal.Body>
          <VStack alignItems="center">
            <Pressable
              onPressIn={onPressIn}
              onPressOut={onPressOut}
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
          <HStack mt={2} space={2} alignItems="center" justifyContent="center">
            <Button
              onPress={() => {
                submit(audio);
                close();
                setAudio('');
              }}
              isDisabled={audio === ''}
              variant="ghost"
              w={16}
              rounded={30}
              colorScheme="pink">
              发送
            </Button>
            <Button
              onPress={() => {
                close();
                setAudio('');
              }}
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
