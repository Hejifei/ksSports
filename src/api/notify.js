import http from './config.js'
import timechange from '@/assets/js/timechange.js'

export function getNoticeList (param) {
  const url = '/get/notice/getNoticeList'
  param.startTime = timechange.formatTime(param.startTime)
  param.endTime = timechange.formatTime(param.endTime)
  const data = param
  return http({
    url,
    data,
    method: 'post'
  })
}

export function addNotice (param) {
  const url = '/get/notice/addNotice'
  const data = param
  return http({
    url,
    data,
    method: 'post'
  })
}

export function removeNotice (deleteIds) {
  const url = '/get/notice/removeNotice'
  const data = {
    deleteIds
  }
  return http({
    url,
    data,
    method: 'post'
  })
}

export function getNoticeDetail (param) {
  const url = '/get/notice/getNoticeDetail'
  const data = param
  return http({
    url,
    data,
    method: 'post'
  })
}

export function getMatchDrop (param) {
  const url = '/get/match/getMatchDrop'
  const data = param
  return http({
    url,
    data,
    method: 'post'
  })
}

export function getClubByMatch (param) {
  const url = '/get/notice/getClubByMatch'
  const data = param
  return http({
    url,
    data,
    method: 'post'
  })
}
