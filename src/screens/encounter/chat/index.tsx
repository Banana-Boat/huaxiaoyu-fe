import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useCallback, useEffect, useState} from 'react';
import {BackHandler} from 'react-native';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import PageContainer from '~components/page-container';
import {RootStackParamList} from '~routes/router';
import AssistBoard from './components/assist-board';
import QuitAlert from './components/quit-alert';
import MyGiftedChat from './components/my-gifted-chat';
import chatStore from '~stores/chat/chatStore';
import {observer} from 'mobx-react-lite';

const ChatScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  /** 退出页面提醒 */
  const [isShowAlert, setIsShowAlert] = useState(false);
  // 处理android端系统级返回按键
  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          setIsShowAlert(true);
          return true;
        },
      );
      return () => subscription.remove();
    }, []),
  );
  const quit = useCallback(() => {
    chatStore.finishChat();

    setIsShowAlert(false);
    navigation.goBack();
  }, [navigation]);

  /** 对话相关 */
  const [messageList, setMessageList] = useState<IMessage[]>([]);

  const onSend = useCallback((messageList: IMessage[]) => {
    setMessageList(_messageList =>
      GiftedChat.append(_messageList, messageList),
    );
  }, []);

  useEffect(() => {
    setMessageList([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: require('~assets/images/avatar2.png'),
        },
      },
      {
        _id: 2,
        text: 'My message',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native1',
          avatar: require('~assets/images/avatar.png'),
        },
        sent: true,
        received: true,
        pending: true,
      },
      {
        _id: 3,
        text: 'My message',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native1',
          avatar: require('~assets/images/avatar.png'),
        },
        image:
          'https://img2.baidu.com/it/u=217644621,621859478&fm=253&fmt=auto&app=138&f=JPEG?w=616&h=396',
      },
      {
        _id: 4,
        text: '这是一条系统消息',
        user: {
          _id: 0,
        },
        createdAt: new Date(),
        system: true,
      },
      {
        _id: 6,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: require('~assets/images/avatar2.png'),
        },
      },
      {
        _id: 7,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: require('~assets/images/avatar2.png'),
        },
      },
      {
        _id: 8,
        text: 'My message',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native1',
          avatar: require('~assets/images/avatar.png'),
        },
        sent: true,
        received: true,
        pending: true,
      },
      {
        _id: 9,
        text: 'My message',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native1',
          avatar: require('~assets/images/avatar.png'),
        },
        sent: true,
        received: true,
        pending: true,
      },
      {
        _id: 10,
        text: 'My message',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native1',
          avatar: require('~assets/images/avatar.png'),
        },
      },
      {
        _id: 11,
        text: 'My message',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native1',
          avatar: require('~assets/images/avatar.png'),
        },
        sent: true,
        received: true,
        pending: true,
      },
      {
        _id: 12,
        text: 'My message',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native1',
          avatar: require('~assets/images/avatar.png'),
        },
      },
    ]);
  }, []);

  return (
    <PageContainer
      safeAreaBottom={0}
      hasHeader
      title={chatStore.opponent?.nickname ?? 'Hust_宇航员'}
      leftAction={() => setIsShowAlert(true)}>
      <QuitAlert
        isOpen={isShowAlert}
        toggleIsOpen={flag => setIsShowAlert(flag)}
        quit={quit}
      />

      <AssistBoard />
      <MyGiftedChat
        messages={messageList}
        onSend={onSend}
        user={{
          _id: 1,
          avatar: require('~assets/images/avatar.png'),
        }}
      />
    </PageContainer>
  );
};

export default observer(ChatScreen);
