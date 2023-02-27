import {
  Box,
  HStack,
  Icon,
  IconButton,
  Pressable,
  Text,
  useColorMode,
} from 'native-base';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import RNFS from 'react-native-fs';
import {uuidv4} from 'react-native-compressor';
import {loadAudioInDocument} from '~utils';
import Sound from 'react-native-sound';
import userStore from '~stores/user/userStore';
import {ColorType} from 'native-base/lib/typescript/components/types';

interface IProps {
  sendId: number;
  audioOfBase64?: string;
}

const AudioMessage = ({sendId, audioOfBase64}: IProps) => {
  const {colorMode} = useColorMode();
  const fileName = `${uuidv4()}.wav`;
  const audioRef = useRef<Sound>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [second, setSecond] = useState(0);

  useEffect(() => {
    if (!audioOfBase64) return;

    RNFS.writeFile(
      `${RNFS.DocumentDirectoryPath}/${fileName}`,
      audioOfBase64,
      'base64',
    ).then(() => {
      loadAudioInDocument(fileName).then(audio => {
        audioRef.current = audio;
        setSecond(Math.ceil(audio.getDuration()));
      });
    });
  }, []);

  const onPressHandle = useCallback(async () => {
    if (!audioRef.current) return;

    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play(success => setIsPlaying(!success));

    setIsPlaying(flag => !flag);
  }, [isPlaying]);

  const iconColor = useMemo<ColorType>(() => {
    if (userStore.user.id === sendId) return 'warmGray.200';
    return colorMode === 'dark' ? 'warmGray.500' : 'warmGray.400';
  }, [colorMode, userStore.user.id]);

  const textColor = useMemo<ColorType>(() => {
    if (userStore.user.id === sendId) return 'warmGray.200';
    return colorMode === 'dark' ? 'warmGray.50' : 'dark.400';
  }, [colorMode, userStore.user.id]);

  return (
    <Box w="120" px={2} pt={0.5}>
      {audioOfBase64 ? (
        <Pressable
          onPress={onPressHandle}
          flexDirection="row"
          alignItems="center">
          {isPlaying ? (
            <Icon as={Ionicon} name="pause" size="md" color={iconColor} />
          ) : (
            <Icon as={Ionicon} name="play" size="md" color={iconColor} />
          )}
          <Text color={textColor} fontSize="md" ml={2}>
            {second ? `${second}''` : ''}
          </Text>
        </Pressable>
      ) : (
        <Text color={textColor} fontSize="md">
          语音无法播放
        </Text>
      )}
    </Box>
  );
};

export default AudioMessage;
