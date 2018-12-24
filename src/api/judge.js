import http from './config.js'
import timechange from '@/assets/js/timechange.js'

export function getRefereeList (param) {
  const url = '/get/system/getRefereeList'
  const data = param
  if (param.certTimeStr) {
    data.certTimeStr = timechange.formatTime(param.certTimeStr)
  }
  if (param.certTimeEnd) {
    data.certTimeEnd = timechange.formatTime(param.certTimeEnd)
  }
  return http({
    url,
    data,
    method: 'post'
  })
}

export function getOtherRefereeList (param) {
  const url = '/get/system/getOtherRefereeList'
  const data = param
  if (param.certTimeStr) {
    data.certTimeStr = timechange.formatTime(param.certTimeStr)
  }
  if (param.certTimeEnd) {
    data.certTimeEnd = timechange.formatTime(param.certTimeEnd)
  }
  return http({
    url,
    data,
    method: 'post'
  })
}

export function addReferee (param) {
  const url = '/get/system/addReferee'
  const data = param
  return http({
    url,
    data,
    method: 'post'
  })
}

export function modifyReferee (param) {
  const url = '/get/system/modifyReferee'
  const data = param
  return http({
    url,
    data,
    method: 'post'
  })
}

export function modifyRefereeBySelf (param) {
  const url = '/get/system/modifyRefereeBySelf'
  const data = param
  return http({
    url,
    data,
    method: 'post'
  })
}

export function removeReferee (params) {
  const url = '/get/system/removeReferee'
  const data = params
  return http({
    url,
    data,
    method: 'post'
  })
}

export function getRefereeById (id) {
  const url = '/get/system/getRefereeById'
  const data = {
    id
  }
  return http({
    url,
    data,
    method: 'post'
  })
}

export function getOtherRefereeById (id) {
  const url = '/get/system/getOtherRefereeById'
  const data = {
    id
  }
  return http({
    url,
    data,
    method: 'post'
  })
}

//获取执裁记录
export function getReferingList(param){
  const url = '/get/system/getReferingList'
  const data = {
    ...param
  }
  return http({
    url,
    data,
    method: 'post'
  })
}
//获取处罚记录
export function getRefereePunishList(param){
  const url = '/get/system/getRefereePunishList'
  const data = {
    ...param
  }
  return http({
    url,
    data,
    method: 'post'
  })
}
// 新增裁判处罚
export function addRefereePunish (param) {
  const url = '/get/system/addRefereePunish'
  const data = param
  return http({
    url,
    data,
    method: 'post'
  })
}

// 新增裁判执裁记录
export function addRefereeJudge (param) {
  const url = '/get/system/addRefereeJudge'
  const data = param
  return http({
    url,
    data,
    method: 'post'
  })
}

// 删除裁判处罚
export function removeRefereePunish (punishId) {
  const url = '/get/system/removeRefereePunish'
  const data = {
    punishId
  }
  return http({
    url,
    data,
    method: 'post'
  })
}
export function approveReferee (param) {
  const url = '/get/system/approveReferee'
  const data = param
  return http({
    url,
    data,
    method: 'post'
  })
}
