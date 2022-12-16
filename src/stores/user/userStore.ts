import {makeObservable, observable, action} from 'mobx';
import {IUser} from './types';

class UserStore {
  constructor() {
    makeObservable(this, {user: observable, changeUserInfo: action});
  }

  user: IUser = {
    id: '',
    username: '',
    password: '',
    nickname: '',
    sex: '',
    age: null,
    departmentCode: null,
    phoneNum: '',
  };

  changeUserInfo(user: IUser) {
    this.user = user;
  }
}

export default new UserStore();
