import axios from '~utils/interceptor';

export type GetNumOfOnlineResponse = number;

export const getNumOfOnline = async () =>
  axios
    .get<null, GetNumOfOnlineResponse>('/chat/getNumOfOnline')
    .then(async res => {
      if (res) {
        console.log(res);

        return res;
      } else return Promise.reject();
    });
