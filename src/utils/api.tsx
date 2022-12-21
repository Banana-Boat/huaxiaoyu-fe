import axios from '~utils/interceptor';
import {DictType} from './types';

interface GetInterestDictsResponse {
  sport: DictType;
  study: DictType;
  entertainment: DictType;
}

type GetDepartmentDictResponse = DictType;

export const getInterestDicts = async () =>
  axios
    .get<null, GetInterestDictsResponse>('/user/getInterestDicts')
    .then(async res => {
      if (res) return res;
      else return Promise.reject();
    });

export const getDepartmentDict = async () =>
  axios
    .get<null, GetDepartmentDictResponse>('/user/getDepartmentDict')
    .then(async res => {
      if (res) return res;
      else return Promise.reject();
    });
