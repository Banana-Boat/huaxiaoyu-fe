import axios from '~utils/interceptor';

type DictTypeFromApi = {
  code: number;
  name: string;
}[];

interface GetInterestDictsResponse {
  sport: DictTypeFromApi;
  study: DictTypeFromApi;
  entertainment: DictTypeFromApi;
}

type GetDepartmentDictResponse = DictTypeFromApi;

export const getInterestDicts = async () =>
  axios
    .get<null, GetInterestDictsResponse>('/user/getInterestDicts')
    .then(async res => {
      if (res) {
        const _res = JSON.parse(JSON.stringify(res));
        _res.entertainment = res.entertainment.map(item => {
          let _item = JSON.parse(JSON.stringify(item));
          _item.code = item.code.toString();
          return _item;
        });

        _res.sport = res.sport.map(item => {
          let _item = JSON.parse(JSON.stringify(item));
          _item.code = item.code.toString();
          return _item;
        });

        _res.study = res.study.map(item => {
          let _item = JSON.parse(JSON.stringify(item));
          _item.code = item.code.toString();
          return _item;
        });

        return _res;
      } else return Promise.reject();
    });

export const getDepartmentDict = async () =>
  axios
    .get<null, GetDepartmentDictResponse>('/user/getDepartmentDict')
    .then(async res => {
      if (res) {
        const _res = res.map(item => {
          let _item = JSON.parse(JSON.stringify(item));
          _item.code = item.code.toString();
          return _item;
        });

        return _res;
      } else return Promise.reject();
    });
