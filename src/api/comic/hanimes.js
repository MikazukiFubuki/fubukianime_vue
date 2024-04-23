import request from '@/utils/request'

export function getListPage(params) {
  return request({
    url: '/hanimes/selectMainByCondition',
    method: 'get',
    params: params
  })
}
export function getHTypeAll(params) {
  return request({
    url: '/hAnimeTypes/1/300',
    method: 'get',
    params: params
  })
}
export function getId(params, id) {
  const url = `/hanimes/selectMainById/${id}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function remove(params) {
  return request({
    url: '/hanimes/hanimeRemove',
    method: 'put',
    data: {
      id: params.id,
      name: params.name,
      content: params.content,
      type: params.type,
      layout: params.layout,
      episodes: params.episodes,
      dimensional: params.dimensional,
      status: params.status,
      embyId: params.embyId
    }
  })
}
export function edit(params) {
  return request({
    url: '/hanimes/updateHAnime',
    method: 'put',
    data: {
      id: params.id,
      name: params.name,
      content: params.content,
      type: params.type,
      layout: params.layout,
      episodes: params.episodes,
      dimensional: params.dimensional,
      status: params.status,
      embyId: params.embyId
    }
  })
}
export function chasingAPlay(params) {
  return request({
    url: '/hanimes/chasingAPlay',
    method: 'put',
    data: {
      id: params.id,
      episodes: params.episodes,
    }
  })
}
export function add(params) {
  return request({
    url: '/hanimes/addHAnime',
    method: 'post',
    data: {
      name: params.name,
      content: params.content,
      type: params.type,
      layout: params.layout,
      episodes: params.episodes,
      dimensional: params.dimensional,
      status: params.status,
      embyId: params.embyId
    }
  })
}
