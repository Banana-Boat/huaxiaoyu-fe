import axios from '~utils/interceptor';
import {ITopic} from './types';

interface GetRecommendedTopicsRequest {
  receiveId: number;
  sendId: number;
  num: number;
}

interface _ITopic {
  type: string;
  title: string;
  content: string;
  optionList?: string;
}

interface GetRecommendedTopicsResponse {
  topicList: _ITopic[];
}

export const getRecommendedTopics = async (
  params: GetRecommendedTopicsRequest,
) =>
  axios
    .get<GetRecommendedTopicsRequest, GetRecommendedTopicsResponse>(
      `/chat/getRecommendedTopics?receiveId=${params.receiveId}&sendId=${params.sendId}&num=${params.num}`,
    )
    .then(async res => {
      if (res) {
        const topicList = JSON.parse(JSON.stringify(res.topicList));
        for (let item of topicList) {
          if (item.optionList) item.optionList = item.optionList.split('/');
        }
        return topicList;
      } else return Promise.reject();
    });
