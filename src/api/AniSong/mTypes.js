import request from '@/utils/request'

export function getListPage(params, pageSize, currentPage) {
  const url = `/musicTypes/${currentPage}/${pageSize}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function getId(params, id) {
  const url = `/musicTypes/${id}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function remove(params, id) {
  const url = `/musicTypes/${id}`
  return request({
    url: url,
    method: 'delete',
    params: params.id
  })
}
export function edit(params) {
  return request({
    url: '/musicTypes',
    method: 'put',
    data: {
      id: params.id,
      type: params.type
    }
  })
}
export function add(params) {
  return request({
    url: '/musicTypes',
    method: 'post',
    data: {
      type: params.type
    }
  })
}
