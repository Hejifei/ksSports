export default {
  // 邮箱验证
  email(rule, value, callback){
		let mal = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	  if (!value) {
			callback();
	  }
	  if(!(mal.test(value))) {
			callback(new Error('请输入正确邮箱'));
	  }else{
	    callback();
	  }
	},
  emailCanBeNull(rule, value, callback){
    let mal = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (value) {
      if(!(mal.test(value))) {
        callback(new Error('请输入正确邮箱'));
      }else{
        callback();
      }
    }else{
      callback();
    }
  },
	//手机号验证
	phone(rule, value, callback){
    let regFormat = /^[1][3578][0-9]{9}$/
    let regFormat2=/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/
	  if (!value) {
	    return callback(new Error('请输入电话号码'));
	  }
	  if (!(regFormat.test(value))&&!(regFormat2.test(value))) {
	    callback(new Error('请输入正确手机号'));
	  }else{
	  	callback()
	  }

	},
	//身份证号或护照的验证
	carId(rule, value, callback){
		// 简单身份证为15位h或18位
		let reg=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
		let reg2=/^[a-zA-Z]{5,17}$/;
		let reg3=/^[a-zA-Z0-9]{5,17}$/;
		if (!value) {
	    return callback(new Error('请输入身份证号或护照'));
	  }
	  if (!(reg.test(value))&&!(reg2.test(value))&&!(reg3.test(value))) {
	    callback(new Error('请输入正确身份证号或护照'));
	  }else{
	  	callback()
	  }
	},
  //社保
  socialNo(rule, value, callback){
    let reg=/^[0-9a-zA-Z]+$/
    if(value){
      if (!(reg.test(value))) {
        callback(new Error('请输入正确的社保号码'));
      }else{
        callback()
      }
    } else {
      callback()
    }
  },
	//身份证号的验证
	card(rule, value, callback){
		// 简单身份证为15位h或18位
		let reg=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
		if (!value) {
	    return callback(new Error('请输入身份证号'));
	  }
	  if (!reg.test(value)) {
	    callback(new Error('请输入正确身份证号'));
	  }else{
	  	callback()
	  }
	},
  // 昆山身份证正则
	ksidCardNoreg(){
		return /^(320583)|(320523)/;
	},
	//年龄
	age(rule,value,callback){
		if (!value) {
	    return callback(new Error('请输入年龄'));
	  }
    let reg = /^[0-9]+$/;
	  if (!reg.test(value)) {
	    callback(new Error('请输入正整数'));
	  }else{
	  	callback()
	  }
	},
	//俱乐部数限制
	clubNumbers(rule,value,callback){
		if (!value) {
	    return callback(new Error('请输入俱乐部数'));
	  }
    let reg = /^[0-9]+$/;
	  if (!reg.test(value)) {
	    callback(new Error('请输入正整数'));
	  }if (value.length > 5) {
	    callback(new Error('最大长度为5'));
	  }else{
	  	callback()
	  }
	}
}
