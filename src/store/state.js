export default {
  user: (localStorage.user !== undefined && localStorage.user !== '') ? JSON.parse(localStorage.user) : {},
  name: '',
  token: localStorage.getItem('token'),
  syspar: (localStorage.syspar !== undefined && localStorage.syspar !== '') ? JSON.parse(localStorage.syspar) : {}
}
