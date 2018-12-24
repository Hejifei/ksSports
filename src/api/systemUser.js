import http from './config.js'

export function userAdd (param) {
  const url = '/get/system/addUser'
  const data = param
  return http({
    url,
    method: 'post',
    data
  })
}

export function userEdit (param) {
  const url = '/get/system/modifyUser'
  const data = param
  return http({
    url,
    method: 'post',
    data
  })
}

export function userList (param) {
  const url = '/get/system/getUserList'
  const data = param
  return http({
    url,
    method: 'post',
    data
  })
}

export function userDel (param) {
  const url = '/get/system/removeUser'
  const data = param
  return http({
    url,
    method: 'post',
    data
  })
}

export function getRoles (param) {
  const url = '/get/system/getRoleDrop'
  const data = param
  return http({
    url,
    method: 'post',
    data
  })
}

export function getRolesSel (param) {
  const url = '/get/system/getUserById'
  const data = param
  return http({
    url,
    method: 'post',
    data
  })
}

export function updateStatus (param) {
  const url = '/get/system/changeUserStatus'
  const data = param
  return http({
    url,
    method: 'post',
    data
  })
}
