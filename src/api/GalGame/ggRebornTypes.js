import request from '@/utils/request'

export function getListPage(params, pageSize, currentPage) {
  const url = `/galGameRebornTypes/${currentPage}/${pageSize}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function getId(params, id) {
  const url = `/galGameRebornTypes/${id}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function remove(params, id) {
  const url = `/galGameRebornTypes/${id}`
  return request({
    url: url,
    method: 'delete',
    params: params.id
  })
}
export function edit(params) {
  return request({
    url: '/galGameRebornTypes',
    method: 'put',
    data: {
      id: params.id,
      rebornType: params.rebornType
    }
  })
}
export function add(params) {
  return request({
    url: '/galGameRebornTypes',
    method: 'post',
    data: {
      rebornType: params.rebornType
    }
  })
}
