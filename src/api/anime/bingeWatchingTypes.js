import request from '@/utils/request'

export function getListPage(params, pageSize, currentPage) {
  const url = `/animeBingeWatchingTypes/${currentPage}/${pageSize}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function getId(params, id) {
  const url = `/animeBingeWatchingTypes/${id}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function remove(params, id) {
  const url = `/animeBingeWatchingTypes/${id}`
  return request({
    url: url,
    method: 'delete',
    params: params.id
  })
}
export function edit(params) {
  return request({
    url: '/animeBingeWatchingTypes',
    method: 'put',
    data: {
      id: params.id,
      bingeWatchingType: params.bingeWatchingType
    }
  })
}
export function add(params) {
  return request({
    url: '/animeBingeWatchingTypes',
    method: 'post',
    data: {
      bingeWatchingType: params.bingeWatchingType
    }
  })
}
