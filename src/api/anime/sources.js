import request from '@/utils/request'

export function getListPage(params, pageSize, currentPage) {
  const url = `/animeSources/${currentPage}/${pageSize}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function getId(params, id) {
  const url = `/animeSources/${id}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function remove(params, id) {
  const url = `/animeSources/${id}`
  return request({
    url: url,
    method: 'delete',
    params: params.id
  })
}
export function edit(params) {
  return request({
    url: '/animeSources',
    method: 'put',
    data: {
      id: params.id,
      source: params.source,
      debut: params.debut
    }
  })
}
export function add(params) {
  return request({
    url: '/animeSources',
    method: 'post',
    data: {
      source: params.source,
      debut: params.debut
    }
  })
}
