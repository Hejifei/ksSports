<template>
  <div>
    <el-form :model='ruleForm' ref="ruleForm" :rules="rules" label-position="top">
      <el-row >
        <div class="title">
          <img @click="back" class="back" src="../../../assets/img/back.png" alt="">
          <label >{{ruleForm.id === undefined ? '新增用户' : '编辑用户'}}</label>
        </div>
        <el-row :gutter="58">
          <el-col :span="12">
            <el-form-item  label="用户名" prop="username">
              <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="58">
          <el-col :span="12">
            <el-form-item  label="账号" prop="account">
              <el-input v-model="ruleForm.account" :disabled="ruleForm.id === undefined ? false : true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="58" v-if="ruleForm.id === undefined ? true : false">
          <el-col :span="12">
            <el-form-item  label="密码" prop="password">
              <el-input type="password" v-model="ruleForm.password"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="58">
          <el-col :span="12">
            <el-form-item  label="角色" prop="roleIds">
              <el-select
                v-model="ruleForm.roleIds"
                multiple
                style="width:100%;"
                placeholder="请选择角色">
                <el-option
                  v-for="role in roleoptions"
                  :key="role.id"
                  :label="role.roleName"
                  :value="role.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row type="flex" justify="center"  class="commit-wrapper">
          <el-button class="savebtn" type="primary" size="medium" @click="submitForm('ruleForm')">保存</el-button>
        </el-row>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import {userAdd,userEdit,getRoles,getRolesSel} from 'api/systemUser.js'
import store from '@/store'


export default {
  data() {
    var self = this;
    return {
      roleoptions:[],
      ruleForm: {
        id:'',
        username: "",
        account:'',
        password:'',
        roleIds:[]
      },
      rules:{
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { max: 20, message: '用户名最大长度为20', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { max: 50, message: '账号最大长度为50', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min : 6, max: 18, message: '密码长度为6-18', trigger: 'blur' }
        ],
        roleIds: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
      }
    };
  },
  components: {
  },
  mounted(){
    this.ruleForm.id = this.$route.query.id;
    this.rolelist();
    if(this.ruleForm.id !== undefined){
      let useredit = JSON.parse(sessionStorage.useredit);
      this.ruleForm.username = useredit.username;
      this.ruleForm.account = useredit.account;
      this.roleSel();
    }
  },
  created(){
    let self = this;
  },
  methods: {
    back(){
      this.$router.go(-1)
    },
    //提交信息
    submitForm() {
      let self = this;
      self.$refs['ruleForm'].validate(valid => {
        if(valid && this.ruleForm.id === undefined){
          // 添加
          userAdd(self.ruleForm).then(res=>{
            this.$message({message: res.desc,type: 'success'});
            this.$router.push({name:'user'})
          })
        }else if(valid && this.ruleForm.id !== undefined){
          // 编辑
          userEdit(self.ruleForm).then(res=>{
            this.$message({message: res.desc,type: 'success'});
            this.$router.push({name:'user'})
          })
        }
      })
    },
    detailGet(){
      // 获取比赛项目修改信息
      getItem({id:this.ruleForm.id}).then(res=>{
        let newres = res.data;
        for (let i in newres) {
          if (typeof (newres[i]) === 'number' && (i !== 'id' && i !== 'type')) {
            newres[i] = newres[i] === 0 ? true : false
          } else if ( i === 'type'){
            newres[i] = String(newres[i])
          }
        }
        this.ruleForm = newres;
      })
    },
    rolelist(){
      getRoles({}).then(res=>{
        // console.log(res)
        this.roleoptions = res.data;
      })
    },
    roleSel(){
      getRolesSel({id:this.ruleForm.id}).then(res=>{
        this.ruleForm.roleIds = res.data.map(val=>val.id);
      })
    }
  }
};
</script>
<style lang="less">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 90px;
  height: 90px;
  line-height: 90px;
  text-align: center;
}
.avatar {
  width: 90px;
  height: 90px;
  display: block;
}
.title {
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #1b2125;
  font-weight: bold;
}

// 报名表样式
.gamelist{list-style: none;
  li{display: flex;
    .divlab{width:100px;text-align: right;font-size: 16px;color: #232323;margin-right: 80px;}
    .divuse,.divrequire{margin-right: 57px;
      .el-checkbox__label{font-size: 16px;color: #232323;}
    }
  }
}
</style>
