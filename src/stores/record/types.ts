import {SexType} from '~stores/user/types';

export interface IOpponentOfRecord {
  id: number;
  nickname: string;
  sex: SexType;
  departmentCode: string;
  headPhoto?: string;
}

export interface IRecord {
  opponent: IOpponentOfRecord;
  createdAt: string;
  isFriend: boolean;
  recordId: number;
}
