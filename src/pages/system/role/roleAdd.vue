<template>
  <div>
    <el-form :model='ruleForm' ref="ruleForm" :rules="rules" label-position="top">
      <el-row >
        <div class="title">
          <img @click="back" class="back" src="../../../assets/img/back.png" alt="">
          <label >{{ruleForm.id === undefined ? '新增角色' : '编辑角色'}}</label>
        </div>
        <el-row :gutter="58">
          <el-col>
            <el-form-item  label="角色名称" prop="roleName">
              <el-input v-model="ruleForm.roleName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="58">
          <el-col>
            <el-form-item  label="角色描述" prop="roleDesc">
              <el-input type="textarea" v-model="ruleForm.roleDesc" ></el-input>
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
import {roleAdd,roleEdit} from 'api/systemRole.js'
import store from '@/store'


export default {
  data() {
    var self = this;
    return {
      roleoptions:[],
      ruleForm: {
        id:'',
        roleName: "",
        roleDesc:''
      },
      rules:{
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { max: 20, message: '角色名称最大长度为20', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          { max: 300, message: '角色描述最大长度为300', trigger: 'blur' }
        ]
      }
    };
  },
  components: {
  },
  mounted(){
    this.ruleForm.id = this.$route.query.id;
    if(this.ruleForm.id !== undefined){
      let useredit = JSON.parse(sessionStorage.useredit);
      this.ruleForm.roleName = useredit.roleName;
      this.ruleForm.roleDesc = useredit.roleDes;

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
          roleAdd(self.ruleForm).then(res=>{
            this.$message({message: res.desc,type: 'success'});
            this.$router.push({name:'role'})
          })
        }else if(valid && this.ruleForm.id !== undefined){
          // 编辑
          roleEdit(self.ruleForm).then(res=>{
            this.$message({message: res.desc,type: 'success'});
            this.$router.push({name:'role'})
          })
        }
      })
    }
  }
};
</script>
<style lang="less">
.main-content textarea{height: 200px;resize:none !important;}
</style>
