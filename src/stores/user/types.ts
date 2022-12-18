export interface IUser {
  id: string;
  username: string;
  sex: SexType;
  departmentCode: number;
  age?: number;
  nickname?: string;
  phoneNum?: string;
  interestCodeList?: string[];
  headPhoto?: string;
}

export enum SexType {
  FEMALE = 'female',
  MALE = 'male',
  NONE = '',
}
