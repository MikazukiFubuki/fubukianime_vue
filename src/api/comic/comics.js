import request from '@/utils/request'

export function getListPage(params) {
  return request({
    url: '/comics/selectMainByCondition',
    method: 'get',
    params: params
  })
}
export function getId(params, id) {
  const url = `/comics/selectMainById/${id}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function remove(params) {
  return request({
    url: '/comics/comicRemove',
    method: 'put',
    data: {
      id: params.id,
      name: params.name,
      author: params.author,
      content: params.content,
      type: params.type,
      layout: params.layout,
      episodes: params.episodes,
      sex: params.sex,
      dimensional: params.dimensional,
      status: params.status
    }
  })
}
export function edit(params) {
  return request({
    url: '/comics/updateComic',
    method: 'put',
    data: {
      id: params.id,
      name: params.name,
      author: params.author,
      content: params.content,
      type: params.type,
      layout: params.layout,
      episodes: params.episodes,
      sex: params.sex,
      dimensional: params.dimensional,
      status: params.status
    }
  })
}
export function chasingAPlay(params) {
  return request({
    url: '/comics/chasingAPlay',
    method: 'put',
    data: {
      id: params.id,
      episodes: params.episodes
    }
  })
}
export function add(params) {
  return request({
    url: '/comics/addComic',
    method: 'post',
    data: {
      name: params.name,
      author: params.author,
      content: params.content,
      type: params.type,
      layout: params.layout,
      episodes: params.episodes,
      sex: params.sex,
      dimensional: params.dimensional,
      status: params.status
    }
  })
}
