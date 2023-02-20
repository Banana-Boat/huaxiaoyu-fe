import {SexType} from '~stores/user/types';

export enum MessageType {
  DELETE_FRIEND = 0,
  APPLY_FRIEND = 1,
  REPLY_FRIEND = 2,
  APPLY_PHONE = 3,
  REPLY_PHONE = 4,
}

export enum MessageResultType {
  REJECT = 0,
  APPROVE = 1,
}

export enum MessageStatusType {
  UNREAD = 0,
  READED = 1,
}

export interface IOpponentOfMsg {
  id: number;
  sex: SexType;
  nickname: string;
  departmentCode: string;
  headPhoto?: string;
  phoneNum?: string;
}

export interface IMessageOfMsg {
  type: MessageType;
  opponent: IOpponentOfMsg;
  id: number;
  createdAt: string;
  status?: MessageStatusType;
  result?: MessageResultType;
}
