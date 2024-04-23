import request from '@/utils/request'

export function getListPage(params, pageSize, currentPage) {
  const url = `/animeAnimationEnds/${currentPage}/${pageSize}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function getId(params, id) {
  const url = `/animeAnimationEnds/${id}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function remove(params, id) {
  const url = `/animeAnimationEnds/${id}`
  return request({
    url: url,
    method: 'delete',
    params: params.id
  })
}
export function edit(params) {
  return request({
    url: '/animeAnimationEnds',
    method: 'put',
    data: {
      id: params.id,
      animationEnd: params.animationEnd
    }
  })
}
export function add(params) {
  return request({
    url: '/animeAnimationEnds',
    method: 'post',
    data: {
      animationEnd: params.animationEnd
    }
  })
}
