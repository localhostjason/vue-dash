import request from '@/utils/request'


export function getUsers({argsQuery = {}, pageQuery = {}} = {}, embedded = {}, sorts = '') {
  return request({
    url: `/user?where=${JSON.stringify(argsQuery)}&embedded=${JSON.stringify(embedded)}&sort=${sorts}`,
    method: 'get',
    params: pageQuery
  })
}

export function getUserInfo(uid) {
  return request({
    url: `/user/${uid}`,
    method: 'get',
  })
}


export function createUser(data) {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}


export function deleteUser(uid) {
  return request({
    url: '/user/' + uid,
    method: 'delete'
  })
}

export function deleteUsers(params) {
  return request({
    url: `/user?where=${JSON.stringify(params)}`,
    method: 'delete',
  })
}

export function updateUser(uid, data) {
  return request({
    url: `/user/${uid}`,
    method: 'patch',
    data
  })
}
