import axios from '~utils/interceptor';
import userStore from '~stores/user/userStore';
import {setData} from '~utils';
import {IUser, SexType} from '~stores/user/types';

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

      // 用户信息存入AsyncStorage
      await setData('userInfo', _res);

      return true;
    } else return Promise.reject();
  });

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export const login = async (params: LoginRequest) =>
  axios
    .post<LoginRequest, LoginResponse>('/user/login', params)
    .then(async res => {
      if (res) {
        const {token} = res;

        userStore.updateJwt(token);
        await setData('jwt', token);

        return await getUserInfo();
      } else return Promise.reject();
    });
