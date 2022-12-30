import {IUser} from '~stores/user/types';
import axios from '~utils/interceptor';

export interface GetNumOfOnlineResponse {
  num: number;
}

export const getNumOfOnline = async () =>
  axios
    .get<null, GetNumOfOnlineResponse>('/chat/getNumOfOnline')
    .then(async res => {
      if (res) {
        return res.num;
      } else return Promise.reject();
    });

type GetRandomUserInfoRequest = number;
interface GetRandomUserInfoResponse {
  userList: IUser[];
}

export const getRandomUserInfo = async (num: GetRandomUserInfoRequest) =>
  axios
    .get<GetRandomUserInfoRequest, GetRandomUserInfoResponse>(
      `/chat/getRandomUserInfo/${num}`,
    )
    .then(async res => {
      if (res) {
        return res.userList;
      } else return Promise.reject();
    });
