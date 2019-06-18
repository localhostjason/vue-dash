import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import store from '@/store'

const defaultHeaders = {
  Accept: 'application/json, text/plain, */*; charset=utf-8',
  'Content-Type': 'application/json; charset=utf-8',
  Pragma: 'no-cache',
  'Cache-Control': 'no-cache',
};

Object.assign(axios.defaults.headers.common, defaultHeaders);

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000
});

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = `Bearer ${store.getters.token}`;
    }

    return config
  },
  error => {
    console.log('demo_error', error);
    Promise.reject(error)
  }
);

service.interceptors.response.use(
  // todo mock js response
  // response => response.data,

  // 真实的 后台 response
  response => {
    return response.data
  },
  error => {
    const resp = error.response ? error.response.data._error.message : error;
    Message({
      message: `错误：${resp}`,
      type: 'error',
      duration: 3 * 1000
    });
    try {
      MessageBox.close();
    } catch (e) {
      console.log(e)
    }
    return Promise.reject(error)
  }
);

export default service
