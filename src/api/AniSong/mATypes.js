import request from '@/utils/request'

export function getListPage(params, pageSize, currentPage) {
  const url = `/musicAddTypes/${currentPage}/${pageSize}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function getId(params, id) {
  const url = `/musicAddTypes/${id}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function remove(params, id) {
  const url = `/musicAddTypes/${id}`
  return request({
    url: url,
    method: 'delete',
    params: params.id
  })
}
export function edit(params) {
  return request({
    url: '/musicAddTypes',
    method: 'put',
    data: {
      id: params.id,
      addType: params.addType
    }
  })
}
export function add(params) {
  return request({
    url: '/musicAddTypes',
    method: 'post',
    data: {
      addType: params.addType
    }
  })
}
