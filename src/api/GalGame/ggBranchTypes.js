import request from '@/utils/request'

export function getListPage(params, pageSize, currentPage) {
  const url = `/galGameBranchTypes/${currentPage}/${pageSize}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function getId(params, id) {
  const url = `/galGameBranchTypes/${id}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function remove(params, id) {
  const url = `/galGameBranchTypes/${id}`
  return request({
    url: url,
    method: 'delete',
    params: params.id
  })
}
export function edit(params) {
  return request({
    url: '/galGameBranchTypes',
    method: 'put',
    data: {
      id: params.id,
      branchType: params.branchType
    }
  })
}
export function add(params) {
  return request({
    url: '/galGameBranchTypes',
    method: 'post',
    data: {
      branchType: params.branchType
    }
  })
}
