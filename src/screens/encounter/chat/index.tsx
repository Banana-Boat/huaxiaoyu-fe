import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useCallback, useEffect, useState} from 'react';
import {BackHandler} from 'react-native';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import PageContainer from '~components/page-container';
import {RootStackParamList} from '~routes/router';
import AssistBoard from './components/assist-board';
import QuitAlert from './components/quit-alert';

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
    // 退出处理逻辑...

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
    ]);
  }, []);

  return (
    <PageContainer
      hasHeader
      title="猪皮香蕉船"
      leftAction={() => setIsShowAlert(true)}>
      <QuitAlert
        isOpen={isShowAlert}
        toggleIsOpen={flag => setIsShowAlert(flag)}
        quit={quit}
      />

      <AssistBoard />

      <GiftedChat
        wrapInSafeArea={false}
        messages={messageList}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </PageContainer>
  );
};

export default ChatScreen;
