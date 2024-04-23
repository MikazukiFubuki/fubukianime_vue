import request from '@/utils/request'

export function getListPage(params, pageSize, currentPage) {
  const url = `/galGameEnvironmentTypes/${currentPage}/${pageSize}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function getId(params, id) {
  const url = `/galGameEnvironmentTypes/${id}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function remove(params, id) {
  const url = `/galGameEnvironmentTypes/${id}`
  return request({
    url: url,
    method: 'delete',
    params: params.id
  })
}
export function edit(params) {
  return request({
    url: '/galGameEnvironmentTypes',
    method: 'put',
    data: {
      id: params.id,
      environmentType: params.environmentType
    }
  })
}
export function add(params) {
  return request({
    url: '/galGameEnvironmentTypes',
    method: 'post',
    data: {
      environmentType: params.environmentType
    }
  })
}
