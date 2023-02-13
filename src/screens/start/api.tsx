import axios from '~utils/interceptor';
import userStore from '~stores/user/userStore';
import {setData} from '~utils';
import {getUserInfo} from '~utils/api';

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
