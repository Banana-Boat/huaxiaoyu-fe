import axios from '~utils/interceptor';
import {SexType} from '~stores/user/types';
import {login} from '~screens/start/api';

interface RegisterRequest {
  username: string;
  password: string;
  sex: SexType;
  departmentCode: string;
  interestCodeList?: string;
}

interface RegisterResponse {
  isSuccess: boolean;
}

export const register = async (params: RegisterRequest) =>
  axios
    .post<RegisterRequest, RegisterResponse>('/user/register', params)
    .then(async res => {
      if (res) {
        const {isSuccess} = res;
        if (isSuccess) {
          await login({username: params.username, password: params.password});
          return true;
        } else return Promise.reject();
      } else return Promise.reject();
    });
