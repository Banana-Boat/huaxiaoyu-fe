import {IMessage} from 'react-native-gifted-chat';
import {SexType} from '~stores/user/types';

export enum ChatStateType {
  NONE = 'none',
  MATCHING = 'matching',
  CHATTING = 'chatting',
}

export interface IOpponent {
  sex?: SexType;
  id?: number;
  nickname?: string;
  interestCodeList?: string[];
  departmentCode?: string;
  headPhoto?: string;
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
}

export interface IDataOfMessageEvent {
  receiveId: number;
  sendId: number;
  message: IMessage | null;
  isCanceled: boolean;
  isTopic: boolean;
}
