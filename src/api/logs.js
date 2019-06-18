import request from '@/utils/request'


export function getLogs({argsQuery, pageQuery} = {}, embedded, sorts = '') {
  return request({
    url: `/log?where=${JSON.stringify(argsQuery)}&embedded=${JSON.stringify(embedded)}&sort=${sorts}`,
    method: 'get',
    params: pageQuery
  })
}

export function deleteLogs(row) {
  return request({
    url: `/log?where=${JSON.stringify(row)}`,
    method: 'delete'
  })
}

export function deleteLogInfo(id) {
  return request({
    url: `/log/${id}`,
    method: 'delete'
  })
}

export function updateLog(id, data) {
  return request({
    url: `/log/${id}`,
    method: 'patch',
    data,
  })
}

