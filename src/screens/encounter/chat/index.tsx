import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useCallback, useState} from 'react';
import {BackHandler} from 'react-native';
import {IMessage} from 'react-native-gifted-chat';
import PageContainer from '~components/page-container';
import {RootStackParamList} from '~routes/router';
import Infoboard from './components/info-board';
import QuitAlert from './components/quit-alert';
import MyGiftedChat from './components/my-gifted-chat';
import chatStore from '~stores/chat/chatStore';
import {observer} from 'mobx-react-lite';
import userStore from '~stores/user/userStore';
import {ITopic} from './types';

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

  /** 推荐话题相关 */
  const [topicList, setTopicList] = useState<ITopic[]>([
    {
      type: '体育',
      title: '世界杯冠军出炉',
      content: '你觉得今年世界杯冠军如何',
      optionList: ['实至名归', '运气好罢了'],
    },
  ]);

  /** 对话相关 */
  const onSend = useCallback((messageList: IMessage[]) => {
    chatStore.addMessage(messageList);
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

      <Infoboard topicList={topicList} />

      <MyGiftedChat
        messages={chatStore.messageList}
        onSend={onSend}
        user={{
          _id: userStore.user.id,
          avatar:
            userStore.user.headPhoto ?? require('~assets/images/avatar2.png'),
        }}
      />
    </PageContainer>
  );
};

export default observer(ChatScreen);
