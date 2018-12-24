<template>
  <div>
    <el-form :model='ruleForm' ref="ruleForm" :rules="rules" label-position="top">
      <el-row >
        <div class="title">
          <img @click="back" class="back" src="../../../assets/img/back.png" alt="">
          <label >系统参数编辑</label>
        </div>
        <el-row :gutter="58">
          <el-col>
            <el-form-item  label="参数" prop="key">
              <el-input v-model="ruleForm.key" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="58">
          <el-col>
            <el-form-item  label="描述" prop="desc">
              <el-input type="textarea" v-model="ruleForm.desc" disabled ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="58">
          <el-col>
            <el-form-item  label="值" prop="value">
              <el-input v-model="ruleForm.value"></el-input>
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
import {pictUpload} from 'api/config.js'
import {EditSysParameter} from 'api/dataMaintance.js'
import store from '@/store'


export default {
  data() {
    var self = this;
    return {
      pictUpload:pictUpload,

      tinymceHtml:'',
      ruleForm: {
        id:'',
        key: "",
        desc:'',
        value:'',

      },

      rules:{
        key: [
          { required: true, message: '请输入参数', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ],
        value: [
          { required: true, message: '请输入值', trigger: 'blur' },
          { min: 0, max: 100, message: '长度在 0 到 100 个字', trigger: 'blur'}
        ],

      }
    };
  },
  components: {
  },
  mounted(){
    this.ruleForm = store.getters.syspar;
    // console.log(store.getters.syspar)
    // this.ruleForm.id = this.$route.query.id;
    // if(this.ruleForm.id !== undefined){
    //   this.detailGet();
    // }
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
        if(valid ){
          // 编辑
          EditSysParameter(self.ruleForm).then(res=>{
            this.$message({message: res.desc,type: 'success'});
            this.$router.push({name:'systemDate'})
          })
        }
      })
    }
  }
};
</script>
<style lang="less">
.title {
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #1b2125;
  font-weight: bold;
}
.main-content textarea{height: 200px;resize:none !important;}
</style>
