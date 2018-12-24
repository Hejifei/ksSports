import axios from 'axios'
import router from '../router'
import store from '@/store'
// import Qs from 'qs'
import {
  Message,
  Loading
} from 'element-ui'
// console.log(process.env)
// 开发环境
// const devApiUrl = 'http://172.16.0.25:8082' // 王吉栋
const devApiUrl = 'http://172.16.0.70:8086' // 余强
//  const devApiUrl = 'http://172.16.0.188:8082' // 王振尧
// const devApiUrl = 'http://172.16.0.241:8190'
// 测试环境
const proApiUrl = 'http://172.16.0.241:8190'

// export const apiUrl = process.env.NODE_ENV === 'development' ? devApiUrl : proApiUrl
export const apiUrl = devApiUrl
// let apiUrl = 'http://172.16.0.70:8080'

export const pictUpload = apiUrl + '/get/common/picture/upload'
export const pubapiUrl = apiUrl
// 导入
export const importUrl = apiUrl + '/get/system/addImportReferee'

const http = axios.create({
  baseURL: apiUrl
})
// http.defaults.headers.common['X-Token']=store.getters.token
// 请求拦截
let loadingInstance
http.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['X-Token'] = store.getters.token
  }
  loadingInstance = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.5)'
  })
  return config
}, error => {
  // console.log(error)
  Promise.reject(error)
})
// 响应拦截
http.interceptors.response.use(res => {
  // console.log(res.data)
  loadingInstance.close()
  if (res.data.code === 200) {
    return res.data
  } else if (res.data.code === 401) {
    // 重登
    Message({
      message: res.data.desc,
      type: 'warning'
    })
    router.push({name: 'login'})
    return Promise.reject(res)
  } else if (res.data.code === 1101 || res.data.code === 1102) {
    return res
  } else {
    Message({
      message: res.data.desc,
      type: 'warning'
    })
    return Promise.reject(res)
  }
}, error => {
  loadingInstance.close()
  console.log(error)
  // Message({
  //   message: error.message,
  //   type: 'error',
  //   duration: 5000
  // })
  return Promise.reject(error)
})

export default http
