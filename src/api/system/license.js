import request from '@/utils/request'


export function getLicense() {
  return request({
    url: `/license`,
    method: 'get'
  })
}

export function updateLicense(data) {
  return request({
    url: `/license`,
    method: 'post',
    data
  })
}
