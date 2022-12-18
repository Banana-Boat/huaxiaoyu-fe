import axios from '~utils/interceptor';
import userStore from '~stores/user/userStore';
import {setData} from '~utils';
import {SexType} from '~stores/user/types';

interface RegisterRequest {
  username: string;
  password: string;
  sex: SexType;
  departmentCode: string;
  interestCodeList?: string[];
}

// 待改！！！
interface RegisterResponse {
  id: string;
  username: string;
  password: string;
  sex: SexType;
  departmentCode: number;
}

export const register = async (params: RegisterRequest) =>
  axios
    .post<RegisterRequest, RegisterResponse>('/user/register', params)
    .then(async res => {
      if (res) {
        // 用户信息存入userStore
        userStore.changeUserInfo(res);

        // 用户信息存入AsyncStorage
        await setData('userInfo', res);

        return true;
      } else return Promise.reject();
    });
