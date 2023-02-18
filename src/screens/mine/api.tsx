import friendStore from '~stores/friend/friendStore';
import {IFriend} from '~stores/friend/types';
import messageStore from '~stores/message/messageStore';
import {
  IMessageOfMsg,
  IOpponentOfMsg,
  MessageResultType,
  MessageStatusType,
  MessageType,
} from '~stores/message/types';
import recordStore from '~stores/record/recordStore';
import {IRecord} from '~stores/record/types';

import axios from '~utils/interceptor';

interface IMessageOfApi {
  opponent: IOpponentOfMsg;
  message: {
    messageId: number;
    type: MessageType;
    status?: MessageStatusType;
    result?: MessageResultType;
    createdAt: string;
    sendId: number;
    receiveId: number;
  };
}

interface GetMessageListResponse {
  sendMessageList: IMessageOfApi[];
  receiveMessageList: IMessageOfApi[];
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

interface GetFriendListResponse {
  friendList: IFriend[];
}

export const getFriendList = async () =>
  axios
    .get<null, GetFriendListResponse>('/friend/getFriendList')
    .then(async res => {
      if (res) {
        // 存入friendStore
        friendStore.updateFriendList(res.friendList);

        return true;
      } else return Promise.reject();
    });

interface GetRecordListResponse {
  recordList: IRecord[];
}

export const getRecordList = async () =>
  axios
    .get<null, GetRecordListResponse>('/record/getRecordList')
    .then(async res => {
      if (res) {
        // 存入recordStore
        recordStore.updateRecordList(res.recordList);

        return true;
      } else return Promise.reject();
    });
