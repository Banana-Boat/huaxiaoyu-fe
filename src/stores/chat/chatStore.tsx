import {action, makeObservable, observable} from 'mobx';
import {Toast} from 'native-base';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
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
      updateMessageList: action,
      createSocket: action,
      updateState: action,
      toggleState: action,
      finishChat: action,
    });
  }

  state: ChatStateType = ChatStateType.NONE;
  opponent?: IOpponent = {};
  messageList?: IMessage[] = [
    {
      _id: 1,
      text: 'This is a quick reply. Do you love Gifted Chat? (radio) KEEP IT',
      createdAt: new Date(),
      quickReplies: {
        type: 'radio', // or 'checkbox',
        keepIt: true,
        values: [
          {
            title: '😋 Yes',
            value: 'yes',
          },
          {
            title: '📷 Yes, let me show you with a picture!',
            value: 'yes_picture',
          },
          {
            title: '😞 Nope. What?',
            value: 'no',
          },
        ],
      },
      user: {
        _id: 2,
        name: 'React Native',
      },
    },
  ];
  socket?: ChatSocket;
  timer?: NodeJS.Timer; // 处理接收不到start-chat消息问题，每3秒发送心跳包

  updateState(state: ChatStateType) {
    this.state = state;
  }

  updateOpponent(opponent: IOpponent) {
    this.opponent = opponent;
  }

  updateMessageList(messageList: IMessage[]) {
    this.messageList = GiftedChat.append(this.messageList, messageList);
  }

  sendMessage(message: IMessage) {
    this.socket?.sendMessage({
      receiveId: this.opponent?.id as number,
      sendId: userStore.user.id,
      ...message,
    });
  }

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

  finishChat() {
    this.destroySocket();
    this.updateOpponent({});
    this.updateState(ChatStateType.NONE);
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
}

export default new ChatStore();
