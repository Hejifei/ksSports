import http from './config.js'
import timechange from '@/assets/js/timechange.js'
//获取联赛类别
export function getLeagueClassification(param){
  const url = '/get/match/getLeagueClassification'
  const data = param
  return http({
    url,
    data,
    method: 'post'
  })
}
// 获取赛事管理列表
export function getMatchManagementList(param){
  const url = '/get/match/getMatchManagementList'
  const data = param
  data.startTime = timechange.formatTime(param.startTime)
  data.endTime = timechange.formatTime(param.endTime)
  return http({
    url,
    data,
    method: 'post'
  })
}
// 裁判下拉
export function getRefereeDrop(param){
  const url = '/get/match/getRefereeDrop'
  const data = param
  return http({
    url,
    data,
    method: 'post'
  })
}
// 赛事添加
export function addOrModifyMatch(param){
  const url = '/get/match/addOrModifyMatch'
  const data = param
  return http({
    url,
    data,
    method: 'post'
  })
}
// 赛事删除
export function removeMatch(param){
  const url = '/get/match/removeMatch'
  const data = param
  return http({
    url,
    data,
    method: 'post'
  })
}
// 获取比赛成绩列表
export function getScoreList(matchId){
  const url = '/get/match/getScoreList'
  const data = {
    matchId
  }
  return http({
    url,
    data,
    method: 'post'
  })
}
// 比赛成绩维护
export function addOrModifyScore(params){
  const url = '/get/match/addOrModifyScore'
  
  const data=params
  return http({
    url,
    data,
    method: 'post'
  })
}
// 获取比赛详情
export function getMatchDetail(matchId){
  const url = '/get/match/getMatchDetail'
  
  const data={
    matchId
  }
  return http({
    url,
    data,
    method: 'post'
  })
}
// 获取报名列表
export function getEnrollList(params){
  const url = '/get/match/getEnrollList'
  
  const data=params
  data.startTime = timechange.formatTime(params.startTime)
  data.endTime = timechange.formatTime(params.endTime)
  return http({
    url,
    data,
    method: 'post'
  })
}
// 获取报名详情
export function getMatchEnrollDetail(enrollId){
  const url = '/get/match/getMatchEnrollDetail'
  
  const data={
    enrollId
  }
  return http({
    url,
    data,
    method: 'post'
  })
}
// 报名审批
export function approvalMatch(params){
  const url = '/get/match/approvalMatch'
  
  const data=params
  return http({
    url,
    data,
    method: 'post'
  })
}
// 报名审批记录
export function getApprovalRecord(params){
  const url = '/get/match/getApprovalRecord'
  
  const data=params
  return http({
    url,
    data,
    method: 'post'
  })
}
// 获取秩序册
export function getProgramList(matchId){
  const url = '/get/match/getProgramList'
  
  const data={
    matchId
  }
  return http({
    url,
    data,
    method: 'post'
  })
}
// 保存秩序册
export function addOrModifyProgram(params){
  const url = '/get/match/addOrModifyProgram'
  
  const data=params
  return http({
    url,
    data,
    method: 'post'
  })
}
// 俱乐部 赛事报名列表
export function getEnrollMatchList(params){
  const url = '/get/match/getEnrollMatchList'
  
  const data=params
  data.startTime = timechange.formatTime(params.startTime)
  data.endTime = timechange.formatTime(params.endTime)
  return http({
    url,
    data,
    method: 'post'
  })
}
// 俱乐部 赛事报名列表
export function getEnrollShowItem(matchId){
  const url = '/get/match/getEnrollShowItem'
  
  const data={
    matchId
  }
  return http({
    url,
    data,
    method: 'post'
  })
}
// 俱乐部 赛事报名 运动员下拉
export function getAthleteDrop(params){
  const url = '/get/match/getAthleteDrop'
  
  const data=params
  return http({
    url,
    data,
    method: 'post'
  })
}
// 俱乐部 赛事报名 登记
export function registration(params){
  const url = '/get/match/registration'
  
  const data=params
  return http({
    url,
    data,
    method: 'post'
  })
}
