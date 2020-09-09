import axios from 'axios'
import {Message} from 'element-ui'
import store from '@/store'
import router from "@/router";

const defaultHeaders = {
  Accept: 'application/json, text/plain, */*; charset=utf-8',
  'Content-Type': 'application/json; charset=utf-8',
  Pragma: 'no-cache',
  'Cache-Control': 'no-cache',
};

Object.assign(axios.defaults.headers.common, defaultHeaders);

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = `Bearer ${store.getters.token}`;
    }

    return config
  },
  error => {
    Promise.reject(error)
  }
);

// response interceptor
service.interceptors.response.use(
  response => response.data,

  error => {
    let status = 0;
    try {
      status = error.response.status;
    } catch (e) {
      Message({
        message: '连接不上后台。已超时',
        type: 'error',
        duration: 3 * 1000
      });
      return Promise.reject('连接不上后台。已超时')
    }

    const errMsg = error.response.data.msg;
    let message;
    switch (status) {
      case 422:
        message = errMsg;
        break;

      case 400:
        message = errMsg;
        break;

      case 403:
        message = '权限不足';
        break;

      case 404:
        message = '相关的资源不存在';
        break;

      case 401:
        message = errMsg;
        break;

      default:
        message = '服务器错误'

    }

    Message({
      message: `${message}`,
      type: 'error',
      duration: 3 * 1000
    });

    if (status === 401) {
      store.dispatch('user/fedLogOut').then(() => {
        router.push({path: '/'});
      });
    }

    return Promise.reject(error)
  }
);

export default service
