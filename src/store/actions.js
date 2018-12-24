import * as types from './mutation-types'
import { loginByUsername } from '@/api/login'
export default {
  // 用户名登录
  LoginByUsername ({ commit }, userInfo) {
    const username = userInfo.username.trim()
    return new Promise((resolve, reject) => {
      loginByUsername(username, userInfo.password).then(response => {
        const data = response.data
        if (response.code === 200) {
          commit(types.SET_TOKEN, data.token)
          localStorage.setItem('token', data.token)
          commit(types.SET_USER, data)
          localStorage.setItem('user', JSON.stringify(data))
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  SetSysPara ({ commit }, sysparameter) {
    return new Promise((resolve, reject) => {
      commit(types.SET_SYSPAR, sysparameter)
      localStorage.setItem('syspar', JSON.stringify(sysparameter))
      resolve()
    })
  }
}
