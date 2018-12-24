<template>
  <div>
    <el-form :model='sportForm' ref="sportForm" :rules="rules" label-position="top"  :inline-message="true">
      <el-row >
        <el-col :span="8" class="left">
          <div class="title">
            <img class="back" @click="back" src="../../../assets/img/back.png" alt="">
            <span >运动员信息</span>
          </div>
          <div class="avatar-wrapper top">
            <el-form-item prop="playerUrl">
              <el-upload
                class="avatar-uploader personimg"
                :disabled="viewtype !== undefined"
                :action="uploadUrl"
                :show-file-list="false"
                :on-success="handleLogoSuccess"
                :before-upload="beforeLogoUpload">
                <img v-if="sportForm.playerUrl" :src="sportForm.playerUrl" class="avatar">
                <img v-if="!sportForm.playerUrl" src="../../../assets/img/web_jlblogo.png" class="logo-img" alt="">
              </el-upload>
            </el-form-item>
            <span style="margin-top:-10px;">个人照片<label v-if="viewtype === undefined">（295*413）</label></span>
          </div>
          <div class="idcard-wrapper top">
            <el-form-item prop="idCardUrl">
              <el-upload
                :disabled="viewtype !== undefined"
                class="avatar-uploader"
                :action="uploadUrl"
                :show-file-list="false"
                :on-success="handleCardSuccess"
                :before-upload="beforeCardUpload">
                <img v-if="sportForm.idCardUrl" :src="sportForm.idCardUrl" class="avatar">
                <img v-if="!sportForm.idCardUrl" src="../../../assets/img/web_sfz.png" class="card-img" alt="">
              </el-upload>
            </el-form-item>
            <span style="margin-top:-10px;">身份证照片<label v-if="viewtype === undefined">(800*505)</label></span>
          </div>
        </el-col>
        <el-col :span="16" class="right">
          <el-row :gutter="58">
            <el-col :span="12">
              <el-form-item  label="姓名" prop="playerName">
                <el-input v-model="sportForm.playerName" :disabled="viewtype !== undefined"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item  label="联系电话" prop="phone">
                <el-input v-model="sportForm.phone" :disabled="viewtype !== undefined"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="58">
            <el-col :span="12">
              <el-form-item  label="身份证号码/护照" prop="idCardNo">
                <el-input v-model="sportForm.idCardNo" :disabled="viewtype !== undefined"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item  label="社保号码（选填）" prop="socialNo">
                <el-input v-model="sportForm.socialNo" :disabled="viewtype !== undefined"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="58">
            <el-col :span="12">
              <el-form-item  label="所属俱乐部" prop="clubId">
                <el-select v-model="sportForm.clubId" placeholder="选择俱乐部" :disabled="isDisabled ">
                  <el-option
                    v-for="(foreign,index) in clublist"
                    :key="index"
                    :label="foreign.clubName"
                    :value="foreign.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item  label="是否外援" prop="isForeign">
                <el-select v-model="sportForm.isForeign" :disabled="viewtype !== undefined"  placeholder="请选择">
                  <el-option
                    v-for="(foreign,index) in foreignlist"
                    :key="index"
                    :label="foreign.label"
                    :value="foreign.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="58">
            
            <el-col :span="12">
              <el-form-item  label="性别" prop="sex">
                <el-select v-model="sportForm.sex" :disabled="viewtype !== undefined"  placeholder="请选择">
                  <el-option
                    v-for="(foreign,index) in sexs"
                    :key="index"
                    :label="foreign.label"
                    :value="foreign.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="58">
            <el-col :span="24">
              <el-form-item label="其他资质" prop="qualifyFiles">
                <el-upload
                  :disabled="viewtype !== undefined"
                  :action="uploadUrl"
                  list-type="picture-card"
                  :on-success="handleQualifySuccess"
                  :on-preview="handlePictureCardPreview"
                  :file-list="qualifyList"
                  :before-upload="beforeQualifyFiles"
                  :on-remove="handleRemove">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </el-form-item>
            </el-col>

          </el-row>
          <p class="tipp">注册须知：{{registerTip}}</p>
          <el-row justify="center" type="flex" class="commit-wrapper" v-if="viewtype === undefined">
            <el-col :span="8">
              <el-form-item class="formbtnline">
                <el-button type="primary" @click="submitForm">保存</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import {pictUpload} from 'api/config.js'
import {getList,getClubDrop,getparameter} from 'api/common.js'
import {addPlayer,editPlayer,getPlayerById} from 'api/player.js'
import validators from '@/assets/js/validate.js'

