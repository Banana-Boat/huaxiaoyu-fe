import {makeObservable, observable, action} from 'mobx';
import {IUser, SexType} from './types';

class UserStore {
  constructor() {
    makeObservable(this, {user: observable, changeUserInfo: action});
  }

  user: IUser = {
    id: '',
    username: '',
    sex: SexType.NONE,
    departmentCode: 0,
  };

  changeUserInfo(user: IUser) {
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
}

export default new UserStore();
