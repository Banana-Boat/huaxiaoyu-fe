import {makeObservable, observable, action} from 'mobx';
import {DictType} from '~utils/types';
import {IInterestDicts, IUser, SexType} from './types';

class UserStore {
  constructor() {
    makeObservable(this, {user: observable, updateUserInfo: action});
  }

  user: IUser = {
    id: '',
    username: '',
    sex: SexType.NONE,
    departmentCode: 0,
  };

  interestDicts: IInterestDicts = {
    sport: [],
    study: [],
    entertainment: [],
  };

  departmentDict: DictType = [];

  updateUserInfo(user: IUser) {
    this.user.id = user.id;
    this.user.username = user.username;
    this.user.age = user.age;
    this.user.departmentCode = user.departmentCode;
    this.user.headPhoto = user.headPhoto;
    this.user.interestCodeList = user.interestCodeList;
    this.user.nickname = user.nickname;
    this.user.phoneNum = user.phoneNum;
    this.user.sex = user.sex;
  }

  updateInterestDicts(dicts: IInterestDicts) {
    this.interestDicts = dicts;
  }

  updateDepartmentDict(dict: DictType) {
    this.departmentDict = dict;
  }
}

export default new UserStore();
