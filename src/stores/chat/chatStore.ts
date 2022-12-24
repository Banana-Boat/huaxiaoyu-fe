import {action, makeObservable, observable} from 'mobx';
import {ChatSocket} from './chatSocket';
import {ChatStateType, IOpponent} from './types';

class ChatStore {
  constructor() {
    makeObservable(this, {
      state: observable,
      opponent: observable,
      updateOpponent: action,
      createSocket: action,
      updateState: action,
      toggleState: action,
      finishChat: action,
    });
  }

  state: ChatStateType = ChatStateType.NONE;
  opponent?: IOpponent = {};
  socket?: ChatSocket;
  timer?: NodeJS.Timer; // 处理接收不到start-chat消息问题，每3秒发送心跳包

  updateOpponent(opponent: IOpponent) {
    this.opponent = opponent;
  }

  updateState(state: ChatStateType) {
    this.state = state;
  }

  async createSocket() {
    this.socket = new ChatSocket();
    return await this.socket.init();
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
