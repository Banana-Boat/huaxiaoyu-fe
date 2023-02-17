import {IMessage} from 'react-native-gifted-chat';
import {SexType} from '~stores/user/types';

export enum ChatStateType {
  NONE = 'none',
  MATCHING = 'matching',
  CHATTING = 'chatting',
}

export interface IOpponentOfChat {
  sex: SexType;
  id: number;
  nickname: string;
  interestCodeList: string[];
  departmentCode: string;
  headPhoto?: string;
  phoneNum?: string;
  isFriend: boolean;
}

export interface IDataOfStartChatEvent {
  opponent: {
    sex: SexType;
    departmentCode: string;
    nickname: string;
    interestCodeList?: string;
    id: number;
    headPhoto?: string;
  };
  isFriend: boolean;
}

export interface IDataOfMessageEvent {
  receiveId: number;
  sendId: number;
  message: IMessage | null;
  isCanceled: boolean; // 是否退出聊天室
  isTopic: boolean; // 是否为推荐话题
}

export enum FriendApplyResultType {
  FAIL = 0,
  SUCCESS = 1,
  PENDING = 2,
  NONE = 3,
}

export interface IDataOfFriendApplyEvent {
  receiveId: number;
  sendId: number;
}

export interface IDataOfFriendReplyEvent {
  result: number;
  receiveId: number;
  sendId: number;
}
