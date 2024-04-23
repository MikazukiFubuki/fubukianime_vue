import request from '@/utils/request'

export function getListPage(params, pageSize, currentPage) {
  const url = `/animeLeaderGenders/${currentPage}/${pageSize}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function getId(params, id) {
  const url = `/animeLeaderGenders/${id}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function remove(params, id) {
  const url = `/animeLeaderGenders/${id}`
  return request({
    url: url,
    method: 'delete',
    params: params.id
  })
}
export function edit(params) {
  return request({
    url: '/animeLeaderGenders',
    method: 'put',
    data: {
      id: params.id,
      leaderGender: params.leaderGender
    }
  })
}
export function add(params) {
  return request({
    url: '/animeLeaderGenders',
    method: 'post',
    data: {
      leaderGender: params.leaderGender
    }
  })
}
