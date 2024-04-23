import request from '@/utils/request'

export function getListPage(params, pageSize, currentPage) {
  const url = `/animeCreates/${currentPage}/${pageSize}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function getId(params, id) {
  const url = `/animeCreates/${id}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function remove(params, id) {
  const url = `/animeCreates/${id}`
  return request({
    url: url,
    method: 'delete',
    params: params.id
  })
}
export function edit(params) {
  return request({
    url: '/animeCreates',
    method: 'put',
    data: {
      id: params.id,
      create: params.create,
      description: params.description
    }
  })
}
export function add(params) {
  return request({
    url: '/animeCreates',
    method: 'post',
    data: {
      create: params.create,
      description: params.description
    }
  })
}
