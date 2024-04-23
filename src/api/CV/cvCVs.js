import request from '@/utils/request'

export function getListPage(params) {
  return request({
    url: '/cvs/selectCVByConditionLive',
    method: 'get',
    params: params
  })
}
export function getListPageAndDeath(params) {
  return request({
    url: '/cvs/selectCVByCondition',
    method: 'get',
    params: params
  })
}
export function getListPageByConditionDead(params) {
  return request({
    url: '/cvs/selectCVByConditionDead',
    method: 'get',
    params: params
  })
}
export function getId(params, id) {
  const url = `/cvs/selectCVById/${id}`
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function remove(params) {
  return request({
    url: '/cvs/cvRemove',
    method: 'put',
    data: {
      id: params.id,
      name: params.name,
      hiragana: params.hiragana,
      sex: params.sex,
      anotherName: params.anotherName,
      birthday: params.birthday,
      company: params.company,
      debutYear: params.debutYear,
      lived: params.lived,
      deathDay: params.deathDay,
      roleNum: params.roleNum
    }
  })
}
export function edit(params) {
  return request({
    url: '/cvs/updateCV',
    method: 'put',
    data: {
      id: params.id,
      name: params.name,
      hiragana: params.hiragana,
      sex: params.sex,
      anotherName: params.anotherName,
      birthday: params.birthday,
      company: params.company,
      debutYear: params.debutYear,
      lived: params.lived,
      deathDay: params.deathDay,
      roleNum: params.roleNum
    }
  })
}
export function editDeath(params) {
  return request({
    url: '/cvs/updateCVdeath',
    method: 'put',
    data: {
      id: params.id,
      name: params.name,
      hiragana: params.hiragana,
      sex: params.sex,
      anotherName: params.anotherName,
      birthday: params.birthday,
      company: params.company,
      debutYear: params.debutYear,
      lived: params.lived,
      deathDay: params.deathDay,
      roleNum: params.roleNum
    }
  })
}
export function add(params) {
  return request({
    url: '/cvs/addCV',
    method: 'post',
    data: {
      name: params.name,
      hiragana: params.hiragana,
      sex: params.sex,
      anotherName: params.anotherName,
      birthday: params.birthday,
      company: params.company,
      debutYear: params.debutYear,
      lived: params.lived,
      deathDay: params.deathDay,
      roleNum: params.roleNum
    }
  })
}
