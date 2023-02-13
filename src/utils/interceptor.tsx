import axios from 'axios';
import {Toast} from 'native-base';
import userStore from '~stores/user/userStore';

const instance = axios.create({
  baseURL: 'http://82.157.247.7:9092',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  config => {
    // 注入jwt Authorization 中
    const {jwt} = userStore;
    if (
      config.url !== '/user/login' &&
      config.url !== '/user/register' &&
      jwt &&
      config.headers
    )
      config.headers.Authorization = `Bearer ${jwt}`;

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  response => {
    const {flag, msg, data} = response.data;

    if (!flag) {
      Toast.show({description: msg, duration: 2000});
      return false;
    }

    return data;
  },
  error => {
    return Promise.reject(error);
  },
);

export default instance;
