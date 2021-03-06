import * as types from './mutation-types'

export default {
  [types.SET_TOKEN]: (state, token) => {
    state.token = token
  },
  [types.SET_USER]: (state, user) => {
    state.user = user
  },
  [types.SET_SYSPAR]: (state, val) => {
    state.syspar = val
  }
}
