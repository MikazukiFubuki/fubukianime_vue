import request from '@/utils/request'

export function getListPage(params) {
  return request({
    url: '/animeEditions/selectEdition',
    method: 'get',
    params: params
  })
}
export function addLarge(params) {
  return request({
    url: '/animeEditions/addLargeEdition',
    method: 'post',
    data: {
      largeVersion: params.largeVersion,
      minorVersion: params.minorVersion,
      content: params.content,
      newContent: params.newContent,
      obsoleteContent: params.obsoleteContent
    }
  })
}
export function addMinor(params) {
  return request({
    url: '/animeEditions/addMinorEdition',
    method: 'post',
    data: {
      largeVersion: params.largeVersion,
      minorVersion: params.minorVersion,
      content: params.content,
      newContent: params.newContent,
      obsoleteContent: params.obsoleteContent
    }
  })
}
