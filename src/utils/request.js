import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import store from '@/store'
import {getToken} from '@/utils/auth'

const defaultHeaders = {
  Accept: 'application/json, text/plain, */*; charset=utf-8',
  'Content-Type': 'application/json; charset=utf-8',
  Pragma: 'no-cache',
  'Cache-Control': 'no-cache',
};

Object.assign(axios.defaults.headers.common, defaultHeaders);

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (store.getters.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['Authorization'] = `Basic ${store.getters.token}`;
    }

    if (store.getters.asUser) {
      config.headers['Iguard-AsUser'] = store.getters.asUser
    }

    return config
  },
  error => {
    // Do something with request error
    console.log('demo_error', error); // for debug
    Promise.reject(error)
  }
);

// respone interceptor
service.interceptors.response.use(
  // todo mock js response
  // response => response.data,

  // 真实的 后台 response
  response => {
    const res = response.data;
    // let status = response.status;
    // console.log(res)

    // 后台额外返回 错误 code
    if (res.errcode) {
      Message({
        message: `错误：${res.errmsg}`,
        type: 'error',
        duration: 5 * 1000
      });

      return Promise.reject(res.errmsg)
    } else {
      return response.data
    }
  },
  error => {
    const resp = error.response ? error.response.data._error.message : error;
    Message({
      message: `错误：${resp}`,
      type: 'error',
      duration: 3 * 1000
    });
    MessageBox.close();
    return Promise.reject(error)
  }
);

export default service
