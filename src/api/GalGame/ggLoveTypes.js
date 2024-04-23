import request from '@/utils/request'

export function getListPage(params, pageSize, currentPage) {
  const url = `/galGameLoveTypes/${currentPage}/${pageSize}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function getId(params, id) {
  const url = `/galGameLoveTypes/${id}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function remove(params, id) {
  const url = `/galGameLoveTypes/${id}`
  return request({
    url: url,
    method: 'delete',
    params: params.id
  })
}
export function edit(params) {
  return request({
    url: '/galGameLoveTypes',
    method: 'put',
    data: {
      id: params.id,
      loveType: params.loveType
    }
  })
}
export function add(params) {
  return request({
    url: '/galGameLoveTypes',
    method: 'post',
    data: {
      loveType: params.loveType
    }
  })
}
