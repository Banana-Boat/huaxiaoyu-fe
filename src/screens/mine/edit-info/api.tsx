import axios from '~utils/interceptor';
import userStore from '~stores/user/userStore';
import {setData} from '~utils';
import {IUser, SexType} from '~stores/user/types';

interface UpdateUserInfoRequest {
  username: string;
  password?: string;
  sex?: SexType;
  departmentCode?: string;
  interestCodeList?: string;
  age?: number;
  nickname?: string;
  phoneNum?: string;
  headPhoto?: string;
}

interface UpdateUserInfoResponse {
  id: string;
  username: string;
  sex: SexType;
  departmentCode: string;
  age?: number;
  nickname?: string;
  phoneNum?: string;
  interestCodeList?: string;
  headPhoto?: string;
}

export const updateUserInfo = async (params: UpdateUserInfoRequest) =>
  axios
    .put<UpdateUserInfoRequest, UpdateUserInfoResponse>(
      '/user/updateUserInfo',
      params,
    )
    .then(async res => {
      if (res) {
        const _res: IUser = JSON.parse(JSON.stringify(res));

        // 处理interestCodeList
        _res.interestCodeList = res.interestCodeList
          ? res.interestCodeList.split(',')
          : [];
        _res.departmentCode = res.departmentCode.toString();

        // 用户信息存入userStore
        userStore.updateUserInfo(_res);

        return true;
      } else return Promise.reject();
    });
