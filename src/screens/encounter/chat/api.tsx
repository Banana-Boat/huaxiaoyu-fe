import axios from '~utils/interceptor';
import {ITopic} from './types';

interface GetRecommendedTopicsRequest {
  receiveId: number;
  sendId: number;
  num: number;
}

type GetRecommendedTopicsResponse = ITopic[]; // 待改

export const getRecommendedTopics = async (
  params: GetRecommendedTopicsRequest,
) =>
  axios
    .get<GetRecommendedTopicsRequest, GetRecommendedTopicsResponse>(
      `/chat/getRecommendedTopics?receiveId=${params.receiveId}&sendId=${params.sendId}&num=${params.num}`,
    )
    .then(async res => {
      if (res) {
        return res;
      } else return Promise.reject();
    });
