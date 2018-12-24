<template>
  <div class="sign-wrapper">
    <div class="title">
      智慧体育赛事管理系统-忘记密码
    </div>
    <div class="main">
      <div class="content">
        <div class="email-title">验证邮箱</div>
        <div class="form">
          <el-form :model="from1" ref="from1" :rules="from1Rules">
            <el-form-item label="邮箱(用户名)" prop="email">
              <el-input v-model="from1.email" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :loading="loading" @click="submitForm('from1')">发送邮件</el-button>
            </el-form-item>

          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {sendEmail} from "../../api/forgetPwd";
  import validators from '@/assets/js/validate.js';

  export default {
    data() {
      return {
        from1: {
          email: ''
        },
        from1Rules: {
          email: [
            {required:true,message:'请输入邮箱(用户名)',trigger: 'change'},
            {validator: validators.email, trigger: 'change'}]
        },
        loading: false
      }
    },
    methods: {
      submitForm: function (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            sendEmail(this.from1.email).then(res => {
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
    }
  }
</script>
<style lang="less" scoped>
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
        width: 364px;
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

