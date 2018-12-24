<template>
  <div class="sign-wrapper">
    <div class="title">
      智慧体育赛事管理系统-会员注册
    </div>
    <div class="main" :style="styleObj">
      <el-tabs type="border-card">
        <el-tab-pane label="俱乐部注册">
          <div class="tab0-content">
            <div class="tab0-left">
              <span class="tab0-left-title">俱乐部信息</span>
              <el-form :model="clubForm1" :rules="clubForm1Rules"  ref="clubForm1">
                <div class="avatar-wrapper top">
                  <el-form-item prop="tempLogoUrl">
                    <el-upload
                      class="avatar-uploader clubupload"
                      :action="pictUpload"
                      :show-file-list="false"
                      :on-success="handleLogoSuccess"
                      :before-upload="beforeLogoUpload">
                      <img v-if="clubForm1.tempLogoUrl" :src="clubForm1. tempLogoUrl" class="avatar-logo">
                      <img v-show="showLogoUpload" src="../../assets/img/web_jlblogo.png" class="logo-img" alt="">
                    </el-upload>
                  </el-form-item>
                  <span>俱乐部logo(300*300)</span>
                </div>
                <div class="idcard-wrapper top">
                  <el-form-item prop="tempIdCardUrl">
                    <el-upload
                      class="avatar-uploader"
                      :action="pictUpload"
                      :show-file-list="false"
                      :on-success="handleCardSuccess"
                      :before-upload="beforeCardUpload">
                      <img v-if="clubForm1.tempIdCardUrl" :src="clubForm1.tempIdCardUrl" class="avatar-card">
                      <img v-show="showCardUpload" src="../../assets/img/web_sfz.png" class="card-img" alt="">
                    </el-upload>
                  </el-form-item>
                  <span>身份证照片(800*505)</span>
                </div>
                <div class="type-wrapper top">
                  <el-form-item prop="type">
                    <el-radio-group v-model="clubForm1.type">
                      <el-radio v-for="(clubType,index) in clubTypes" :key="index" :label="clubType.value" >{{clubType.label}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </div>
                <div class="sport-wrapper top" v-if="clubForm1.type == 1">
                  <el-form-item prop="itemId">
                    <el-select v-model="clubForm1.itemId" placeholder="请选择">
                      <el-option v-for="item in itemIds" :label="item.itemName" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                    <div style="text-align:center;">项目选择</div>
                  </el-form-item>
                </div>
              </el-form>

            </div>
            <div class="tab0-right">
              <div class="tab0-right-wrapper">
                <club-form @reset="reset" :club-flag="clubFlag" :club-type="clubForm1.type" :data="clubForm1" @submit="handleClubForm1"></club-form>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="裁判员注册">
          <div class="tab0-content">
            <div class="tab0-left">
              <span class="tab0-left-title">裁判员信息</span>
              <el-form :model="judgeForm1" ref="judgeForm1" :rules="judgeForm1Rules">
                <div class="avatar-wrapper top">
                  <el-form-item prop="tempLogoUrl">
                    <el-upload
                      class="avatar-uploader personimg"
                      :action="pictUpload"
                      :show-file-list="false"
                      :on-success="handleJudgeLogoSuccess"
                      :before-upload="beforeLogoUpload">
                      <img v-if="judgeForm1.tempLogoUrl" :src="judgeForm1.tempLogoUrl" class="avatar-logo">
                      <img v-show="this.showJudgeLogoUpload" src="../../assets/img/web_jlblogo.png" class="logo-img" alt="">
                    </el-upload>
                  </el-form-item>
                  <span>个人照片(295*413)</span>
                </div>
                <div class="idcard-wrapper top">
                  <el-form-item prop="tempIdCardUrl">
                    <el-upload
                      class="avatar-uploader"
                      :action="pictUpload"
                      :show-file-list="false"
                      :on-success="handleJudgeCardSuccess"
                      :before-upload="beforeCardUpload">
                      <img v-if="judgeForm1.tempIdCardUrl" :src="judgeForm1.tempIdCardUrl" class="avatar-card">
                      <img v-show="this.showJudgeCardUpload" src="../../assets/img/web_sfz.png" class="card-img" alt="">
                    </el-upload>
                  </el-form-item>
                  <span>身份证照片(800*505)</span>
                </div>
              </el-form>
            </div>
            <div class="tab0-right">
              <div class="tab0-right-wrapper">
                <judge-form @reset="judgereset" :judge-flag="judgeFlag" :itemIds="itemIds" :data="judgeForm1" @submitjudge="handleJudgeSubmit"></judge-form>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import 'styles/regist.less'
import ClubForm from './ClubForm'
import JudgeForm from './JudgeForm'
import {pictUpload} from 'api/config.js'
import {getItemDrop} from 'api/common.js'
import {getList} from 'api/common';

export default {
    data() {
      return {
        clubForm1:{
          logoUrl: '',
          idCardUrl: '',
          type:'1',
          itemId:'',
          tempLogoUrl:'',
          tempIdCardUrl:''
        },
        clubForm1Rules:{
          tempLogoUrl:[{required:true,message:'请上传logo',trigger:'change'}],
          tempIdCardUrl:[{required:true,message:'请上传身份证图片',trigger:'change'}],
          type:[{required:true,message:'请选择类型',trigger:'change'}],
          itemId:[{required:true,message:'请选择项目',trigger:'change'}]
        },
        pictUpload:pictUpload,
        judgeForm1:{
         refereeUrl: '',
         idCardUrl: '',
         tempLogoUrl:'',
         tempIdCardUrl:''
        },
        judgeForm1Rules:{
          tempLogoUrl:[{required:true,message:'请上传个人照片',trigger:'change'}],
          tempIdCardUrl:[{required:true,message:'请上传身份证图片',trigger:'change'}],
        },
        clubFlag:false,
        judgeFlag:false,
        clubTypes:[],
        // 比赛项目id
        itemIds:[]
      };
    },
    computed:{
      styleObj(){
        if((!!window.ActiveXObject || "ActiveXObject" in window)){
          debugger
            return {'margin-bottom':'30px'}
        }
         
      },
      showLogoUpload(){
        if(this.clubForm1.logoUrl){
          return false
        }else{
          return true
        }
      },
      showCardUpload(){
        if(this.clubForm1.idCardUrl){
          return false
        }else{
          return true
        }
      },
      showJudgeLogoUpload(){
        if(this.judgeForm1.refereeUrl){
          return false
        }else{
          return true
        }
      },
      showJudgeCardUpload(){
        if(this.judgeForm1.idCardUrl){
          return false
        }else{
          return true
        }
      }
    },
    watch:{
      'clubForm1.type'(val){
        if(val!=1){
          this.$refs.clubForm1.clearValidate(['itemId'])
        }
      }
    },
    components:{
      ClubForm,
      JudgeForm
    },
    methods: {
      // club logo上传
      handleLogoSuccess(res, file) {
        this.clubForm1.tempLogoUrl = URL.createObjectURL(file.raw);
        this.clubForm1.logoUrl = res.data;
        this.$refs.clubForm1.clearValidate(['tempLogoUrl'])
      },
      // judge logo上传
      handleJudgeLogoSuccess(res, file) {
        this.judgeForm1.tempLogoUrl = URL.createObjectURL(file.raw);
        this.judgeForm1.refereeUrl = res.data;
        this.$refs.judgeForm1.clearValidate(['tempLogoUrl'])
      },
      beforeLogoUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      // club 身份证上传
      handleCardSuccess(res, file) {
        this.clubForm1.tempIdCardUrl = URL.createObjectURL(file.raw);
        this.clubForm1.idCardUrl = res.data;
        this.$refs.clubForm1.clearValidate(['tempIdCardUrl'])
      },
      // club 身份证上传
      handleJudgeCardSuccess(res, file) {
        this.judgeForm1.tempIdCardUrl = URL.createObjectURL(file.raw);
        this.judgeForm1.idCardUrl = res.data;
        this.$refs.judgeForm1.clearValidate(['tempIdCardUrl'])
      },
      beforeCardUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleClubForm1(){
        this.$refs.clubForm1.validate(valid=>{
          if(valid){
            this.clubFlag=true
          }else{
            this.clubFlag=false
            return false
          }
        })

      },
      handleJudgeSubmit(){
        this.$refs.judgeForm1.validate(valid=>{
          if(valid){
            this.judgeFlag=true
          }else{
            this.judgeFlag=false
            return false
          }
        })

      },
      getClubTypeList() {
        getList("ClubType").then(res=>{
          this.clubTypes=res.data;
          this.clubForm1.type = res.data[0].value;
        })
      },
      // 获取比赛项目下拉
      getItemId(type){
        getItemDrop(type).then(res=>{
          this.itemIds=res.data
        })
      },
      reset(){
        this.clubFlag=false;
      },
      judgereset(){
        this.judgeFlag = false;
      }
    },
    mounted(){
      this.getClubTypeList();
      this.getItemId(1)
    }
  }
</script>
<style lang="less" scoped>
.sign-wrapper /deep/ .el-tabs__content{
  overflow: visible !important;
}
.sign-wrapper /deep/ .el-tabs--border-card{
  border: 0;
}
.sign-wrapper /deep/ .el-tabs {
  height: 100%;
  border-radius: 18px;

}
.sign-wrapper /deep/ .el-tabs__header {
  display: inline-block;
  border-top-left-radius: 18px;
}
.sign-wrapper /deep/ .el-tabs__header * {
  border-top-left-radius: 18px;
}
.sign-wrapper /deep/ #tab-1 {
  border-top-left-radius: 0;
}
.sign-wrapper /deep/ .el-tabs__item {
  width: 202px;
  height: 75px;
  font-size: 20px;
  background: #dbdbdb;
  text-align: center;
  line-height: 75px;
}
.sign-wrapper /deep/ .is-active {
  color: #fff !important;
  background: #32cdfe !important;
}

