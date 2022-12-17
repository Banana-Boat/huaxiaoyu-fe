export interface IUser {
  id: string;
  username: string;
  sex: '男' | '女' | '';
  departmentCode: number;
  age?: number;
  nickname?: string;
  phoneNum?: string;
  interestCodeList?: string[];
  headPhoto?: string;
}
