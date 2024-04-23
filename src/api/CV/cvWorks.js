import request from '@/utils/request'

export function getListPage(params) {
  return request({
    url: '/cvs/selectCvWorks',
    method: 'get',
    params: params
  })
}
export function getCVName(params) {
  return request({
    url: '/cvs/selectCVName',
    method: 'get',
    params: params
  })
}
export function getAnimeName(params) {
  return request({
    url: '/animeMains/selectAllAnimeName',
    method: 'get',
    params: params
  })
}
export function selectAfterAdd(params) {
  return request({
    url: '/cvs/selectAfterAdd',
    method: 'get',
    params: params
  })
}
export function selectAfterUpdate(params) {
  return request({
    url: '/cvs/selectAfterUpdate',
    method: 'get',
    params: params
  })
}
export function getId(params, id) {
  const url = `/cvs/selectCvWorksById/${id}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function remove(params) {
  return request({
    url: '/cvs/worksRemove',
    method: 'put',
    data: {
      id: params.id,
      animeId: params.animeId,
      animeRole: params.animeRole,
      startYear: params.startYear,
      endYear: params.endYear,
      year: params.year,
      cvName: params.cvName
    }
  })
}
export function edit(params) {
  return request({
    url: '/cvs/updateCvWorks',
    method: 'put',
    data: {
      id: params.id,
      animeId: params.animeId,
      animeRole: params.animeRole,
      startYear: params.startYear,
      endYear: params.endYear,
      year: params.year,
      cvName: params.cvName
    }
  })
}
export function updateYear(params) {
  return request({
    url: '/cvs/updateYear',
    method: 'put',
    data: {
      id: params.id,
      animeId: params.animeId,
      startYear: params.startYear,
      endYear: params.endYear,
      year: params.year
    }
  })
}
export function updateRole(params) {
  return request({
    url: '/cvs/updateRole',
    method: 'put',
    data: {
      id: params.id,
      animeId: params.animeId,
      animeRole: params.animeRole
    }
  })
}
export function add(params) {
  return request({
    url: '/cvs/addCvWorks',
    method: 'post',
    data: {
      animeId: params.animeId,
      animeRole: params.animeRole,
      startYear: params.startYear,
      endYear: params.endYear,
      year: params.year,
      cvName: params.cvName
    }
  })
}
