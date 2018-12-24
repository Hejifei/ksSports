import http from './config.js'

export function getClubHome (params) {
  const url = '/get/notice/getClubHome'
  const data = params
  return http({
    url,
    method: 'post',
    data
  })
}
export function getSystemHome (pageSize) {
  const url = '/get/notice/getSystemHome'
  const data={
    pageSize
  }
  return http({
    url,
    method: 'post',
    data
  })
}
