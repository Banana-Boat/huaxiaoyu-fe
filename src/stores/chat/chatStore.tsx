import {action, makeObservable, observable} from 'mobx';
import {Toast} from 'native-base';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import {SexType} from '~stores/user/types';
import userStore from '~stores/user/userStore';
import {ChatSocket} from './chatSocket';
import {ChatStateType, IOpponent} from './types';

class ChatStore {
  constructor() {
    makeObservable(this, {
      state: observable,
      opponent: observable,
      messageList: observable,
      updateOpponent: action,
      addMessage: action,
      createSocket: action,
      updateState: action,
      toggleState: action,
      finishChat: action,
    });
  }

  state: ChatStateType = ChatStateType.NONE;
  opponent?: IOpponent = {};
  messageList?: IMessage[] = [];
  socket?: ChatSocket;
  timer?: NodeJS.Timer; // 处理接收不到start-chat消息问题，每3秒发送心跳包

  finishChat() {
    this.destroySocket();
    this.updateOpponent({});
    this.updateState(ChatStateType.NONE);
    this.clearMessageList();
  }

  /** socket相关 */
  async createSocket() {
    try {
      this.socket = new ChatSocket();
      await this.socket.init();
    } catch {
      Toast.show({description: 'Socket连接错误...', duration: 2000});
    }
  }
  destroySocket() {
    this.socket?.close();
  }

  /** 状态相关 */
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
  addMessage(messageList: IMessage[]) {
    this.messageList = GiftedChat.append(this.messageList, messageList);
  }
  clearMessageList() {
    this.messageList = [];
  }
  sendMessage(message: IMessage) {
    this.socket?.sendMessage({
      receiveId: this.opponent?.id as number,
      sendId: userStore.user.id,
      ...message,
    });
  }
}

export default new ChatStore();
