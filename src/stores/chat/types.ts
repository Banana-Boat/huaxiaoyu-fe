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
}

// 待改！！！
export interface IDataOfStartChatEvent {
  opponentSex: SexType;
  opponentUserid: number;
  opponentInterestCodeList: string;
  opponentUsername: string;
  opponentDepartmentCode: number;
}
