import request from '@/utils/request'

// post 登陆 获取token
export function loginByUsername(username, password) {
  const data = {
    username,
    password
  };
  // return request({
  //   url: '/login/login',
  //   method: 'post',
  //   data
  // })
  return request({
    url: '/user',
    method: 'get'
  })
}

// export function logout(token) {
//   return request({
//     url: '/user',
//     method: 'post',
//     token
//   })
// }

// export function getUserInfo(token) {
//   return request({
//     url: '/user',
//     method: 'get',
//     params: {token}
//   })
// }

export function getUserInfo(uid) {
  return request({
    url: `/user/${uid}`,
    method: 'get'
  })
}





