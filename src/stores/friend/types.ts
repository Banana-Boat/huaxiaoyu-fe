import {SexType} from '~stores/user/types';

export interface IFriend {
  id: number;
  nickname: string;
  sex: SexType;
  departmentCode: string;
  phoneNum?: string;
  headPhoto?: string;
}
