<template>
  <div>
    <el-form :model='clubForm' ref="clubForm" :rules="rules" label-position="top"  :inline-message="true">
      <el-row >
        <el-col :span="8" class="left">
          <div class="title">
            <img @click="back" class="back" src="../../../assets/img/back.png" alt="">
            <label >俱乐部信息</label>
          </div>
          <div class="avatar-wrapper top">
            <el-form-item  prop="logoUrl">
              <el-upload
                :disabled="viewtype !== undefined"
                class="avatar-uploader clubupload"
                :action="uploadUrl"
                :show-file-list="false"
                :on-success="handleLogoSuccess"
                :before-upload="beforeLogoUpload">
                <img v-if="clubForm.logoUrl" :src="clubForm.logoUrl" class="avatar">
                <img v-if="!clubForm.logoUrl" src="../../../assets/img/web_jlblogo.png" class="logo-img" alt="">
              </el-upload>
            </el-form-item>
            <span style="margin-top:-10px;">俱乐部logo<label v-if="viewtype === undefined">(300*300)</label></span>
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
                <img v-if="clubForm.idCardUrl" :src="clubForm.idCardUrl" class="avatar">
                <img  v-if="!clubForm.idCardUrl" src="../../../assets/img/web_sfz.png" class="card-img" alt="">
              </el-upload>
            </el-form-item>
            <span style="margin-top:-10px;">身份证照片<label v-if="viewtype === undefined">(800*505)</label></span>
          </div>
          <div class="identity-wrapper top">
            <el-form-item prop="type">
              <el-radio-group v-model="clubForm.type" :disabled="viewtype !== undefined">
                <el-radio v-for="(clubType,index) in clubTypes" :key="index" :label="clubType.value" >{{clubType.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div class="sport-wrapper top" v-if="clubForm.type === 1">
            <el-form-item prop="itemId">
              <el-select v-model="clubForm.itemId" placeholder="请选择" :disabled="viewtype !== undefined">
                <el-option
                  v-for="item in projectOptions"
                  :key="item.id"
                  :label="item.itemName"
                  :value="item.id">
                </el-option>
              </el-select>
              <div style="text-align:center;">项目选择</div>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="16" class="right" v-show="firstStep">
          <el-row :gutter="58">
            <el-col :span="12">
              <el-form-item  label="邮箱(用户名)" prop="email">
                <el-input v-model="clubForm.email" :disabled="(viewtype !== undefined)||(!!clubForm.id)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item  label="俱乐部名" prop="clubName">
                <el-input v-model="clubForm.clubName" :disabled="viewtype !== undefined"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="58">
            <el-col :span="12">
              <el-form-item  label="领队姓名" prop="leaderName">
                <el-input v-model="clubForm.leaderName" :disabled="viewtype !== undefined"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item  label="联系电话" prop="phone">
                <el-input v-model="clubForm.phone" :disabled="viewtype !== undefined"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="58">
            <el-col :span="12">
              <el-form-item  label="身份证号码/护照" prop="idCardNo">
                <el-input v-model="clubForm.idCardNo" :disabled="viewtype !== undefined"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item  label="联系地址" prop="address">
                <el-input v-model="clubForm.address" :disabled="viewtype !== undefined"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="58">
            <el-col :span="12">
              <el-form-item prop="sponsor" label="赞助商">
                <el-input v-model="clubForm.sponsor" :disabled="viewtype !== undefined"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item  label="教练员" prop="coach">
                <el-input v-model="clubForm.coach" :disabled="viewtype !== undefined"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="58" v-if="clubForm.type!=2">
            <el-col :span="12">
              <el-form-item  label="级别" prop="level">
                <el-select v-model="clubForm.level" placeholder="请选择" :disabled="viewtype !== undefined">
                  <el-option
                    v-for="item in levelOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="58">
            <el-col :span="24">
              <el-form-item  label="备注" prop="remark">
                <el-input v-model="clubForm.remark" :disabled="viewtype !== undefined" type="textarea"></el-input>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row :gutter="58">
            <el-col :span="24">
              <el-form-item ref="qualifyFiles"  label="其他资质" prop="qualifyFiles">
                <el-upload
                  class="aaa"
                  ref='otherpic'
                  :disabled="viewtype !== undefined"
                  :action="uploadUrl"
                  list-type="picture-card"
                  :on-success="handleQualifySuccess"
                  :on-preview="handleQualifyPreview"
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
          <div class="aplRecord" v-if="viewtype !== undefined">
            <div class="aR_title">审批记录：</div>
            <div class="ar_Detail" v-if="clubForm !== null">
              <p v-for="(approve,index) in clubForm.approveRecordList" :key="index">
                {{approve.approveTime}} {{approve.statusName}}    <span v-if="approve.reason !== ''">原因：</span>{{approve.reason}}</p>
            </div>
            <div class="ar_Detail" v-if="clubForm.approveRecordList  === null">
              <p>暂无记录！</p>
            </div>
          </div>
          <el-row justify="center" type="flex" class="commit-wrapper" v-if="clubForm.id === undefined">
            <el-col :span="8">
              <el-form-item class="formbtnline">
                <el-button type="primary" @click="next">下一步</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row justify="center" type="flex" class="commit-wrapper" v-if="clubForm.id !== undefined && viewtype === undefined">
            <el-col :span="8">
              <el-form-item class="formbtnline">
                <el-button type="primary" @click="submitForm()">保存</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row justify="center" type="flex" class="commit-wrapper" :gutter="20"  v-if="viewtype === 'examine'">
            <el-col :span="8">
              <el-form-item class="formbtnline">
                <el-button type="primary" class="bluebtn" @click="clubApprove(2)">通过</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="formbtnline">
                <el-button type="danger" class="redbtn" @click="refuse()">拒绝</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="16" class="right" v-show="secondStep" >
          <el-row >
            <el-col>
              <el-form-item  label="密码(请输入6~18位数字,字母或常用字符,字母区分大小写)" prop="password">
                <el-input type="password" v-model="clubForm.password"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row >
            <el-col>
              <el-form-item label="确认密码" prop="surePassword">
                <el-input type="password" v-model="clubForm.surePassword"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center"  class="commit-wrapper" :gutter="20">
            <el-col :span="8">
              <el-form-item class="formbtnline">
                <el-button type="primary" size="medium" @click="laststep">上一步</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="formbtnline">
                <el-button type="primary" size="medium" @click="submitForm()">保存</el-button>
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
import {getList,getItemDrop,getparameter} from 'api/common.js'
import {addClub,getClubById,editClub,Clubapprove} from 'api/club.js'
import validators from '@/assets/js/validate.js'
export default {
  data() {
    let pwd=(rule, value, callback) => {
      let reg=/^[a-zA-Z0-9]\w{5,17}$/
      if (value === '') {
        callback(new Error('请输入密码'));
      }else if(!reg.test(value)){
        callback(new Error('请输入正确格式密码'))
      }else {
        if (this.clubForm.surePassword !== '') {
          this.$refs.clubForm.validateField('surePassword');
        }
        callback();
      }

    };
    let surePwd=(rule, value, callback) => {
      // console.log(value,this.clubForm3.password)
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value != this.clubForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      uploadUrl:pictUpload,
      qualifyList:[],
      clubForm: {
        id:'',
        email: "",
        clubName: "",
        leaderName: "",
        phone: "",
        idCardNo: "",
        address: "",
        sponsor: "",
        coach: "",
        level: "",
        remark: "",
        sponsor:"",
        logoUrl: "",
        idCardUrl: "",
        qualifyFiles:[],
        itemId: "",
        type:"",
        password:"",
        surePassword:""
      },
      firstStep:true,
      secondStep:false,
      levelOptions:[],
      projectOptions:[],
      dialogVisible:false,
      dialogImageUrl:'',
      rules:{
        logoUrl:[
          { required: true, message: '请上传俱乐部Logo', trigger: 'change' },
        ],
        idCardUrl:[
          { required: true, message: '请上传身份证照片', trigger: 'change' },
        ],
        itemId:[
          {required:true,message:'请选择项目',trigger:'change'}
        ],
        type: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ],
        email: [
          { required: true, message: '请填写邮箱', trigger: 'blur' }
        ],
        clubName: [
          { required: true, message: '请填写俱乐部名', trigger: 'blur' },
          {min: 0, max: 20, message: '长度在 0 到 20 个字符', trigger: 'blur'}
        ],
        leaderName: [
          { required: true, message: '请填写领队姓名', trigger: 'blur' },
          {min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'blur'}
        ],
        phone: [
          // { required: true, message: '请填写联系电话', trigger: 'blur' },
          {validator:validators.phone,required:true,trigger:'blur'}
        ],
        idCardNo: [
          // { required: true, message: '请填写身份证号码/护照', trigger: 'blur' },
          {validator:validators.carId,required:true,trigger:'blur'}
        ],
        address: [
          { required: true, message: '请填写联系地址', trigger: 'blur' },
          {min: 0, max: 200, message: '长度在 0 到 200 个字符', trigger: 'blur'}
        ],
        level: [
          { required: true, message: '请选择级别', trigger: 'change' }
        ],
        coach: [
          { required: true, message: '请填写教练', trigger: 'blur' },
          {min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'blur'}
        ],
        remark: [
          {min: 0, max: 200, message: '长度在 0 到 200 个字符', trigger: 'blur'}
        ],
        sponsor: [
          {min: 0, max: 200, message: '长度在 0 到 200 个字符', trigger: 'blur'}
        ]
        // password:[{required:true,validator:pwd,trigger:'blur'}],
        // surePassword:[{required:true,validator:surePwd,trigger:'blur'}]
      },
      clubTypes:[],
      registerTip:'',
      viewtype:''
    };
  },
  components: {},
  mounted(){
    let self = this;
    this.clubForm.id = this.$route.query.id;

    this.viewtype = this.$route.query.type;
    if(this.viewtype){
      // let imgUpload=document.getElementsByClassName('aaa').getElementsByClassName('el-upload--picture-card')
      // imgUpload.style.display='none'

    }
    if(this.clubForm.id !== undefined){
      this.editInit();
    }
    // 在下次 DOM 更新循环结束之后执行延迟回调
    this.$nextTick(function(){
      if(self.viewtype !== undefined){
        document.querySelector('.el-upload--picture-card').setAttribute("style","display:none");
      }
    })

  },
  created(){
    let self = this;
    this.queryItem();
    self.queryEnum();
  },
  methods: {
    editInit(){
      let self = this;
      getClubById(this.clubForm.id).then(res=>{
        self.clubForm = res.data;
        self.qualifyList=(res.data.qualifyFiles).map(val=>
          ({
            id:val,
            name:val,
            url:val
          })
        )
      })
    },
    clubApprove(approveStatus,reason){
      // 2-通过 3拒绝
      Clubapprove({clubId:this.clubForm.id,approveStatus:approveStatus,reason}).then(res=>{
        this.$message({message: res.desc,type: 'success'});
        this.$router.push({name:'club-manage'})
      })
    },
    next(){
      let self = this;
      // if(!self.clubForm.logoUrl){
      //   this.$message({message: '俱乐部logo不能为空',type: 'error'});
      //   return false;
      // }
      // if(!self.clubForm.idCardUrl){
      //   this.$message({message: '身份证照片不能为空',type: 'error'});
      //   return false;
      // }
      self.$refs['clubForm'].validate(valid => {
        if(valid){
          self.secondStep=true
          self.firstStep=false
        }
      })
    },
    laststep(){
      this.secondStep=false
      this.firstStep=true
    },
    back(){
      this.$router.go(-1)
    },
    //提交信息
    submitForm() {
      let self = this;
      if(this.clubForm.id !== undefined){
        // 编辑
        this.$refs['clubForm'].validate(valid => {
          if(valid){
            editClub(this.clubForm).then(res=>{
              this.$message({message: res.desc,type: 'success'});
              this.$router.push({name:'club-manage'})
            })
          }
        })
      }else{
        // 新增
        if(!self.clubForm.password){
          this.$message({message: '密码不能为空！',type: 'error'});
          return false;
        }
        let reg=/^[a-zA-Z0-9]\w{5,17}$/
        if (!reg.test(self.clubForm.password)) {
          this.$message({message: '密码格式不正确！',type: 'error'});
          return false;
        }
        if(!self.clubForm.surePassword){
          this.$message({message: '请确认密码！',type: 'error'});
          return false;
        }
        if(self.clubForm.password != self.clubForm.surePassword){
          this.$message({message: '两次密码输入不一致！',type: 'error'});
          return false;
        }
        this.$refs['clubForm'].validate(valid => {
          if(valid){
            addClub(this.clubForm).then(res=>{
              this.$message({message: res.desc,type: 'success'});
              this.$router.push({name:'club-manage'})
            })
          }
        })
      }
    },
    //活动区域下拉
    queryItem() {
      let self = this;
      self.clubForm.itemId = '';
      getItemDrop(1).then(res=>{
        if(res.code == 200){
          self.projectOptions = res.data
        }
      })
    },
    //下拉常量初始化
    queryEnum(){
      let self = this;
      getList('ClubLevel').then(res=>{
        if(res.code == 200){
          self.levelOptions = res.data
        }
      })
      getList("ClubType").then(res=>{
        this.clubTypes=res.data;
        this.clubForm.type = res.data[0].value;
      })
      getparameter('REGISTER_NOTE').then(res=>{
        this.registerTip=res.data
      })
    },
    // club logo上传
    handleLogoSuccess(res, file) {
      this.clubForm.logoUrl = res.data;
    },
    beforeLogoUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传俱乐部logo图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传俱乐部logo图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // club 身份证上传
    handleCardSuccess(res, file) {
      this.clubForm.idCardUrl = res.data;
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
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //其他资质
    handleQualifySuccess(res, file) {
      this.clubForm.qualifyFiles.push(res.data);
    },
    beforeQualifyUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传资质图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传资质图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleQualifyPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeQualifyFiles(files){
      if(files.type.substring(0,files.type.indexOf("/")) != 'image'){
        this.$message.error("资质文件只能上传图片！");
        return false;
      }
    },
    //图片删除
    handleRemove(file, fileList) {
      let qualifyFiles = fileList.map(val=> val.url)
      this.clubForm.qualifyFiles = qualifyFiles;
    },
    refuse(){
      const h = this.$createElement;
      this.$prompt('请输入拒绝原因', '提示', {
        confirmButtonText: '确定',
        inputType:'textarea',
        cancelButtonText: '取消',
        inputValidator:(val=>{return (val === '' ? false : true)}),
        inputErrorMessage: '拒绝原因不能为空'
      }).then(({ value }) => {
        if(value !== null){
          if(value.length>200){
            this.$message({
              type: 'warning',
              message: '拒绝原因不能大于200个字！'
            });
            return false;
          }
          this.clubApprove(3,value)
          // this.$message({
          //   type: 'success',
          //   message: '你的原因是: ' + value
          // });
        }else{
          this.$message({
            type: 'warning',
            message: '拒绝原因不能为空'
          });
        }
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '取消输入'
        // });
      });
    }
  },
  watch:{
    'clubForm.idCardNo'(val){
      let reg = validators.ksidCardNoreg();
      if(!reg.test(val)){
        this.rules={...this.rules,qualifyFiles:[{required:true,message:'请上传资质',trigger:'change'}]}
      }else{
        if('qualifyFiles' in this.rules){
          this.$delete(this.rules,'qualifyFiles')
        }
        this.$refs.clubForm.clearValidate(['qualifyFiles'])
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
      width: 100px;
      height: 100px;
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
