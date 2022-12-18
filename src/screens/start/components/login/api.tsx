import axios from '~utils/interceptor';
import userStore from '~stores/user/userStore';
import {setData} from '~utils';
import {SexType} from '~stores/user/types';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
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

export const login = async (params: LoginRequest) =>
  axios
    .post<LoginRequest, LoginResponse>('/user/login', params)
    .then(async res => {
      if (res) {
        // 用户信息存入userStore
        userStore.changeUserInfo(res);

        // 用户信息存入AsyncStorage
        await setData('userInfo', res);

        return true;
      } else return Promise.reject();
    });
