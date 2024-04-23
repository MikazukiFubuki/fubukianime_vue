import request from '@/utils/request'

export function getListPage(params, pageSize, currentPage) {
  const url = `/animeSexLimits/${currentPage}/${pageSize}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function getId(params, id) {
  const url = `/animeSexLimits/${id}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function remove(params, id) {
  const url = `/animeSexLimits/${id}`
  return request({
    url: url,
    method: 'delete',
    params: params.id
  })
}
export function edit(params) {
  return request({
    url: '/animeSexLimits',
    method: 'put',
    data: {
      id: params.id,
      sexLimit: params.sexLimit
    }
  })
}
export function add(params) {
  return request({
    url: '/animeSexLimits',
    method: 'post',
    data: {
      sexLimit: params.sexLimit
    }
  })
}
