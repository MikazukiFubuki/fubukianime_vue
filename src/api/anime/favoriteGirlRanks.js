import request from '@/utils/request'

export function getListPage(params) {
  return request({
    url: '/animeFavoriteGirlRanks/selectByCondition',
    method: 'get',
    params: params
  })
}
