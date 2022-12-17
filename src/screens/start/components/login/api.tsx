import axios from '~utils/interceptor';
import userStore from '~stores/user/userStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setData} from '~utils';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  id: string;
  username: string;
  password: string;
  sex: '男' | '女';
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
        console.log(JSON.stringify(res, null, 2));

        // 用户信息存入userStore
        userStore.changeUserInfo(res);

        // 用户信息存入AsyncStorage
        await setData('userInfo', res);
        console.log('sss');

        return true;
      }
    });
