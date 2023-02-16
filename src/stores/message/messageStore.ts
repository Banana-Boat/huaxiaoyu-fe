import {action, makeObservable, observable} from 'mobx';
import {IMessageOfMsg} from './types';

class MessageStore {
  constructor() {
    makeObservable(this, {
      sendMsgList: observable,
      receiveMsgList: observable,
      unreadMsgNum: observable,
      updateSendMsgList: action,
      updateReceiveMsgList: action,
      updateUnreadMsgNum: action,
    });
  }

  sendMsgList: IMessageOfMsg[] = [];
  receiveMsgList: IMessageOfMsg[] = [];
  unreadMsgNum: number = 0; // 收到的消息中未读数量

  updateSendMsgList(sendMsgList: IMessageOfMsg[]) {
    this.sendMsgList = [...sendMsgList];
  }

  updateReceiveMsgList(receiveMsgList: IMessageOfMsg[]) {
    this.receiveMsgList = [...receiveMsgList];
  }

  updateUnreadMsgNum(num: number) {
    this.unreadMsgNum = num;
  }
}

export default new MessageStore();
