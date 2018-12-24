import http from './config.js'

export function loginByUsername (account, password) {
  const url = '/get/system/login'
  const data = {
    account,
    password
  }
  return http({
    url,
    method: 'post',
    data
  })
}

export function getCode () {
  const url = `/get/common/picture/verificationCode?${Math.random(0,1000)}`
  const data = {}
  return http({
    url,
    method: 'get',
    data
  })
}

export function getUserInfo (token) {
  const url = ''
  return http({
    url,
    method: 'get',
    params: { token }
  })
}
export function getClubList (param) {
  const url = '/get/system/getClubList'
  const data = param
  return http({
    url,
    data,
    method: 'post'
  })
}

// 俱乐部注册
export function siginIn (param) {
  const url = '/get/system/registerClub'
  const data = param
  return http({
    url,
    data,
    method: 'post'
  })
}

// 裁判注册
export function jungeRegist (param) {
  const url = '/get/system/registerReferee'
  const data = param
  return http({
    url,
    data,
    method: 'post'
  })
}
//修改密码
export function modifyPasswordByPassword(param){
  const url = '/get/system/modifyPasswordByPassword'
  const data = param
  return http({
    url,
    data,
    method: 'post'
  })
}
