import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const service = axios.create({});

// 请求拦截器
service.interceptors.request.use(
  (config: any) => {
    console.log('==== request-config.url: ', config?.url);
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (res: AxiosResponse) => {
    return res.data;
  },
  (error: AxiosError) => {
    console.warn('响应拦截-error: ', error);
    const status = error.response?.status;
    if (status === 504) {
      console.warn('服务器在发布,请稍等...');
    } else if (status === 401) {
      console.warn('你还未登录，请先登录');
    } else {
      console.error(error?.message || '请求失败');
    }
    return Promise.reject(error);
  },
);

export const get = (url: string, params?: any, config?: AxiosRequestConfig) => {
  return service.get(url, { params, ...config });
};

export const post = (url: string, data?: any, config?: AxiosRequestConfig) => {
  return service.post(url, data, config);
};

export const put = (url: string, data?: any, config?: AxiosRequestConfig) => {
  return service.put(url, data, config);
};

export const del = (url: string, data?: any, config?: AxiosRequestConfig) => {
  return service.delete(url, { data, ...config });
};
