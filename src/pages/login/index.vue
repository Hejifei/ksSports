<template>
  <div class="loginC">
    <div class="loginCenter">
      <form style="display:none;"><input type="password" style="width:0;height:0;"/></form>
      <img src="../../assets/img/web_logo.png" />
      <div class="title">昆山市体育局</div>
      <!-- <img src="../../assets/img/logo_title.png" />  -->
      <div class="loginfoC">
        <img src="../../assets/img/web_loginhead.png"/>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="demo-ruleForm">
          <el-form-item label="用户" prop="username">
            <el-input type="text" v-model="ruleForm.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <div class="verify-wrapper">
            <el-form-item label="验证码" prop="verifyCode">
              <el-input  v-model="ruleForm.verifyCode" auto-complete="off"></el-input>
            </el-form-item>
            <span><img :src="'data:image/jpeg;base64,'+codeinfo.base64" @click="verCodeGet"/></span>
          </div>
          <div class="login-bottom">
            <router-link :to='{name:"forgetPwd"}' tag="span" class="forget-pwd">忘记密码？</router-link>
            <router-link :to="{name:'signIn'}" tag='span' class="sign-in">用户注册</router-link>
          </div>
          <el-button type="info" style="width:100%;" :loading="loading" @click="submitForm('ruleForm')">登录</el-button>
          <!-- <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item> -->
        </el-form>
        <el-dialog class="loginmodel" :visible.sync="dialogFormVisible">
          <div class="tiptitle" v-html="title"></div>
          <div class="tipcontent">{{titleContent}}</div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogFormVisible = false">关闭</el-button>
          </div>
        </el-dialog>
        
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {getCode} from 'api/login.js'
import http from 'api/config.js'
export default {
  
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    // 判定验证码
    const validateCode = (rule, value, callback)=>{
      if((this.ruleForm.verifyCode).toLowerCase() === (this.codeinfo.code).toLowerCase()){
        callback();
      }else{
        callback(new Error('验证码错误'));
      }
    }
    return {
      codeinfo:'',
      title:'',
      titleContent:'',
      dialogFormVisible:false,
      ruleForm: {
        username: '',
        password: '',
        verifyCode: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [{ validator: validatePass, trigger: 'blur' }],
        verifyCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { validator: validateCode, trigger: 'blur' },
        ]
      },
      loading: false
    }
  },
  mounted(){
    this.verCodeGet();
  },
  created: function () {
    let self = this
    document.onkeydown = function (e) {
      let key = window.event.keyCode
      if (key === 13) {
        self.submitForm('ruleForm')
      }
    }
  },
  methods: {
    ...mapActions(['LoginByUsername']),
    submitForm: function (formName) {
      
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.verCodeGet()
          // this.loading = true
          
          this.LoginByUsername(this.ruleForm).then(res => {
            // this.loading = false
            
            if(res.code===1101){
              // 注册审核中
              this.dialogFormVisible=true
              
              this.title='<i class="el-icon-error red"></i>后台正在审批中'
              this.titleContent= res.desc
            }
            if(res.code===1102){
              // 注册不通过
              this.title='<i class="el-icon-warning yellow"></i>注册未通过'
              this.titleContent= res.desc
              this.dialogFormVisible=true
            }
            // console.log(res)
            if(!res.code){
              const clubId = res.clubId;
              if(res.resourceList.length === 0 || res.resourceList === null){
                this.$message({
                  message: '您未授权，请联系管理员！',
                  type: 'warning'
                });
                throw '';
              }
              let newurl = res.resourceList[0].type === '2' ? res.resourceList[0].url : res.resourceList[0].nodes[0].url;
              // if(newurl)
              this.$router.push({path: newurl})
            }
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    verCodeGet(){
      getCode().then(res=>{
        this.codeinfo = res.data;
        // console.log(res.data)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
//登录
.loginfoC /deep/ .el-form-item__label {
  display: none;
}
.loginfoC /deep/ .el-dialog__title{
  font-size: 16px;
}
.loginfoC /deep/ .el-dialog__header{
  text-align: left;
}
.loginC /deep/ .el-dialog{
  width: 437px;
  height: 192px;
}
.tip{
  font-size: 14px;
}
.loginC {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: url("../../assets/img/web_loginbg.jpg") no-repeat center center;
  background-size: cover;
  position: relative;
  display: flex;
  align-items:center;
  .loginCenter {
    width: 440px;
    max-width: 100%;
    margin: auto;
    text-align: center;

    margin: auto;
    .title {
      color: #fff;
      font-size: 33px;
      margin-top: 45px;
      text-align: center;
      display: block;
    }
    & > img {
      width: 494px;
      // margin-top: 70px;
      display: block;
      max-width: 100%;
    }
    .loginfoC {
      width: 360px;
      height: 336px;
      margin: auto;
      margin-top: 69px;
      background-color: #fff;
      padding: 68px 20px 32px;
      box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.08);
      position: relative;
      img {
        position: absolute;
        top: -50px;
        left: 50%;
        width: 100px;
        transform: translate(-50%, 0);
      }
      .verify-wrapper {
        display: flex;
        span {
          width: 150px;
          height: 40px;
          background: gainsboro;
          margin-left: 5px;
          text-align: center;
          line-height: 40px;
          // display: block;
          position: relative;
        }
        img{
          width: 150px;
          height: 40px;
          position: relative;top:0;left: 0;
          transform:translate(0,0);
          cursor: pointer;
        }
      }
      .login-bottom {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        span {
          cursor: pointer;
          color: rgba(19, 90, 161, 1);
          font-size: 16px;
          text-align: center;
          font-family: PingFangSC-Regular;
        }
      }
    }
  }
}

</style>
