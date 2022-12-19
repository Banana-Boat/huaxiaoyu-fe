import {DictType} from '~utils/types';

export interface IUser {
  id: string;
  username: string;
  sex: SexType;
  departmentCode: string;
  age?: number;
  nickname?: string;
  phoneNum?: string;
  interestCodeList: string[];
  headPhoto?: string;
}

export enum SexType {
  FEMALE = 'female',
  MALE = 'male',
  NONE = '',
}

export interface IInterestDicts {
  sport: DictType;
  study: DictType;
  entertainment: DictType;
}
