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
import userStore from '~stores/user/userStore';

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
  const onSend = useCallback((messageList: IMessage[]) => {
    chatStore.updateMessageList(messageList);
    chatStore.sendMessage(messageList[0]);
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
        messages={chatStore.messageList}
        onSend={onSend}
        user={{
          _id: userStore.user.id,
          avatar: require('~assets/images/avatar.png'),
        }}
      />
    </PageContainer>
  );
};

export default observer(ChatScreen);
