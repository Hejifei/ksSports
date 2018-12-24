import http from './config.js'

export function getPlayerList (param) {
  const url = '/get/system/getPlayerList'
  const data = param
  return http({
    url,
    data,
    method: 'post'
  })
}

export function addPlayer (param) {
  const url = '/get/system/addPlayer'
  const data = param
  return http({
    url,
    data,
    method: 'post'
  })
}

export function editPlayer (param) {
  const url = '/get/system/modifyPlayer'
  const data = param
  return http({
    url,
    data,
    method: 'post'
  })
}

export function removePlayer (deleteIds) {
  const url = '/get/system/removePlayer'
  const data = {
    deleteIds
  }
  return http({
    url,
    data,
    method: 'post'
  })
}

export function getPlayerById (id) {
  const url = '/get/system/getPlayerById'
  const data = {
    id
  }
  return http({
    url,
    data,
    method: 'post'
  })
}
//运动员转会记录
export function getTransferList (playerId) {
  const url = '/get/system/getTransferList'
  const data = {
    playerId
  }
  return http({
    url,
    data,
    method: 'post'
  })
}
//运动员处罚记录
export function getPlayerPunishList (playerId) {
  const url = '/get/system/getPlayerPunishList'
  const data = {
    playerId
  }
  return http({
    url,
    data,
    method: 'post'
  })
}

//新增处罚
export function addPunish(param) {
  const url = '/get/system/addPunish'
  const data = param
  return http({
    url,
    data,
    method: 'post'
  })
}
//删除处罚
export function removePunish(punishId) {
  const url = '/get/system/removePunish'
  const data = {
    punishId
  }
  return http({
    url,
    data,
    method: 'post'
  })
}
//运动员流动记录
export function getFlowList(id) {
  const url = '/get/system/getFlowList'
  const data = {
    id
  }
  return http({
    url,
    data,
    method: 'post'
  })
}
//获取所属俱乐部下拉



