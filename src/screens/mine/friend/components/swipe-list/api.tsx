import axios from '~utils/interceptor';

interface DeleteFriendRequest {
  opponentId: number;
}

interface DeleteFriendResponse {
  isSuccess: boolean;
}

export const deleteFriend = async (params: DeleteFriendRequest) =>
  axios
    .post<DeleteFriendRequest, DeleteFriendResponse>(
      '/friend/deleteFriend',
      params,
    )
    .then(async res => {
      if (res) {
        return res.isSuccess;
      } else return false;
    });

interface ApplyPhoneNumRequest {
  opponentId: number;
}

interface ApplyPhoneNumResponse {
  isSuccess: boolean;
}

export const applyPhoneNum = async (params: ApplyPhoneNumRequest) =>
  axios
    .post<ApplyPhoneNumRequest, ApplyPhoneNumResponse>(
      '/friend/applyPhoneNum',
      params,
    )
    .then(async res => {
      if (res) {
        return res.isSuccess;
      } else return false;
    });