// .sign-wrapper {
//   height: 100%;
//   overflow: auto;
//   width: 100%;
//   padding: 41px 60px 45px;
//   background: linear-gradient(to right, #006db3, #6DC6FF);
//   display: flex;
//   flex-direction: column;
//   .title {
//     font-size: 38px;
//     color: white;
//     margin-bottom: 40px;

//   }
// }
.main {
  // flex: 1;
  
  border-radius: 18px;
  background: white;
  .tab0-content {
    display: flex;
    .tab0-left-title{
      margin-left: 52px;
      font-size: 18px;
    }
    .tab0-left{
      width: 403px;

    }
    .tab0-right{
      flex: 1;
      margin-top: -93px;
      margin-right: 50px;
    }
    .avatar-wrapper,.idcard-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409eff;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar-logo {
        // width: 100px;
        // height: 100px;
        display: block;
      }
      .avatar-card {
        width: 280px;
        height: 178px;
        display: block;
      }
      span{
        color: #6B8598;
        font-size: 18px;
      }
      .logo-img{
        // width: 100px;
        // height: 100px;
      }
      .card-img{
        width: 280px;
        height: 178px;
      }
    }
    .type-wrapper,.sport-wrapper{
      display: flex;
      justify-content:center;
    }
    .top{
      margin-top: 30px;
      margin-bottom: 30px;
    }
  }
}

</style>

