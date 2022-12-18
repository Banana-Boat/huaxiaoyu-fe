import axios from 'axios';
import {Toast} from 'native-base';
// import qs from "qs";

const instance = axios.create({
  baseURL: 'http://82.157.247.7:9092',
  headers: {
    'Content-Type': 'application/json',
  },
});

// instance.interceptors.request.use(
//   config => {
//     // application/x-www-form-urlencoded 需要将data数据进行特殊序列化
//     if (config.method === 'post') config.data = qs.stringify(config.data);

//     // 如果 token 存在，则注入 Authorization 中
//     const {token} = useUserStore();
//     if (token && config.headers)
//       config.headers.Authorization = `Bearer ${token}`;

//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   },
// );

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
