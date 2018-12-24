<template>
  <div class="sign-wrapper">
    <div class="title">
      智慧体育赛事管理系统-重置密码
    </div>
    <div class="main">
      <div class="content">
        <div class="email-title">验证邮箱</div>
        <div class="form">
          <el-form :model="from1" ref="from1" :rules="from1Rules">
            <el-form-item label-width="400px" class="col-12 ml" prop="password" label="密码(请输入6~18位数字,字母或常用字符,字母区分大小写)">
              <br/>
              <el-input type="password" class="col-6" v-model="from1.password"></el-input>
            </el-form-item>
            <el-form-item class="col-12" prop="surePwd" label="确认密码"><br/>
              <el-input type="password" class="col-6" v-model="from1.surePwd"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :loading="loading" @click="submitForm('from1')">修改密码</el-button>
            </el-form-item>

          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {resetPwd} from "../../api/forgetPwd";

  export default {
    data() {
      let pwd = (rule, value, callback) => {
        let reg = /^[a-zA-Z0-9]\w{5,17}$/
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!reg.test(value)) {
          callback(new Error('请输入正确格式密码'))
        } else {
          if (this.from1.surePwd !== '') {
            this.$refs.from1.validateField('surePwd');
          }
          callback();
        }

      };
      let surePwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value != this.from1.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        from1: {
          password: '',
          surePwd: ''
        },
        from1Rules: {
          password: [{required: true, validator: pwd, trigger: 'change'}],
          surePwd: [{required: true, validator: surePwd, trigger: 'change'}]
        },
        loading: false
      }
    },
    methods: {
      submitForm: function (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.loading = true;
            resetPwd(this.$route.query.token,this.from1.password).then(res => {
              this.loading = false;
              if (res.code == 200) {
                this.$router.push('/login');
              } else {
                this.$message.error(res.desc);
              }
            })
          } else {
            return false
          }
        })
      },
    },
    mounted(){
      this.from1.password=''
      this.from1.surePwd=''
    }
  }
</script>
<style lang="less" scoped>
  .sign-wrapper /deep/ .el-form-item__content{
    margin-left: 0 !important;
    text-align: center;
  }
  .ml /deep/ .el-form-item__label{
    margin-left: -16px;
  }
  .sign-wrapper {
    height: 100%;
    overflow: auto;
    width: 100%;
    padding: 41px 60px 45px;
    background: #006db3;
    display: flex;
    flex-direction: column;
    .title {
      font-size: 38px;
      color: white;
      margin-bottom: 40px;

    }
    .main {
      flex: 1;
      border-radius: 18px;
      background: white;
      padding: 35px;
      .email-title {
        color: #1B2125;
        font-size: 20px;
        border-bottom: 3px solid rgba(81, 81, 81, 1);
        padding-bottom: 11.5px;
      }
      .form {
        display: flex;
        justify-content: center;
      }
      form {
        width: 384px;
        margin-top: 60px;
        button {
          background: #006DB3;
          width: 250px;
        }
        .el-form-item {
          margin-top: 47px;
        }
        .el-form-item__content {
          text-align: center;
        }
        .el-form-item__label {
          color: #848484;
          font-size: 18px;

        }
      }
    }
  }
</style>

