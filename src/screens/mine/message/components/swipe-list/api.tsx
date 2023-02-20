import {MessageResultType} from '~stores/message/types';
import axios from '~utils/interceptor';

interface ReplyFriendRequest {
  opponentId: number;
  messageId: number;
  result: MessageResultType;
}

interface ReplyFriendResponse {
  isSuccess: boolean;
}

export const replyFriend = async (params: ReplyFriendRequest) =>
  axios
    .post<ReplyFriendRequest, ReplyFriendResponse>(
      '/message/replyFriend',
      params,
    )
    .then(async res => {
      if (res) {
        return res.isSuccess;
      } else return false;
    });

interface ReplyPhoneNumRequest {
  opponentId: number;
  messageId: number;
  result: MessageResultType;
}

interface ReplyPhoneNumResponse {
  isSuccess: boolean;
}

export const replyPhoneNum = async (params: ReplyPhoneNumRequest) =>
  axios
    .post<ReplyPhoneNumRequest, ReplyPhoneNumResponse>(
      '/message/replyPhoneNum',
      params,
    )
    .then(async res => {
      if (res) {
        return res.isSuccess;
      } else return false;
    });

interface UpdateStatusOfMsgRequest {
  messageId: number;
}

interface UpdateStatusOfMsgResponse {
  isSuccess: boolean;
}

export const updateStatusOfMsg = async (params: UpdateStatusOfMsgRequest) =>
  axios
    .post<UpdateStatusOfMsgRequest, UpdateStatusOfMsgResponse>(
      '/message/updateStatusOfMsg',
      params,
    )
    .then(async res => {
      if (res) {
        return res.isSuccess;
      } else return false;
    });
