import request from '@/utils/request'

export function getListPage(params, pageSize, currentPage) {
  const url = `/galGameSpTypes/${currentPage}/${pageSize}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function getId(params, id) {
  const url = `/galGameSpTypes/${id}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function remove(params, id) {
  const url = `/galGameSpTypes/${id}`
  return request({
    url: url,
    method: 'delete',
    params: params.id
  })
}
export function edit(params) {
  return request({
    url: '/galGameSpTypes',
    method: 'put',
    data: {
      id: params.id,
      spType: params.spType
    }
  })
}
export function add(params) {
  return request({
    url: '/galGameSpTypes',
    method: 'post',
    data: {
      spType: params.spType
    }
  })
}
