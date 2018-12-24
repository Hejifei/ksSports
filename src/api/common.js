import http from './config.js'

export function getList (type) {
  const url = '/get/common/enum/getList?type=' + type
  return http({
    url,
    method: 'get',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })
}

// 获取系统项目下拉
export function getItemDrop (type) {
  const url = '/get/system/getItemDrop'
  const data = {
    type: type
  }
  return http({
    url,
    data,
    method: 'post'
  })
}

// 根据项目类型获取俱乐部
export function getClubByProject (projectId) {
  const url = '/get/notice/getClubByProject'
  const data = {
    projectId: projectId
  }
  return http({
    url,
    data,
    method: 'post'
  })
}

export function getparameter (type) {
  const url = '/get/common/parameter?type=' + type
  return http({
    url,
    method: 'get',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })
}

export function getClubDrop (type) {
  const url = '/get/system/getClubDrop'
  const data = {
    type: type
  }
  return http({
    url,
    data,
    method: 'post'
  })
}

// 获取裁判类别下拉
export function getRefereeTypeDrop () {
  const url = '/get/match/getRefereeTypeDrop'
  const data = {}
  return http({
    url,
    data,
    method: 'post'
  })
}
