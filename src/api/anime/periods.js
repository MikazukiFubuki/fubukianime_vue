import request from '@/utils/request'

export function selectComPeriodAll(params) {
  return request({
    url: '/animePeriods/selectComPeriod',
    method: 'get',
    params: params
  })
}
export function selectSPPeriodAll(params) {
  return request({
    url: '/animePeriods/selectSPPeriod',
    method: 'get',
    params: params
  })
}
export function selectCPeriodAll(params) {
  return request({
    url: '/animePeriods/selectCPeriod',
    method: 'get',
    params: params
  })
}
export function selectRCPeriodAll(params) {
  return request({
    url: '/animePeriods/selectRCPeriod',
    method: 'get',
    params: params
  })
}
export function selectBPeriodAll(params) {
  return request({
    url: '/animePeriods/selectBPeriod',
    method: 'get',
    params: params
  })
}
export function selectYPeriodAll(params) {
  return request({
    url: '/animePeriods/selectYPeriod',
    method: 'get',
    params: params
  })
}
export function add(params) {
  return request({
    url: 'animePeriods',
    method: 'post',
    data: {
      periodName: params.periodName,
      sp: params.sp
    }
  })
}
