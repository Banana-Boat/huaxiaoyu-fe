import {makeObservable, observable, action} from 'mobx';
import {DictType} from '~utils/types';
import {IInterestDicts, IUser, SexType} from './types';

class UserStore {
  constructor() {
    makeObservable(this, {
      user: observable,
      infoCompletation: observable,
      updateUserInfo: action,
    });
  }

  user: IUser = {
    id: 0,
    username: '',
    sex: SexType.NONE,
    departmentCode: '0',
    interestCodeList: [],
  };

  jwt: string = '';

  infoCompletation: string = '0';

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

    let completedNum = 0,
      total = 0;

    Object.entries(this.user).forEach(([key, val]) => {
      if (key === 'id' || key === 'username' || key === 'nickname') return;

      total++;
      if (val) completedNum++;
    });

    this.infoCompletation = ((completedNum / total) * 100).toFixed();
  }

  updateJwt(token: string) {
    this.jwt = token;
  }

  updateInterestDicts(dicts: IInterestDicts) {
    this.interestDicts = dicts;
  }

  updateDepartmentDict(dict: DictType) {
    this.departmentDict = dict;
  }

  getDepartmentName(code: string) {
    return this.departmentDict.find(item => item.code === code)?.name;
  }

  getInterestNameList(codeList: string[]) {
    const {entertainment, sport, study} = this.interestDicts;
    const res: string[] = [];

    codeList.forEach(code => {
      entertainment.forEach(item => {
        if (item.code === code) res.push(item.name);
      });
      sport.forEach(item => {
        if (item.code === code) res.push(item.name);
      });
      study.forEach(item => {
        if (item.code === code) res.push(item.name);
      });
    });

    return res;
  }
}

export default new UserStore();
