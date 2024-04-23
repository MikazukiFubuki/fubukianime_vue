import request from '@/utils/request'

export function getListPage(params, pageSize, currentPage) {
  const url = `/animeLayoutTypes/${currentPage}/${pageSize}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function getId(params, id) {
  const url = `/animeLayoutTypes/${id}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function remove(params, id) {
  const url = `/animeLayoutTypes/${id}`
  return request({
    url: url,
    method: 'delete',
    params: params.id
  })
}
export function edit(params) {
  return request({
    url: '/animeLayoutTypes',
    method: 'put',
    data: {
      id: params.id,
      layoutType: params.layoutType
    }
  })
}
export function add(params) {
  return request({
    url: '/animeLayoutTypes',
    method: 'post',
    data: {
      layoutType: params.layoutType
    }
  })
}
