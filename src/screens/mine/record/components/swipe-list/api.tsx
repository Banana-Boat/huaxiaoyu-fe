import axios from '~utils/interceptor';

interface ApplyFriendRequest {
  opponentId: number;
}

interface ApplyFriendResponse {
  isSuccess: boolean;
}

export const applyFriend = async (params: ApplyFriendRequest) =>
  axios
    .post<ApplyFriendRequest, ApplyFriendResponse>(
      '/friend/applyFriend',
      params,
    )
    .then(async res => {
      if (res) {
        return res.isSuccess;
      } else return false;
    });
