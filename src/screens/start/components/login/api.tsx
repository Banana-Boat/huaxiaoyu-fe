import axios from '~utils/interceptor';
import userStore from '~stores/user/userStore';
import {setData} from '~utils';
import {IUser, SexType} from '~stores/user/types';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
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

export const login = async (params: LoginRequest) =>
  axios
    .post<LoginRequest, LoginResponse>('/user/login', params)
    .then(async res => {
      if (res) {
        const _res: IUser = JSON.parse(JSON.stringify(res));

        // 处理interestCodeList & departmentCode
        _res.interestCodeList = res.interestCodeList
          ? res.interestCodeList.split(',')
          : [];
        _res.departmentCode = res.departmentCode.toString();

        // 用户信息存入userStore
        userStore.updateUserInfo(_res);

        // 用户信息存入AsyncStorage
        await setData('userInfo', _res);

        return true;
      } else return Promise.reject();
    });