export default {
  data() {
    return {
      originalClub:'',
      submitConfirm:'123',
      registerTip:'',
      uploadUrl:pictUpload,
      qualifyList:[],
      sportForm: {
        id:'',
        sex:'',
        playerUrl: "",
        idCardUrl: "",
        playerName: "",
        phone: "",
        idCardNo: "",
        socialNo: "",
        clubId: "",
        isForeign: "",
        qualifyFiles: []
      },
      sexs: [],
      rules:{
        playerUrl: [{ required: true, message: '请上传个人照片', trigger: 'change' }],
        idCardUrl: [{ required: true, message: '请上传身份证照片', trigger: 'change' }],
        playerName: [{ required: true, message: '请填写姓名', trigger: 'blur' },{ min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }],
        phone: [{ required: true, message: '请填写联系电话', trigger: 'blur' },{validator:validators.phone}],
        idCardNo: [{ required: true, message: '请填写身份证号码/护照', trigger: 'blur' },{validator:validators.carId}],
        socialNo:[{validator:validators.socialNo,trigger:'blur'},{ min: 0, max: 30, message: '长度在 0 到 30 个字符'}],
        clubId: [{ required: true, message: '请选择所属俱乐部', trigger: 'change' }],
        isForeign: [{ required: true, message: '请选择是否外援', trigger: 'change' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
      },
      firstStep:true,
      secondStep:false,
      dialogVisible:false,
      dialogImageUrl:'',

      foreignlist:[],
      clublist:[],
      viewtype:''
    };
  },
  components: {},
  computed:{
    isDisabled(){
      if(this.$route.name == 'clubsport-edit') {
        return true
      }
      if(this.viewtype!==undefined || (this.$route.name == 'clubsport-add')){
        return true
      }else {
        return false
      }
    }
  },
  mounted(){
    console.log(this.$route.query.id)
    if(this.$route.query.clubId){
      this.sportForm.clubId = parseInt(this.$route.query.clubId)
    }
    this.sportForm.id = this.$route.query.id;
    this.viewtype = this.$route.query.type;
    if(this.sportForm.id !== undefined){
      this.queryInit();
    }else{
      this.getClubs();
    }

    getparameter('ADD_PLAYER_NOTE').then(res=>{
      this.registerTip=res.data
    })
    getList('YesNo').then(res=>{
      this.foreignlist = res.data
    })
    getList('Sex').then(res=>{
      this.sexs = res.data
    })

    // 在下次 DOM 更新循环结束之后执行延迟回调
    this.$nextTick(function(){
      if(this.viewtype !== undefined){
        document.querySelector('.el-upload--picture-card').setAttribute("style","display:none");
      }
    })
  },
  methods: {
    queryInit(){

      getPlayerById(this.$route.query.id).then(res=>{
        this.getClubs(res.data.clubType);
        this.sportForm=res.data
        this.originalClub = this.sportForm.clubId;
        this.qualifyList=(res.data.qualifyFiles).map(val=>
          ({
            id:val,
            name:val,
            url:val
          })
        )
      })

    },
    getClubs(type) {
      getClubDrop(type).then(res=>{
        this.clublist = res.data
      })
    },
    // club logo上传
    handleLogoSuccess(res, file) {
      this.sportForm.playerUrl = res.data;
    },
    beforeLogoUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // club 身份证上传
    handleCardSuccess(res, file) {
      this.sportForm.idCardUrl = res.data;
    },
    beforeCardUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleRemove(file, fileList) {
      let qualifyFiles = fileList.map(val=> val.url)
      this.sportForm.qualifyFiles = qualifyFiles;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //其他资质
    handleQualifySuccess(res, file) {
      this.sportForm.qualifyFiles.push(res.data);
    },
    beforeQualifyFiles(files){
      if(files.type.substring(0,files.type.indexOf("/")) != 'image'){
        this.$message.error("资质文件只能上传图片！");
        return false;
      }
    },
    submitForm(form){
      if(this.sportForm.id!==undefined){
        //编辑
        this.$refs['sportForm'].validate(valid => {
          if(valid){
            if(this.originalClub == this.sportForm.clubId){
              this.submitConfirm = '确认修改?'
            }else{
              this.submitConfirm = '确认转会?'
            }
            this.$confirm(this.submitConfirm, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              editPlayer(this.sportForm).then(res=>{
                this.$message({message: res.desc,type: 'success'});
                if(this.$route.name=='clubsport-edit'){
                  this.$router.push({name:'clubsport-manage'})
                }else{
                  this.$router.push({name:'sport-manage'})
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              });
            });
          }
        })
      }else{
        //新增
        this.$refs['sportForm'].validate(valid => {
          // console.log(valid)
          if(valid){
            addPlayer(this.sportForm).then(res=>{
              this.$message({message: res.desc,type: 'success'});
              if(this.$route.name=='clubsport-add'){
                this.$router.push({name:'clubsport-manage'})
              }else{
                this.$router.push({name:'sport-manage'})
              }
            })
          }
        })
      }

    },
    back(){
      this.$router.go(-1)
    }
  },
  watch:{
    'sportForm.idCardNo'(val){
      let reg=/^(320583)|(320523)/
      if(!reg.test(val)){
        this.rules={...this.rules,qualifyFiles:[{required:true,message:'请上传资质',trigger:'change'}]}
      }else{
        if('qualifyFiles' in this.rules){
          this.$delete(this.rules,'qualifyFiles')
        }
        this.$refs.sportForm.clearValidate(['qualifyFiles'])
      }
    }
  },
};
</script>
<style lang="less" scoped>
.right /deep/ .el-form-item__label {
  padding: 0;
}
.left {
  padding-left: 20px;
  padding-top: 15px;
  border-radius: 18px;
  background: #f8fafb;
  .title {
    display: flex;
    align-items: center;
    font-size: 20px;
    color: #1b2125;
  }
  .avatar-wrapper,
  .idcard-wrapper {
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
    .avatar {
      width: 104px;
      height: 145px;
      display: block;
      border-radius: 2px;
    }
    span {
      color: #6b8598;
      font-size: 18px;
    }
    .logo-img {
      width: 100px;
      height: 100px;
    }
    .card-img {
      width: 280px;
      height: 178px;
    }
  }
  .identity-wrapper,
  .sport-wrapper {
    display: flex;
    justify-content: center;
  }
  .top {
    margin-top: 23px;
    margin-bottom: 30px;
  }

}
.personimg{
  width: 104px;
  height: 145px;
  // display: flex;
  // justify-content:center;
  // align-items: center;
  .el-upload{height: 145px;}
  .avatar {
    width: 104px;
    height: 145px;
    display: block;
  }
}
.personimg .el-upload {
    height: 145px;
}
.right {
  padding: 20px;

  .el-select {
    width: 100%;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .commit-wrapper{
    button{
      width: 100%;
    }
  }
}
</style>
