import {action, makeObservable, observable} from 'mobx';
import {IMessageOfMsg, MessageStatusType} from './types';

class MessageStore {
  constructor() {
    makeObservable(this, {
      sendMsgList: observable,
      receiveMsgList: observable,
      unreadMsgNum: observable,
      updateSendMsgList: action,
      updateReceiveMsgList: action,
      updateUnreadMsgNum: action,
      updateStatusOfReceiveMsg: action,
      updateStatusOfSendMsg: action,
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

  updateStatusOfSendMsg(messageId: number) {
    this.sendMsgList = this.sendMsgList.map(item => {
      if (item.id === messageId) item.status = MessageStatusType.READED;
      return item;
    });
  }

  updateStatusOfReceiveMsg(messageId: number) {
    this.receiveMsgList = this.receiveMsgList.map(item => {
      if (item.id === messageId) item.status = MessageStatusType.READED;
      return item;
    });
  }
}

export default new MessageStore();
