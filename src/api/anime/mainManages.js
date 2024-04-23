import request from '@/utils/request'

export function selectByCondition(params, pageSize, currentPage) {
  const url = `/animeMains/byCondition/${currentPage}/${pageSize}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function selectByYearQuarterCondition(params, pageSize, currentPage) {
  const url = `/animeMains/byYearQuarterCondition/${currentPage}/${pageSize}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function selectById(params, id) {
  const url = `/animeMains/${id}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function getCreateAll(params) {
  return request({
    url: '/animeTypesShow/selectCreate',
    method: 'get',
    params: params
  })
}
export function getSourceAll(params) {
  return request({
    url: '/animeTypesShow/selectSource',
    method: 'get',
    params: params
  })
}
export function getBingeWatchingTypeAll(params) {
  return request({
    url: '/animeBingeWatchingTypes/1/300',
    method: 'get',
    params: params
  })
}
export function getTypeAll(params) {
  return request({
    url: '/animeTypesShow/selectType',
    method: 'get',
    params: params
  })
}
export function getLoveAll(params) {
  return request({
    url: '/animeTypesShow/selectLove',
    method: 'get',
    params: params
  })
}
export function getSexLimitAll(params) {
  return request({
    url: '/animeTypesShow/selectSexLimit',
    method: 'get',
    params: params
  })
}
export function getLeaderGenderAll(params) {
  return request({
    url: '/animeTypesShow/selectLeaderGender',
    method: 'get',
    params: params
  })
}
export function getAnimationEndAll(params) {
  return request({
    url: '/animeTypesShow/selectAnimationEnd',
    method: 'get',
    params: params
  })
}
export function getOriginalEndAll(params) {
  return request({
    url: '/animeTypesShow/selectOriginalEnd',
    method: 'get',
    params: params
  })
}
export function getLayoutTypeAll(params) {
  return request({
    url: '/animeTypesShow/selectLayoutType',
    method: 'get',
    params: params
  })
}
export function getQuarterAll(params) {
  return request({
    url: '/quarters/1/300',
    method: 'get',
    params: params
  })
}
export function addAnime(params) {
  return request({
    url: '/animeMains',
    method: 'post',
    data: {
      create: params.create,
      name: params.name
    }
  })
}
export function addAnimeLayoutById(id) {
  const url = `/animeMains/addAnimeLayoutById/${id}`
  return request({
    url: url,
    method: 'get'
  })
}
export function addSource(params) {
  return request({
    url: '/animeMains/addSource',
    method: 'put',
    data: {
      id: params.id,
      source2: params.source2,
      source3: params.source3
    }
  })
}
export function startAnime(params) {
  return request({
    url: '/animeMains/startAnime',
    method: 'put',
    data: {
      id: params.id,
      source1: params.source1,
      broadcastStartYear: params.broadcastStartYear,
      broadcastEndYear: params.broadcastEndYear,
      bingeWatchingType: params.bingeWatchingType,
      bingeWatchingYear: params.bingeWatchingYear,
      bingeWatchingQuarter: params.bingeWatchingQuarter,
      status: params.status
    }
  })
}
export function extendAnime(params) {
  return request({
    url: '/animeMains/extendAnime',
    method: 'put',
    data: {
      id: params.id,
      bingeWatchingType: params.bingeWatchingType,
      completeYear: params.completeYear,
      completeQuarter: params.completeQuarter
    }
  })
}
export function endAnime(params) {
  return request({
    url: '/animeMains/endAnime',
    method: 'put',
    data: {
      id: params.id,
      score: params.score,
      type1: params.type1,
      type2: params.type2,
      type3: params.type3,
      love: params.love,
      sexLimit: params.sexLimit,
      leaderGender: params.leaderGender,
      favoriteHeroine: params.favoriteHeroine,
      animationEnd: params.animationEnd,
      originalEnd: params.originalEnd,
      completeYear: params.completeYear,
      completeQuarter: params.completeQuarter,
      status: params.status
    }
  })
}
export function getAnimeWithScore(params) {
  return request({
    url: '/animeMains/selectAnimeWithScore',
    method: 'get',
    params: params
  })
}
export function updateOriginalEnd(params) {
  return request({
    url: '/animeMains/updateOriginalEnd',
    method: 'put',
    data: {
      id: params.id,
      name: params.name,
      originalEnd: params.originalEnd
    }
  })
}
export function overYear(params) {
  return request({
    url: '/animeMains/overYear',
    method: 'put',
    data: {
      id: params.id,
      name: params.name,
      broadcastEndYear: params.broadcastEndYear
    }
  })
}
export function reviewAnime(id) {
  const url = `/animeMains/reviewAnime/${id}`
  return request({
    url: url,
    method: 'get'
  })
}
export function selectAnimeLayoutById(params, id) {
  const url = `/animeMains/selectAnimeLayoutByAnimeId/${id}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function selectLayoutById(params, id) {
  const url = `/animeMains/selectLayoutById/${id}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function chasingAPlay(params) {
  return request({
    url: '/animeMains/chasingAPlay',
    method: 'put',
    data: {
      id: params.id,
      layoutId: params.layoutId,
      episodes: params.episodes
    }
  })
}
export function saveLayout(params) {
  return request({
    url: '/animeMains/saveLayout',
    method: 'put',
    data: {
      id: params.id,
      name: params.name,
      layoutId: params.layoutId,
      layoutTypeId: params.layoutTypeId,
      anotherName: params.anotherName,
      quarterNum: params.quarterNum,
      part: params.part,
      episodes: params.episodes,
      embyId: params.embyId
    }
  })
}
export function deleteAnimeLayoutById(params) {
  return request({
    url: '/animeMains/deleteAnimeLayoutById',
    method: 'put',
    data: {
      id: params.id
    }
  })
}
export function updateAnime(params) {
  return request({
    url: '/animeMains/updateAnime',
    method: 'put',
    data: {
      id: params.id,
      name: params.name,
      score: params.score,
      scoreRank: params.scoreRank,
      score2: params.score2,
      source: params.source,
      source1: params.source1,
      source2: params.source2,
      source3: params.source3,
      type: params.type,
      type1: params.type1,
      type2: params.type2,
      type3: params.type3,
      love: params.love,
      sexLimit: params.sexLimit,
      create: params.create,
      completeId: params.completeId,
      completeId2: params.completeId2,
      bingeWatchingId: params.bingeWatchingId,
      bingeWatchingId2: params.bingeWatchingId2,
      reviewId: params.reviewId,
      reviewId2: params.reviewId2,
      leaderGender: params.leaderGender,
      favoriteHeroine: params.favoriteHeroine,
      animationEnd: params.animationEnd,
      originalEnd: params.originalEnd,
      broadcastStartYear: params.broadcastStartYear,
      broadcastStartYear2: params.broadcastStartYear2,
      broadcastEndYear: params.broadcastEndYear,
      broadcastEndYear2: params.broadcastEndYear2,
      bingeWatchingType: params.bingeWatchingType,
      bingeWatchingYear: params.bingeWatchingYear,
      bingeWatchingYear2: params.bingeWatchingYear2,
      completeYear: params.completeYear,
      completeYear2: params.completeYear2,
      bingeWatchingQuarter: params.bingeWatchingQuarter,
      bingeWatchingQuarter2: params.bingeWatchingQuarter2,
      completeQuarter: params.completeQuarter,
      completeQuarter2: params.completeQuarter2,
      status: params.status,
      broadcastYear: params.broadcastYear,
      modifyId: params.modifyId
    }
  })
}
export function updateAnimeName(params) {
  return request({
    url: '/animeMains/updateAnimeName',
    method: 'put',
    data: {
      id: params.id,
      name: params.name
    }
  })
}
export function updateAnimeSource(params) {
  return request({
    url: '/animeMains/updateAnimeSource',
    method: 'put',
    data: {
      id: params.id,
      source: params.source,
      source1: params.source1,
      source2: params.source2,
      source3: params.source3
    }
  })
}
export function updateAnimeCreate(params) {
  return request({
    url: '/animeMains/updateAnimeCreate',
    method: 'put',
    data: {
      id: params.id,
      create: params.create
    }
  })
}
export function updateAnimeBroadcastYear(params) {
  return request({
    url: '/animeMains/updateAnimeBroadcastYear',
    method: 'put',
    data: {
      id: params.id,
      broadcastStartYear: params.broadcastStartYear,
      broadcastEndYear: params.broadcastEndYear
    }
  })
}
export function updateAnimeScore(params) {
  return request({
    url: '/animeMains/updateAnimeScore',
    method: 'put',
    data: {
      id: params.id,
      score: params.score
    }
  })
}
export function updateAnimeType(params) {
  return request({
    url: '/animeMains/updateAnimeType',
    method: 'put',
    data: {
      id: params.id,
      type: params.type,
      type1: params.type1,
      type2: params.type2,
      type3: params.type3
    }
  })
}
export function updateAnimeLove(params) {
  return request({
    url: '/animeMains/updateAnimeLove',
    method: 'put',
    data: {
      id: params.id,
      love: params.love
    }
  })
}
export function updateAnimeSexLimit(params) {
  return request({
    url: '/animeMains/updateAnimeSexLimit',
    method: 'put',
    data: {
      id: params.id,
      sexLimit: params.sexLimit
    }
  })
}
export function updateAnimeLeaderGender(params) {
  return request({
    url: '/animeMains/updateAnimeLeaderGender',
    method: 'put',
    data: {
      id: params.id,
      leaderGender: params.leaderGender
    }
  })
}
export function updateAnimeFavoriteHeroine(params) {
  return request({
    url: '/animeMains/updateAnimeFavoriteHeroine',
    method: 'put',
    data: {
      id: params.id,
      favoriteHeroine: params.favoriteHeroine
    }
  })
}
export function updateAnimeAnimationEnd(params) {
  return request({
    url: '/animeMains/updateAnimeAnimationEnd',
    method: 'put',
    data: {
      id: params.id,
      animationEnd: params.animationEnd
    }
  })
}
export function updateAnimeBingeWatchingType(params) {
  return request({
    url: '/animeMains/updateAnimeBingeWatchingType',
    method: 'put',
    data: {
      id: params.id,
      bingeWatchingType: params.bingeWatchingType
    }
  })
}
export function updateAnimeBingeWatching(params) {
  return request({
    url: '/animeMains/updateAnimeBingeWatching',
    method: 'put',
    data: {
      id: params.id,
      bingeWatchingYear: params.bingeWatchingYear,
      bingeWatchingQuarter: params.bingeWatchingQuarter
    }
  })
}
export function updateAnimeComplete(params) {
  return request({
    url: '/animeMains/updateAnimeComplete',
    method: 'put',
    data: {
      id: params.id,
      completeYear: params.completeYear,
      completeQuarter: params.completeQuarter
    }
  })
}
export function updateAnimeStatus(params) {
  return request({
    url: '/animeMains/updateAnimeStatus',
    method: 'put',
    data: {
      id: params.id,
      status: params.status
    }
  })
}
export function updateCompleteId(params) {
  return request({
    url: '/animeMains/updateCompleteId',
    method: 'put',
    data: {
      id: params.id,
      completeId: params.completeId,
      completeId2: params.completeId2,
      modifyId: params.modifyId
    }
  })
}
export function updateBingeWatchingId(params) {
  return request({
    url: '/animeMains/updateBingeWatchingId',
    method: 'put',
    data: {
      id: params.id,
      bingeWatchingId: params.bingeWatchingId,
      bingeWatchingId2: params.bingeWatchingId2,
      modifyId: params.modifyId
    }
  })
}
export function updateReviewId(params) {
  return request({
    url: '/animeMains/updateReviewId',
    method: 'put',
    data: {
      id: params.id,
      reviewId: params.reviewId,
      reviewId2: params.reviewId2,
      modifyId: params.modifyId
    }
  })
}
export function deleteAnime(params) {
  return request({
    url: '/animeMains/deleteAnime',
    method: 'put',
    data: {
      id: params.id,
      name: params.name,
      score: params.score,
      scoreRank: params.scoreRank,
      score2: params.score2,
      source: params.source,
      source1: params.source1,
      source2: params.source2,
      source3: params.source3,
      type: params.type,
      type1: params.type1,
      type2: params.type2,
      type3: params.type3,
      love: params.love,
      sexLimit: params.sexLimit,
      create: params.create,
      completeId: params.completeId,
      completeId2: params.completeId2,
      bingeWatchingId: params.bingeWatchingId,
      bingeWatchingId2: params.bingeWatchingId2,
      reviewId: params.reviewId,
      reviewId2: params.reviewId2,
      leaderGender: params.leaderGender,
      favoriteHeroine: params.favoriteHeroine,
      animationEnd: params.animationEnd,
      originalEnd: params.originalEnd,
      broadcastStartYear: params.broadcastStartYear,
      broadcastStartYear2: params.broadcastStartYear2,
      broadcastEndYear: params.broadcastEndYear,
      broadcastEndYear2: params.broadcastEndYear2,
      bingeWatchingType: params.bingeWatchingType,
      bingeWatchingYear: params.bingeWatchingYear,
      bingeWatchingYear2: params.bingeWatchingYear2,
      completeYear: params.completeYear,
      completeYear2: params.completeYear2,
      bingeWatchingQuarter: params.bingeWatchingQuarter,
      bingeWatchingQuarter2: params.bingeWatchingQuarter2,
      completeQuarter: params.completeQuarter,
      completeQuarter2: params.completeQuarter2,
      status: params.status,
      broadcastYear: params.broadcastYear,
      modifyId: params.modifyId
    }
  })
}
