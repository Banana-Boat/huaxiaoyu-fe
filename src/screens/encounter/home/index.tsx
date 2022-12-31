import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {observer} from 'mobx-react-lite';
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  Pressable,
  Spinner,
  Text,
} from 'native-base';
import {useCallback, useEffect, useRef, useState} from 'react';
import PageContainer from '~components/page-container';
import {RootStackParamList} from '~routes/router';
import chatStore from '~stores/chat/chatStore';
import {ChatStateType} from '~stores/chat/types';
import {IUser} from '~stores/user/types';
import {getNumOfOnline, getRandomUserInfo} from './api';
import SpinPlanet from './components/spin-planet';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Animated, Easing} from 'react-native';
import Sound from 'react-native-sound';
import {getMusic} from './utils';

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  /** 匹配成功（跳转、停止音乐） */
  useEffect(() => {
    if (chatStore.state === ChatStateType.CHATTING) {
      navigation.navigate('ChatScreen');
      musicAnim.reset();
      music?.pause();
    }
  }, [chatStore.state]);

  /** 音乐相关 */
  const [music, setMusic] = useState<Sound>();
  const [isPlayMusic, setIsPlayMusic] = useState(true);
  const musicRotateAnim = useRef(new Animated.Value(0)).current;
  const musicAnim = useRef(
    Animated.loop(
      Animated.timing(musicRotateAnim, {
        easing: Easing.linear,
        duration: 5000,
        useNativeDriver: true,
        toValue: 1,
      }),
    ),
  ).current;

  const toggleMusic = useCallback(() => {
    setIsPlayMusic(flag => {
      if (!flag) {
        musicAnim.start();
        music?.play();

        return true;
      } else {
        musicAnim.reset();
        music?.pause();

        return false;
      }
    });
  }, [musicAnim, music]);

  useEffect(() => {
    getMusic().then(res => {
      res.play();
      musicAnim.start();
      setMusic(res);
    });
  }, []);

  // 注销登录时，结束音乐
  useEffect(() => {
    return () => {
      music?.release();
    };
  }, [music]);

  /** 获取在线人数 & 随机已注册用户信息 */
  const [numOfOnline, setNumOfOnline] = useState(0);
  const [randomUserInfoList, setRandomUserInfoList] = useState<IUser[]>([]);

  useEffect(() => {
    setInterval(
      () =>
        getNumOfOnline()
          .then(res => setNumOfOnline(res))
          .catch(res => console.log(res)),
      2000,
    );
    getRandomUserInfo(20)
      .then(res => setRandomUserInfoList(res))
      .catch(res => console.log(res));
  }, []);

  return (
    <PageContainer safeAreaBottom={0} safeAreaTop={0}>
      <Box
        bg={{
          linearGradient: {
            colors: ['darkBlue.900', 'dark.100'],
            start: [0.5, 0],
            end: [0.5, 1],
          },
        }}
        flex={1}>
        <Animated.View
          style={{
            position: 'absolute',
            zIndex: 1000,
            right: 30,
            top: useSafeAreaInsets().top + 20,
            transform: [
              {
                rotateZ: musicRotateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          }}>
          <Pressable onPress={toggleMusic}>
            <Icon size="md" as={Ionicon} name="musical-notes" />
          </Pressable>
        </Animated.View>

        <Center h="75%">
          <SpinPlanet userInfoList={randomUserInfoList} />
        </Center>

        <Flex
          h="25%"
          py={5}
          align="center"
          roundedTop={50}
          bg="light.50"
          _dark={{bg: 'dark.100'}}>
          <Text>当前 {numOfOnline} 人正在探索宇宙</Text>
          <Button
            onPress={() => chatStore.toggleState()}
            colorScheme="pink"
            w="60%"
            mt={2}
            rounded={20}>
            <HStack space={2}>
              {chatStore.state === ChatStateType.MATCHING && (
                <Spinner color="coolGray.300" />
              )}
              <Text color="coolGray.200">
                {chatStore.state === ChatStateType.MATCHING
                  ? '取消航程'
                  : '开启星际旅行'}
              </Text>
            </HStack>
          </Button>
        </Flex>
      </Box>
    </PageContainer>
  );
};

export default observer(HomeScreen);
