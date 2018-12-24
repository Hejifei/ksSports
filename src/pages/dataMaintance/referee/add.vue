<template>
  <div>
    <el-form :model='ruleForm' ref="ruleForm" :rules="rules" label-position="top">
      <el-row >
        <div class="title">
          <img @click="back" class="back" src="../../../assets/img/back.png" alt="">
          <label >{{ruleForm.id === undefined ? '新增裁判类型' : '编辑裁判类型'}}</label>
        </div>
        <el-row :gutter="58">
          <el-col :span="24">
            <el-form-item  label="类别名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
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
import {addRefereeType,getRefereeTypeById,modifyRefereeType} from 'api/dataMaintance.js'


export default {
  data() {
    var self = this;
    return {
      ruleForm: {
        id:'',
        name:'',
      },
      rules:{
        name: [
          { required: true, message: '请输入类别名称', trigger: 'blur' },
          {min: 0, max: 10, message: '长度在 0 到 10 个字', trigger: 'blur'}
        ],
      }
    };
  },
  components: {
  },
  mounted(){
    this.ruleForm.id = this.$route.query.id;
    if(this.ruleForm.id !== undefined){
      this.detailGet();
    }
  },
  created(){
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
          addRefereeType(self.ruleForm).then(res=>{
            this.$message({message: res.desc,type: 'success'});
            this.$router.push({name:'refereetype'})
          })
        }else if(valid && this.ruleForm.id !== undefined){
          // 编辑
          modifyRefereeType(self.ruleForm).then(res=>{
            this.$message({message: res.desc,type: 'success'});
            this.$router.push({name:'refereetype'})
          })
        }
      })
    },
    detailGet(){
      // 获取比赛项目修改信息
      getRefereeTypeById({id:this.ruleForm.id}).then(res=>{
        this.ruleForm = res.data;
      })
    },
  }
};
</script>
<style lang="less">
// .avatar-uploader .el-upload {
//   border: 1px dashed #d9d9d9;
//   border-radius: 6px;
//   cursor: pointer;
//   position: relative;
//   overflow: hidden;
// }
// .avatar-uploader .el-upload:hover {
//   border-color: #409EFF;
// }
// .avatar-uploader-icon {
//   font-size: 28px;
//   color: #8c939d;
//   width: 90px;
//   height: 90px;
//   line-height: 90px;
//   text-align: center;
// }
// .avatar {
//   width: 90px;
//   height: 90px;
//   display: block;
// }
.title {
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #1b2125;
  font-weight: bold;
}

// // 报名表样式
// .gamelist{list-style: none;
//   li{display: flex;
//     .divlab{width:100px;text-align: right;font-size: 16px;color: #232323;margin-right: 80px;}
//     .divuse,.divrequire{margin-right: 57px;
//       .el-checkbox__label{font-size: 16px;color: #232323;}
//     }
//   }
// }
// .personimg{
//   width: 320px;
//   height: 140px;
//   // display: flex;
//   // justify-content:center;
//   // align-items: center;
//   .el-upload{height: 140px;}
//   .avatar {
//     width: 320px;
//     height: 140px;
//     display: block;
//   }
//   .avatar-uploader-icon{
//     width: 320px;
//     height: 140px;
//     line-height: 140px;
//   }
// }

</style>
