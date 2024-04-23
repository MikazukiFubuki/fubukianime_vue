import request from '@/utils/request'

export function getListPage(params) {
  return request({
    url: '/galGames/selectGalGameMain',
    method: 'get',
    params: params
  })
}
export function getGalGameEnvironmentTypes(params) {
  return request({
    url: '/galGameEnvironmentTypes/1/300',
    method: 'get',
    params: params
  })
}
export function getGalGameTypes(params) {
  return request({
    url: '/galGameTypes/1/300',
    method: 'get',
    params: params
  })
}
export function getGalGameRebornTypes(params) {
  return request({
    url: '/galGameRebornTypes/1/300',
    method: 'get',
    params: params
  })
}
export function getGalGameLoveTypes(params) {
  return request({
    url: '/galGameLoveTypes/1/300',
    method: 'get',
    params: params
  })
}
export function getGalGameBranchTypes(params) {
  return request({
    url: '/galGameBranchTypes/1/300',
    method: 'get',
    params: params
  })
}
export function getGalGameSpTypes(params) {
  return request({
    url: '/galGameSpTypes/1/300',
    method: 'get',
    params: params
  })
}
export function getId(params, id) {
  const url = `/galGames/selectGalGameMainById/${id}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function remove(params) {
  return request({
    url: '/galGames/galGameRemove',
    method: 'put',
    data: {
      id: params.id,
      name: params.name,
      allScore: params.allScore,
      storyScore: params.storyScore,
      roleScore: params.roleScore,
      imgQualityScore: params.imgQualityScore,
      musicScore: params.musicScore,
      environmentType: params.environmentType,
      type: params.type,
      rebornType: params.rebornType,
      loveType: params.loveType,
      branchType: params.branchType,
      spType: params.spType,
      sexLevel: params.sexLevel,
      language: params.language,
      area: params.area,
      status: params.status
    }
  })
}
export function edit(params) {
  return request({
    url: '/galGames/updateGalGameMain',
    method: 'put',
    data: {
      id: params.id,
      name: params.name,
      allScore: params.allScore,
      storyScore: params.storyScore,
      roleScore: params.roleScore,
      imgQualityScore: params.imgQualityScore,
      musicScore: params.musicScore,
      environmentType: params.environmentType,
      type: params.type,
      rebornType: params.rebornType,
      loveType: params.loveType,
      branchType: params.branchType,
      spType: params.spType,
      sexLevel: params.sexLevel,
      language: params.language,
      area: params.area,
      status: params.status
    }
  })
}
export function add(params) {
  return request({
    url: '/galGames/addGalGameMain',
    method: 'post',
    data: {
      name: params.name,
      allScore: params.allScore,
      storyScore: params.storyScore,
      roleScore: params.roleScore,
      imgQualityScore: params.imgQualityScore,
      musicScore: params.musicScore,
      environmentType: params.environmentType,
      type: params.type,
      rebornType: params.rebornType,
      loveType: params.loveType,
      branchType: params.branchType,
      spType: params.spType,
      sexLevel: params.sexLevel,
      language: params.language,
      area: params.area,
      status: params.status
    }
  })
}
