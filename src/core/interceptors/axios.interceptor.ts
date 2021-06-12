import axios from 'axios';

import {config} from '../../configs';

const AxiosInstance = axios.create({
  baseURL: config.baseUrl,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * get token from asyn storage
 */
export const setClientToken = (token: string) => {
  AxiosInstance.defaults.headers.common.Authorization = token;
};

export const setRequestLang = (lang: string) => {
  AxiosInstance.defaults.headers.common.Lang = lang;
};

AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    if (!error.response) {
      return Promise.reject('Network Error');
    } else if (error.response.status === 401 && !originalRequest._retry) {
      return Promise.reject('Unauthorzied');
    } else {
      return error.response;
    }
  },
);

export default AxiosInstance;
