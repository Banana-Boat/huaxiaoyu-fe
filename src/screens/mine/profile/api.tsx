import messageStore from '~stores/message/messageStore';
import {
  IMessageOfMsg,
  IOpponentOfMsg,
  MessageResultType,
  MessageStatusType,
  MessageType,
} from '~stores/message/types';

import axios from '~utils/interceptor';

interface ISendMsgOfApi {
  opponent: IOpponentOfMsg;
  message: {
    messageId: string;
    type: MessageType;
    result?: MessageResultType;
    createdAt: string;
    sendId: string;
    receiveId: string;
  };
}

interface IReceiveMsgOfApi {
  opponent: IOpponentOfMsg;
  message: {
    messageId: string;
    type: MessageType.APPLY_FRIEND | MessageType.APPLY_PHONE;
    status: MessageStatusType;
    result?: MessageResultType;
    createdAt: string;
    sendId: string;
    receiveId: string;
  };
}

interface GetMessageListResponse {
  sendMessageList: ISendMsgOfApi[];
  receiveMessageList: IReceiveMsgOfApi[];
}

export const getMessageList = async () =>
  axios
    .get<null, GetMessageListResponse>('/message/getMessageList')
    .then(async res => {
      if (res) {
        const {receiveMessageList, sendMessageList} = res;

        let count = 0; // 同时计算收到消息中未读的消息
        const receiveList: IMessageOfMsg[] = receiveMessageList.map(item => {
          if (item.message.status === MessageStatusType.UNREAD) count++;
          return {opponent: item.opponent, ...item.message};
        });

        const sendList: IMessageOfMsg[] = sendMessageList.map(item => ({
          opponent: item.opponent,
          ...item.message,
        }));

        // 存入messageStore
        messageStore.updateReceiveMsgList(receiveList);
        messageStore.updateSendMsgList(sendList);
        messageStore.updateUnreadMsgNum(count);

        return true;
      } else return Promise.reject();
    });
