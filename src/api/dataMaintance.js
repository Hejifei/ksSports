import http from './config.js'

export function getItemList () {
  const url = '/get/system/getItemList'
  const data = {}
  return http({
    url,
    data,
    method: 'post'
  })
}

export function addItem (param) {
  const url = '/get/system/addItem'
  for (let i in param) {
    if (typeof (param[i]) === 'boolean') {
      param[i] = param[i] === true ? 1 : 0
    }
  }
  const data = param
  return http({
    url,
    data,
    method: 'post'
  })
}

export function getItem (param) {
  const url = '/get/system/getItemById'
  const data = param
  return http({
    url,
    data,
    method: 'post'
  })
}

export function EditItem (param) {
  const url = '/get/system/modifyItem'
  for (let i in param) {
    if (typeof (param[i]) === 'boolean' && i !== 'id' && i !== 'type') {
      param[i] = param[i] === true ? 1 : 0
    }
  }
  const data = param
  return http({
    url,
    data,
    method: 'post'
  })
}

export function DeltItem (param) {
  const url = '/get/system/removeItem'
  const data = param
  return http({
    url,
    data,
    method: 'post'
  })
}

export function getSysParameterList () {
  const url = '/get/system/getSysParameterList'
  const data = {}
  return http({
    url,
    data,
    method: 'post'
  })
}

export function EditSysParameter (param) {
  const url = '/get/system/modifySysParameter'
  for (let i in param) {
    if (typeof (param[i]) === 'boolean' && i !== 'id' && i !== 'type') {
      param[i] = param[i] === true ? 0 : 1
    }
  }
  const data = param
  return http({
    url,
    data,
    method: 'post'
  })
}

export function getRefereeTypeList (param) {
  const url = '/get/system/getRefereeTypeList'
  const data = param
  return http({
    url,
    data,
    method: 'post'
  })
}

export function addRefereeType (param) {
  const url = '/get/system/addRefereeType'
  const data = param
  return http({
    url,
    data,
    method: 'post'
  })
}

export function getRefereeTypeById (param) {
  const url = '/get/system/getRefereeTypeById'
  const data = param
  return http({
    url,
    data,
    method: 'post'
  })
}

export function modifyRefereeType (param) {
  const url = '/get/system/modifyRefereeType'
  const data = param
  return http({
    url,
    data,
    method: 'post'
  })
}

export function removeRefereeType (param) {
  const url = '/get/system/removeRefereeType'
  const data = param
  return http({
    url,
    data,
    method: 'post'
  })
}
