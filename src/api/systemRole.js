import http from './config.js'

export function roleAdd (param) {
  const url = '/get/system/addRole'
  const data = param
  return http({
    url,
    method: 'post',
    data
  })
}

export function roleEdit (param) {
  const url = '/get/system/modifyRole'
  const data = param
  return http({
    url,
    method: 'post',
    data
  })
}

export function roleList (param) {
  const url = '/get/system/getRoleList'
  const data = param
  return http({
    url,
    method: 'post',
    data
  })
}

export function roleDel (param) {
  const url = '/get/system/removeRole'
  const data = param
  return http({
    url,
    method: 'post',
    data
  })
}

export function modifyRolePower (param) {
  const url = '/get/system/modifyRolePower'
  const data = param
  return http({
    url,
    method: 'post',
    data
  })
}

export function getResListByRole (param) {
  const url = '/get/system/getResListByRole'
  const data = param
  return http({
    url,
    method: 'post',
    data
  })
}
