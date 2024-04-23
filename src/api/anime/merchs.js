import request from '@/utils/request'

export function getListPage(params, pageSize, currentPage) {
  const url = `/animeMerchs/${currentPage}/${pageSize}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function selectById(params, id) {
  const url = `/animeMerchs/${id}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function add(params) {
  return request({
    url: 'animeMerchs',
    method: 'post',
    data: {
      animeName: params.animeName,
      merch: params.merch,
      status: params.status
    }
  })
}
export function edit(params) {
  return request({
    url: '/animeMerchs',
    method: 'put',
    data: {
      id: params.id,
      animeName: params.animeName,
      merch: params.merch,
      status: params.status
    }
  })
}
export function remove(params, id) {
  const url = `/animeMerchs/${id}`
  return request({
    url: url,
    method: 'delete',
    params: params.id
  })
}
