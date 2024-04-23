import request from '@/utils/request'

export function getListPage(params) {
  return request({
    url: '/musics/selectMusicMain',
    method: 'get',
    params: params
  })
}
export function getMusicTypes(params) {
  return request({
    url: '/musicTypes/1/300',
    method: 'get',
    params: params
  })
}
export function getDownloadTypes(params) {
  return request({
    url: '/musicDownloadTypes/1/300',
    method: 'get',
    params: params
  })
}
export function getAddTypes(params) {
  return request({
    url: '/musicAddTypes/1/300',
    method: 'get',
    params: params
  })
}
export function getId(params, id) {
  const url = `/musics/selectMusicMainById/${id}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function remove(params) {
  return request({
    url: '/musics/musicRemove',
    method: 'put',
    data: {
      id: params.id,
      mid: params.mid,
      musicName: params.musicName,
      animeName: params.animeName,
      animeId: params.animeId,
      spName: params.spName,
      type: params.type,
      time: params.time,
      singer: params.singer,
      score: params.score,
      form: params.form,
      source: params.source,
      downloadType: params.downloadType,
      addType: params.addType,
      year: params.year,
      quarter: params.quarter,
      bingeTime: params.bingeTime
    }
  })
}
export function edit(params) {
  return request({
    url: '/musics/updateMusicMain',
    method: 'put',
    data: {
      id: params.id,
      mid: params.mid,
      musicName: params.musicName,
      animeName: params.animeName,
      animeId: params.animeId,
      spName: params.spName,
      type: params.type,
      time: params.time,
      singer: params.singer,
      score: params.score,
      form: params.form,
      source: params.source,
      downloadType: params.downloadType,
      addType: params.addType,
      year: params.year,
      quarter: params.quarter,
      bingeTime: params.bingeTime
    }
  })
}
export function listened(params) {
  return request({
    url: '/musics/Listened',
    method: 'put',
    data: {
      id: params.id,
      mid: params.mid,
      animeId: params.animeId,
      type: params.type,
      time: params.time,
      score: params.score,
      form: params.form,
      source: params.source,
      downloadType: params.downloadType
    }
  })
}
export function add(params) {
  return request({
    url: '/musics/addMusicMain',
    method: 'post',
    data: {
      mid: params.mid,
      musicName: params.musicName,
      animeName: params.animeName,
      animeId: params.animeId,
      spName: params.spName,
      type: params.type,
      time: params.time,
      singer: params.singer,
      score: params.score,
      form: params.form,
      source: params.source,
      downloadType: params.downloadType,
      addType: params.addType,
      year: params.year,
      quarter: params.quarter,
      bingeTime: params.bingeTime
    }
  })
}
