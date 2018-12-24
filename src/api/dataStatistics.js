import http from './config.js'
import timechange from '@/assets/js/timechange.js'

export function getStatistics (param) {
  const url = '/get/notice/getStatisticsManagement'
  const data = {
    startDate: timechange.formatTime(param.startDate),
    endDate: timechange.formatTime(param.endDate)
  }
  return http({
    url,
    data,
    method: 'post'
  })
}
