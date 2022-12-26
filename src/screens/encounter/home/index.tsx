import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {observer} from 'mobx-react-lite';
import {Box, Button, Center, Flex, HStack, Spinner, Text} from 'native-base';
import {useEffect, useState} from 'react';
import {LinearGradient} from 'react-native-svg';
import PageContainer from '~components/page-container';
import {RootStackParamList} from '~routes/router';
import chatStore from '~stores/chat/chatStore';
import {ChatStateType} from '~stores/chat/types';
import SpinPlanet from './components/spin-planet';

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [numOfOnline, setNumOfOnline] = useState(0);

  // 获取在线人数 & 随机已注册用户信息
  // useEffect(() => {
  //   getNumOfOnline()
  //     .then(res => {
  //       // setNumOfOnline(res);
  //     })
  //     .catch(res => console.log(res));
  // }, []);

  // 匹配成功直接跳转
  useEffect(() => {
    if (chatStore.state === ChatStateType.CHATTING)
      navigation.navigate('ChatScreen');
  }, [chatStore.state]);

  return (
    <PageContainer safeAreaBottom={0} safeAreaTop={0}>
      <Box
        bg={{
          linearGradient: {
            colors: ['pink.50', 'light.50'],
            start: [0.5, 0],
            end: [0.5, 1],
          },
        }}
        _dark={{
          bg: {
            linearGradient: {
              colors: ['darkBlue.900', 'dark.100'],
              start: [0.5, 0],
              end: [0.5, 1],
            },
          },
        }}
        flex={1}
        justifyContent="space-around">
        <Center>
          <SpinPlanet />
        </Center>
        <Center>
          <Text>当前{numOfOnline}人在线</Text>
          <Button
            onPress={() => chatStore.toggleState()}
            colorScheme="pink"
            w="60%"
            rounded={20}>
            <HStack space={2}>
              {chatStore.state === ChatStateType.MATCHING && (
                <Spinner color="coolGray.300" />
              )}
              <Text color="coolGray.200">
                {chatStore.state === ChatStateType.MATCHING
                  ? '取消匹配'
                  : '开始匹配'}
              </Text>
            </HStack>
          </Button>
        </Center>
      </Box>
    </PageContainer>
  );
};

export default observer(HomeScreen);
