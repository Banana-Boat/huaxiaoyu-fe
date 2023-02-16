import {IUser, SexType} from '~stores/user/types';
import userStore from '~stores/user/userStore';
import axios from '~utils/interceptor';
import {DictType} from './types';

interface GetInterestDictsResponse {
  sport: DictType;
  study: DictType;
  entertainment: DictType;
}

type GetDepartmentDictResponse = DictType;

export const getInterestDicts = async () =>
  axios
    .get<null, GetInterestDictsResponse>('/user/getInterestDicts')
    .then(async res => {
      if (res) {
        // 存入userStore
        userStore.updateInterestDicts(res);
        return true;
      } else return Promise.reject();
    });

export const getDepartmentDict = async () =>
  axios
    .get<null, GetDepartmentDictResponse>('/user/getDepartmentDict')
    .then(async res => {
      if (res) {
        // 存入userStore
        userStore.updateDepartmentDict(res);
        return true;
      } else return Promise.reject();
    });

interface GetUserInfoResponse {
  id: number;
  username: string;
  sex: SexType;
  departmentCode: number;
  age?: number;
  nickname?: string;
  phoneNum?: string;
  interestCodeList?: string;
  headPhoto?: string;
}

export const getUserInfo = async () =>
  axios.get<null, GetUserInfoResponse>('/user/getUserInfo').then(async res => {
    if (res) {
      const _res: IUser = JSON.parse(JSON.stringify(res));

      // 处理interestCodeList & departmentCode
      _res.interestCodeList = res.interestCodeList
        ? res.interestCodeList.split(',')
        : [];
      _res.departmentCode = res.departmentCode.toString();

      // 用户信息存入userStore
      userStore.updateUserInfo(_res);

      return true;
    } else return Promise.reject();
  });
