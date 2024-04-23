import request from '@/utils/request'

export function getListPage(params, pageSize, currentPage) {
  const url = `/musicDownloadTypes/${currentPage}/${pageSize}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function getId(params, id) {
  const url = `/musicDownloadTypes/${id}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function remove(params, id) {
  const url = `/musicDownloadTypes/${id}`
  return request({
    url: url,
    method: 'delete',
    params: params.id
  })
}
export function edit(params) {
  return request({
    url: '/musicDownloadTypes',
    method: 'put',
    data: {
      id: params.id,
      downloadType: params.downloadType
    }
  })
}
export function add(params) {
  return request({
    url: '/musicDownloadTypes',
    method: 'post',
    data: {
      downloadType: params.downloadType
    }
  })
}
