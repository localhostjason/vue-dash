import request from '@/utils/request'

export function login(username, password) {
  const data = {
    username,
    password
  };
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function getUserInfo(token) {
  return request({
    url: `/admin/user_info`,
    method: 'get',
    // params: {token}
  })
}

export function updateUserInfo(uid, data) {
  return request({
    url: `/user/${uid}`,
    method: 'patch',
    data
  })
}


export function logout(token) {
  return request({
    url: `/admin/logout`,
    method: 'post',
    // data: {token}
  })
}
