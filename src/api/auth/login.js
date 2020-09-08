import request from '@/utils/request'

export function login(username, password) {
  const data = {
    username,
    password
  };
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function getUserInfo() {
  return request({
    url: `/user/info`,
    method: 'get',
  })
}

export function updateUserInfo(uid, data) {
  return request({
    url: `/user/${uid}`,
    method: 'patch',
    data
  })
}


export function logout() {
  return request({
    url: `/user/logout`,
    method: 'post',
  })
}
