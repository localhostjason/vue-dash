import request from '@/utils/request'

export function getRoles(params = {}, embedded_args = {}, sorts = '') {
  return request({
    url: `/role?where=${JSON.stringify(params)}&embedded=${JSON.stringify(embedded_args)}&sort=${sorts}`,
    method: 'get',
  })
}


export function createRole(data) {
  return request({
    url: `/role`,
    method: 'post',
    data
  })
}


export function updateRole(id, data) {
  return request({
    url: `/role/${id}`,
    method: 'patch',
    data
  })
}

export function deleteRoles(params = {}) {
  return request({
    url: `/role?where=${JSON.stringify(params)}`,
    method: 'delete',
  })
}
