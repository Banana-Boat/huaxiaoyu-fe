import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {observer} from 'mobx-react-lite';
import {Button, HStack, Spinner, Text} from 'native-base';
import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import PageContainer from '~components/page-container';
import {RootStackParamList} from '~routes/router';
import chatStore from '~stores/chat/chatStore';
import {ChatStateType} from '~stores/chat/types';

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // 匹配成功直接跳转
  useEffect(() => {
    if (chatStore.state === ChatStateType.CHATTING)
      navigation.navigate('ChatScreen');
  }, [chatStore.state]);

  return (
    <PageContainer safeAreaBottom={0}>
      <Button
        onPress={() => chatStore.toggleState()}
        alignSelf="center"
        colorScheme="teal"
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
      {/* <Button
        onPress={() => chatStore.detectState()}
        alignSelf="center"
        colorScheme="red"
        w="60%"
        rounded={20}>
        心跳检测
      </Button> */}
    </PageContainer>
  );
};

export default observer(HomeScreen);
