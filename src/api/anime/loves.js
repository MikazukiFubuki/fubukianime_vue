import request from '@/utils/request'

export function getListPage(params, pageSize, currentPage) {
  const url = `/animeLoves/${currentPage}/${pageSize}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function getId(params, id) {
  const url = `/animeLoves/${id}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function remove(params, id) {
  const url = `/animeLoves/${id}`
  return request({
    url: url,
    method: 'delete',
    params: params.id
  })
}
export function edit(params) {
  return request({
    url: '/animeLoves',
    method: 'put',
    data: {
      id: params.id,
      love: params.love
    }
  })
}
export function add(params) {
  return request({
    url: '/animeLoves',
    method: 'post',
    data: {
      love: params.love
    }
  })
}
