import request from '@/utils/request'

export function getListPage(params) {
  return request({
    url: '/animeQuarters/selectComQuarter',
    method: 'get',
    params: params
  })
}
export function add(params) {
  return request({
    url: '/animeQuarters/addComQuarter',
    method: 'post',
    data: {
      years: params.years,
      quarter: params.quarter
    }
  })
}
