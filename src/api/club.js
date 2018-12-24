import http from './config.js'
import timechange from '@/assets/js/timechange.js'

export function getClubList (param) {
  const url = '/get/system/getClubList'
  const data = param
  if (param.regTimeStr) {
    data.regTimeStr = timechange.formatTime(param.regTimeStr)
  }
  if (param.regTimeEnd) {
    data.regTimeEnd = timechange.formatTime(param.regTimeEnd)
  }
  return http({
    url,
    data,
    method: 'post'
  })
}

export function addClub (param) {
  const url = '/get/system/addClub'
  const data = param
  return http({
    url,
    data,
    method: 'post'
  })
}

export function editClub (param) {
  const url = '/get/system/modifyClub'
  const data = param
  return http({
    url,
    data,
    method: 'post'
  })
}

export function removeClub (deleteIds) {
  const url = '/get/system/removeClub'
  const data = {
    deleteIds
  }
  return http({
    url,
    data,
    method: 'post'
  })
}

export function getClubById (id) {
  const url = '/get/system/getClubById'
  const data = {
    id
  }
  return http({
    url,
    data,
    method: 'post'
  })
}

export function Clubapprove (param) {
  const url = '/get/system/approveClub'
  const data = param
  return http({
    url,
    data,
    method: 'post'
  })
}

export function getFlowList (param) {
  const url = '/get/system/getFlowList'
  const data = param
  return http({
    url,
    data,
    method: 'post'
  })
}
