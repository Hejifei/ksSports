export default {
  token (state) {
    return state.token
  },
  syspar (state) {
    return state.syspar !== '' ? (state.syspar) : {}
  },
  user (state) {
    return state.user !== '' ? (state.user) : {}
  }
}
