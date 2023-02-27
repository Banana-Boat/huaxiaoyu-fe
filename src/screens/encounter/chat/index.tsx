import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useCallback, useEffect, useState} from 'react';
import {BackHandler} from 'react-native';
import {IMessage, Reply} from 'react-native-gifted-chat';
import PageContainer from '~components/page-container';
import {RootStackParamList} from '~routes/router';
import Infoboard from './components/info-board';
import QuitAlert from './components/quit-alert';
import MyGiftedChat from './components/my-gifted-chat';
import chatStore from '~stores/chat/chatStore';
import {observer} from 'mobx-react-lite';
import userStore from '~stores/user/userStore';
import {ITopic} from './types';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {getRecommendedTopics} from './api';
import {topicBatchSize} from './components/info-board/types';

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
  const [topicList, setTopicList] = useState<ITopic[]>([]);
  useEffect(() => {
    if (chatStore.opponent.id && userStore.user.id)
      getRecommendedTopics({
        receiveId: chatStore.opponent.id,
        sendId: userStore.user.id,
        num: topicBatchSize * 8,
      }).then(res => {
        setTopicList(res);
      });
  }, []);

  /** 对话相关 */
  const onSend = useCallback((messageList: IMessage[]) => {
    chatStore.addMessageSelf(messageList[0]);
    chatStore.sendMessage(messageList[0]);
  }, []);

  const onQuickReply = useCallback((replies: Reply[]) => {
    const message: IMessage = {
      _id: uuidv4(),
      text: replies[0].value,
      createdAt: new Date(),
      user: {
        _id: userStore.user.id,
        avatar:
          userStore.user.headPhoto ?? require('~assets/images/avatar.png'),
      },
    };
    chatStore.sendMessage(message);
    chatStore.addMessageSelf(message);
  }, []);

  const onSendImage = useCallback((image: string) => {
    const message: IMessage = {
      _id: uuidv4(),
      text: '',
      image: image,
      createdAt: new Date(),
      user: {
        _id: userStore.user.id,
        avatar:
          userStore.user.headPhoto ?? require('~assets/images/avatar.png'),
      },
    };
    chatStore.sendMessage(message);
    chatStore.addMessageSelf(message);
  }, []);

  const onSendAudio = useCallback((audio: string) => {
    const message: IMessage = {
      _id: uuidv4(),
      text: '',
      audio: audio,
      createdAt: new Date(),
      user: {
        _id: userStore.user.id,
        avatar:
          userStore.user.headPhoto ?? require('~assets/images/avatar.png'),
      },
    };
    chatStore.sendMessage(message);
    chatStore.addMessageSelf(message);
  }, []);

  return (
    <PageContainer
      safeAreaBottom={0}
      hasHeader
      title={chatStore.opponent.nickname ?? 'Hust_宇航员'}
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
        onQuickReply={onQuickReply}
        onSendImage={onSendImage}
        onSendAudio={onSendAudio}
        user={{
          _id: userStore.user.id,
          avatar:
            userStore.user.headPhoto ?? require('~assets/images/avatar.png'),
        }}
      />
    </PageContainer>
  );
};

export default observer(ChatScreen);
