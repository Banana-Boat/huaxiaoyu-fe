import {action, makeObservable, observable} from 'mobx';
import {Toast} from 'native-base';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import {ITopic} from '~screens/encounter/chat/types';
import userStore from '~stores/user/userStore';
import {ChatSocket} from './chatSocket';
import {startMessage} from './constants';
import {ChatStateType, FriendApplyResultType, IOpponent} from './types';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

class ChatStore {
  constructor() {
    makeObservable(this, {
      state: observable,
      opponent: observable,
      messageList: observable,
      isFriendApplySender: observable,
      friendApplyResult: observable,
      updateOpponent: action,
      addMessageSelf: action,
      createSocket: action,
      updateState: action,
      toggleState: action,
      finishChat: action,
      updateFriendApplyResult: action,
      updateIsFriendApplySender: action,
    });
  }

  state: ChatStateType = ChatStateType.NONE;
  opponent?: IOpponent = {};
  messageList?: IMessage[] = [{...startMessage}];

  socket?: ChatSocket;

  timer?: NodeJS.Timer; // 处理接收不到start-chat消息问题，每3秒发送心跳包

  isFriendApplySender = false; // 是否为好友申请的发起者
  friendApplyResult = FriendApplyResultType.NONE; // 好友申请结果

  // 结束聊天（重置变量）
  finishChat() {
    this.sendMessage(null, true);
    setTimeout(() => {
      this.destroySocket();
    }, 3000);
    this.updateOpponent({});
    this.updateState(ChatStateType.NONE);
    this.resetMessageList();
    this.resetFriendApplyInfo();
  }

  /** socket相关 */
  async createSocket() {
    try {
      this.socket = new ChatSocket();
      await this.socket.init();
    } catch {
      Toast.show({description: '抱歉，连接错误', duration: 2000});
    }
  }
  destroySocket() {
    this.socket?.close();
  }

  /** 聊天状态相关 */
  updateState(state: ChatStateType) {
    this.state = state;
  }
  async toggleState() {
    if (this.state === ChatStateType.MATCHING) {
      this.socket?.stopMatch();
      this.destroySocket();
      this.updateState(ChatStateType.NONE);
      clearInterval(this.timer);
    } else {
      await this.createSocket();
      this.socket?.startMatch();
      this.updateState(ChatStateType.MATCHING);
      this.timer = setInterval(() => this.socket?.detectState(), 2000);
    }
  }

  /** 聊天对象 */
  updateOpponent(opponent: IOpponent) {
    this.opponent = opponent;
  }

  /** 消息相关 */
  addMessageSelf(message: IMessage) {
    this.messageList = GiftedChat.append(this.messageList, [message]);
  }
  resetMessageList() {
    this.messageList = [{...startMessage}];
  }
  sendMessage(message: IMessage | null, isCanceled: boolean = false) {
    this.socket?.sendMessage({
      receiveId: this.opponent?.id as number,
      sendId: userStore.user.id,
      isCanceled,
      isTopic: false,
      message,
    });
  }
  sendTopicMessage(topic: ITopic) {
    const message: IMessage = {
      _id: uuidv4(),
      text: topic.content,
      createdAt: new Date(),
      user: {
        _id: 0,
        avatar: require('~assets/images/logo.png'),
      },
      quickReplies: topic.optionList
        ? {
            type: 'radio',
            keepIt: true,
            values: topic.optionList.map(option => ({
              title: option,
              value: option,
            })),
          }
        : undefined,
    };

    this.addMessageSelf(message);

    this.socket?.sendMessage({
      receiveId: this.opponent?.id as number,
      sendId: userStore.user.id,
      isCanceled: false,
      isTopic: true,
      message,
    });

    /* 好友申请相关 */
  }

  /* 好友申请相关 */
  updateFriendApplyResult(result: FriendApplyResultType) {
    this.friendApplyResult = result;
  }
  updateIsFriendApplySender(flag: boolean) {
    this.isFriendApplySender = flag;
  }
  resetFriendApplyInfo() {
    this.updateFriendApplyResult(FriendApplyResultType.NONE);
    this.updateIsFriendApplySender(false);
  }
  sendFriendApply() {
    this.updateIsFriendApplySender(true);
    this.updateFriendApplyResult(FriendApplyResultType.PENDING);
    this.socket?.sendFriendApply({
      receiveId: this.opponent?.id as number,
      sendId: userStore.user.id,
    });
  }
  sendFriendReply(result: FriendApplyResultType) {
    this.updateFriendApplyResult(result);
    this.socket?.sendFriendReply({
      receiveId: this.opponent?.id as number,
      sendId: userStore.user.id,
      result: result === FriendApplyResultType.SUCCESS ? 1 : 0,
    });
  }
}

export default new ChatStore();
