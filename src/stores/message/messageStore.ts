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
    this.sendMsgList.forEach(item => {
      if (item.messageId === messageId) item.status = MessageStatusType.READED;
    });
  }

  updateStatusOfReceiveMsg(messageId: number) {
    this.receiveMsgList.forEach(item => {
      if (item.messageId === messageId) item.status = MessageStatusType.READED;
    });
  }
}

export default new MessageStore();
