import axios from '~utils/interceptor';
import userStore from '~stores/user/userStore';
import {setData} from '~utils';
import {IUser, SexType} from '~stores/user/types';

interface RegisterRequest {
  username: string;
  password: string;
  sex: SexType;
  departmentCode: string;
  interestCodeList?: string;
}

// 待改！！！
interface RegisterResponse {
  id: string;
  username: string;
  sex: SexType;
  departmentCode: number;
  age?: number;
  nickname?: string;
  phoneNum?: string;
  interestCodeList?: string;
  headPhoto?: string;
}

export const register = async (params: RegisterRequest) =>
  axios
    .post<RegisterRequest, RegisterResponse>('/user/register', params)
    .then(async res => {
      if (res) {
        const _res: IUser = JSON.parse(JSON.stringify(res));

        // 处理interestCodeList
        _res.interestCodeList = res.interestCodeList?.split(',');

        // 用户信息存入userStore
        userStore.updateUserInfo(_res);

        // 用户信息存入AsyncStorage
        await setData('userInfo', _res);

        return true;
      } else return Promise.reject();
    });
