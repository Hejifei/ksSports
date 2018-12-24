const size2 = (val) => {
  if (val < 10) {
		return '0'+ val;
	} else {
			return val;
	}
}

export default {
  // 时间转换为xxxx-xx-xx
  formatTime (time) {
		if (time === '' || time === null ) {
			return ''
		} else {
				let Timestamp = new Date(time)
				let Y = Timestamp.getFullYear()
				let M = Timestamp.getMonth() + 1
				let D = Timestamp.getDate()
				let toDay = Y + '-' + size2(M) + '-' + size2(D)
				return toDay
		}
	}
}
