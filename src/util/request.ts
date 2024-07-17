import axios from 'axios';
import getUrl from './getHostUrl';

const service = axios.create({});

// 请求拦截器
service.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    // console.log('响应拦截器-suc-res: ', res);
    if ((res.status === 200 || res.status === 201) && res.data) {
      // 根据实际业务修改
      return Promise.resolve(res.data);
    } else {
      return Promise.resolve(res.data);
    }
  },
  (error) => {
    console.log('响应拦截-error: ', error);
    const status = error.response?.status;
    if (status === 504) {
      console.log('服务器在发布,请稍等...');
    } else if (status === 401) {
      console.log('你还未登录，请先登录');
    } else {
      console.log(error?.message || '请求失败');
    }
    return Promise.resolve(error);
  },
);

export const get = (url, params = {}) => {
  const config: any = {
    method: 'get',
    url: getUrl(url),
  };
  if (params) config.params = params;
  return service(config);
};

export const post = (url, params) => {
  const config: any = {
    method: 'post',
    url: getUrl(url),
  };
  if (params) config.data = params;
  return service(config);
};
